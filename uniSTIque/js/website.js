let cartCount = 0;
let cartItems = [];
let totalAmount = 0;
let maxQuantity = 0;
let slideIndex = 0;
showSlides(slideIndex);

function openModal(imageSrc, productName, price, requiresSize, maxQty) {
    document.getElementById("modalImage").src = imageSrc;
    document.getElementById("caption").innerHTML = productName;
    document.getElementById("productPrice").innerHTML = "Price: ₱" + price;
    maxQuantity = maxQty;  // Set the max quantity for the product

    // Show or hide size selection
    document.getElementById('sizeContainer').style.display = requiresSize ? 'block' : 'none';

    // Check if the product requires gender selection
    const productItem = event.currentTarget; // Get the clicked product item
    const requiresGender = productItem.getAttribute('data-requires-gender') === 'true';
    document.getElementById('genderContainer').style.display = requiresGender ? 'block' : 'none';

    // Open the modal
    document.getElementById('availableModal').style.display = 'block';
}

function closeModal() {
    document.getElementById("availableModal").style.display = "none";  // Hide modal
}

function buyNow() {
    const size = document.getElementById("sizeContainer").style.display === "block" ? document.getElementById("sizeSelect").value : null;
    const quantityInput = document.getElementById("quantity").value;
    const quantity = parseInt(quantityInput);
    const productName = document.getElementById("caption").innerHTML;
    const priceText = document.getElementById("productPrice").innerText;
    const price = parseInt(priceText.replace('Price: ₱', ''));
    const quantityError = document.getElementById("quantityError");

    // Check for valid quantity
    if (isNaN(quantity) || quantity <= 0) {
        quantityError.innerText = "Please enter a valid quantity.";
        quantityError.style.display = "block";
        return;
    }

    if (quantity > maxQuantity) {
        quantityError.innerText = `Maximum quantity for ${productName} is ${maxQuantity}.`;
        quantityError.style.display = "block";
        return;
    } else {
        quantityError.style.display = "none";
    }

    cartCount += quantity;
    totalAmount += price * quantity;
    document.getElementById("cartCount").innerText = cartCount;

    cartItems.push({ productName, price, size, quantity });
    closeModal();  // Close the modal after adding to cart
}

function viewCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
            <p>${item.productName} - ₱${item.price} x ${item.quantity}${item.size ? ' (Size: ' + item.size + ')' : ''}</p>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    document.getElementById("totalAmount").innerText = totalAmount;
    document.getElementById("cartModal").style.display = "block";  // Show cart modal
}

function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";  // Hide cart modal
}

function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Get modal elements
    const paymentModal = document.getElementById("paymentModal");
    const cartModal = document.getElementById("cartModal");

    // Close cart modal
    cartModal.style.display = "none"; 
    paymentModal.style.display = "block"; // Show payment modal
    clearPaymentDetails();
}

// Close payment modal when clicking outside of it
window.onclick = function (event) {
    const paymentModal = document.getElementById("paymentModal");
    if (event.target == paymentModal) {
        paymentModal.style.display = "none";
        clearPaymentDetails();
    }
};

function selectPaymentMethod(method) {
    clearPaymentDetails();

    const paymentDetailsContainer = document.getElementById("paymentDetails");
    const qrCodeContainer = document.getElementById("qrCodeContainer"); // Make sure to have this div in your HTML

    switch (method) {
        case "gcash":
            paymentDetailsContainer.innerHTML = `<h3>GCash Payment</h3>
                <p>Scan the QR code with your GCash app.</p>`;
            generateQRCode(`gcash://pay?amount=${totalAmount}&message=Your+Order`);
            break;

        case "credit_card":
            paymentDetailsContainer.innerHTML = `<h3>Credit Card Payment</h3>
                <label for="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" placeholder="XXXX-XXXX-XXXX-XXXX" required />
                <label for="expiryDate">Expiry Date:</label>
                <input type="text" id="expiryDate" placeholder="MM/YY" required />
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" placeholder="XXX" required />
                <button onclick="submitPayment('credit_card')">Pay Now</button>`;
            qrCodeContainer.innerHTML = ''; // Clear QR code for other payment methods
            break;

        case "paymaya":
            paymentDetailsContainer.innerHTML = `<h3>PayMaya Payment</h3>
                <p>Use the PayMaya app to complete your payment.</p>`;
            generateQRCode(`paymaya://pay?amount=${totalAmount}&message=Your+Order`);
            break;

        case "qr_code":
            paymentDetailsContainer.innerHTML = `<h3>QR Code Payment</h3>
                <p>Scan the QR code to proceed with your payment.</p>`;
            generateQRCode(`payment://process?amount=${totalAmount}&message=Your+Order`);
            break;

            case "cash":
            paymentDetailsContainer.innerHTML = `<h3>Cash Payment</h3>
                <p>You have selected cash as your payment method. Please prepare the exact amount of ₱${totalAmount} for cash on delivery or in-store payment.</p>
                <button onclick="submitPayment('cash')">Confirm Cash Payment</button>`;
            qrCodeContainer.innerHTML = ''; // No QR code for cash
            break;

        default:
            paymentDetailsContainer.innerHTML = '';
            qrCodeContainer.innerHTML = ''; // Clear QR code for invalid method
    }
}

// Function to generate QR code


// Function to clear payment details
function clearPaymentDetails() {
    const paymentDetailsContainer = document.getElementById("paymentDetails");
    paymentDetailsContainer.innerHTML = '';
    document.getElementById("qrCodeContainer").innerHTML = ''; // Clear QR code
}

// Function to submit payment
function submitPayment(method) {
    let isValid = true;
    let paymentInfo = {};

    switch (method) {
        case "credit_card":
            const cardNumber = document.getElementById("cardNumber").value;
            const expiryDate = document.getElementById("expiryDate").value;
            const cvv = document.getElementById("cvv").value;

            if (!cardNumber || !expiryDate || !cvv) {
                alert("Please fill out all fields.");
                isValid = false;
            } else {
                paymentInfo = {
                    method: "Credit Card",
                    cardNumber,
                    expiryDate,
                    cvv,
                };
            }
            break;

        case "gcash":
        case "paymaya":
        case "qr_code":
            paymentInfo = { method };
            break;

            case "cash":
                paymentInfo = { method: "Cash" };
                alert("Cash payment confirmed. Please prepare the exact amount at Proware.");
                break;

        default:
            isValid = false;
            alert("Invalid payment method selected.");
    }

    if (isValid) {
        console.log("Processing payment:", paymentInfo);
        alert("Payment successful! Thank you for your purchase.");
        clearCart(); // Clear cart after successful payment
    }
}


// Function to clear the cart after successful checkout
function clearCart() {
    cartCount = 0;
    totalAmount = 0;
    cartItems = [];

    document.getElementById("cartCount").innerText = cartCount;
    document.getElementById("totalAmount").innerText = totalAmount;
    document.getElementById("cartItems").innerHTML = '';  // Clear the cart items in the modal

    // Close the payment modal
    closePaymentModal();
}

function closePaymentModal() {
    document.getElementById("paymentModal").style.display = "none";  // Hide payment modal
}

document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchProducts(); // Call the search function when Enter is pressed
    }
});

function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    const availableProducts = document.querySelectorAll(".available-section .product-item");
    const recommendedProducts = document.querySelectorAll(".recommendations .product-item");

    let productFound = false;

    // Function to open the modal if a match is found
    function tryOpenModal(product) {
        const productName = product.querySelector("p").innerText.toLowerCase();
        if (productName.includes(searchInput)) {
            const imageSrc = product.querySelector("img").src;
            const price = product.getAttribute('data-price'); // Add 'data-price' attribute to your HTML for prices
            const requiresSize = product.getAttribute('data-requires-size') === 'true';
            const maxQty = product.getAttribute('data-max-qty') || 10; // Set max quantity or default

            openModal(imageSrc, product.querySelector("p").innerText, price, requiresSize, maxQty);
            productFound = true;
        }
    }

    availableProducts.forEach(product => {
        tryOpenModal(product);
    });

    if (!productFound) {
        recommendedProducts.forEach(product => {
            tryOpenModal(product);
        });
    }

    if (!productFound) {
        alert("Product not found!"); // Alert if no product matches the search term
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
        window.location.href = 'login.html'; // Redirect to login if no role is found
    } else if (userRole === 'admin') {
        alert('You are logged in as an Admin. You will be redirected to the admin panel.');
        window.location.href = 'admin.html'; // Redirect to admin page for admins
    }
});

// News slider functionality
function showSlides(n) {
    let slides = document.getElementsByClassName("news-slide");
    if (n >= slides.length) {
        slideIndex = 0; // Reset to the first slide
    }
    if (n < 0) {
        slideIndex = slides.length - 1; // Go to the last slide
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slides[slideIndex].style.display = "block"; // Show the current slide
}

function moveSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

// Optional: Auto slide every 5 seconds
setInterval(function() {
    moveSlide(1); // Move to the next slide every 5 seconds
}, 3000);

function toggleProfileDropdown() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function openProfileModal() {
    document.getElementById('profileModal').style.display = 'block';
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// Hide dropdown when clicking outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('.user-icon')) {
        const dropdown = document.getElementById("profileDropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
});

function logout() {
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document
    .querySelector(".calendar-current-date");

const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");

// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Function to generate the calendar
const manipulate = () => {

    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let lit = "";

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {

        // Check if the current date is today
        let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }

    // Update the text of the current date element 
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;

    // update the HTML of the dates element 
    // with the generated calendar
    day.innerHTML = lit;
}

manipulate();

// Attach a click event listener to each icon
prenexIcons.forEach(icon => {

    // When an icon is clicked
    icon.addEventListener("click", () => {

        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        // Check if the month is out of range
        if (month < 0 || month > 11) {

            // Set the date to the first day of the 
            // month with the new year
            date = new Date(year, month, new Date().getDate());

            // Set the year to the new year
            year = date.getFullYear();

            // Set the month to the new month
            month = date.getMonth();
        }

        else {

            // Set the date to the current date
            date = new Date();
        }

        // Call the manipulate function to 
        // update the calendar display
        manipulate();
    });
});