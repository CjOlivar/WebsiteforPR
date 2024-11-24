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
    maxQuantity = maxQty;  


    document.getElementById('sizeContainer').style.display = requiresSize ? 'block' : 'none';


    const productItem = event.currentTarget;
    const requiresGender = productItem.getAttribute('data-requires-gender') === 'true';
    document.getElementById('genderContainer').style.display = requiresGender ? 'block' : 'none';

    document.getElementById('availableModal').style.display = 'block';
}

function closeModal() {
    document.getElementById("availableModal").style.display = "none";  
}

function buyNow() {
    const size = document.getElementById("sizeContainer").style.display === "block" ? document.getElementById("sizeSelect").value : null;
    const quantityInput = document.getElementById("quantity").value;
    const quantity = parseInt(quantityInput);
    const productName = document.getElementById("caption").innerHTML;
    const priceText = document.getElementById("productPrice").innerText;
    const price = parseInt(priceText.replace('Price: ₱', ''));
    const quantityError = document.getElementById("quantityError");

    
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
    closeModal();  
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
    document.getElementById("cartModal").style.display = "block";  
}

function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";  
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
    paymentModal.style.display = "block"; 
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
    const qrCodeContainer = document.getElementById("qrCodeContainer"); 

    switch (method) {
        case "gcash":
            paymentDetailsContainer.innerHTML = `<h3>GCash Payment</h3>
                <p>Scan the QR code with your GCash app.</p>`;
            generateQRCode(`gcash://pay?amount=${totalAmount}&message=Your+Order`);
            break;

        case "credit_card":
            paymentDetailsContainer.innerHTML = ` 
            <h3>Credit Card Details</h3>
            <label for="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" placeholder="Enter card number">
            <br>
            <label for="expiryDate">Expiry Date:</label>
            <input type="date" id="expiryDate" placeholder="Select expiry date">
            <br>
            <label for="cardCvv">CVV:</label>
            <input type="text" id="cardCvv" placeholder="Enter CVV">
        `;
            qrCodeContainer.innerHTML = ''; 
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
            qrCodeContainer.innerHTML = ''; 
            break;

        default:
            paymentDetailsContainer.innerHTML = '';
            qrCodeContainer.innerHTML = ''; 
    }
}


function generateQRCode(data) {
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    QRCode.toCanvas(qrCodeContainer, data, function (error) {
        if (error) console.error(error);
        console.log('QR code generated successfully!');
    });
}

function clearPaymentDetails() {
    const paymentDetailsContainer = document.getElementById("paymentDetails");
    paymentDetailsContainer.innerHTML = '';
    document.getElementById("qrCodeContainer").innerHTML = ''; 
}

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
        clearCart(); 
    }
}

function clearCart() {
    cartCount = 0;
    totalAmount = 0;
    cartItems = [];

    document.getElementById("cartCount").innerText = cartCount;
    document.getElementById("totalAmount").innerText = totalAmount;
    document.getElementById("cartItems").innerHTML = '';  

    closePaymentModal();
}

function closePaymentModal() {
    document.getElementById("paymentModal").style.display = "none";  
}

document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchProducts(); 
    }
});

function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    const availableProducts = document.querySelectorAll(".available-section .product-item");
    const recommendedProducts = document.querySelectorAll(".recommendations .product-item");

    let productFound = false;

    function tryOpenModal(product) {
        const productName = product.querySelector("p").innerText.toLowerCase();
        if (productName.includes(searchInput)) {
            const imageSrc = product.querySelector("img").src;
            const price = product.getAttribute('data-price');
            const requiresSize = product.getAttribute('data-requires-size') === 'true';
            const maxQty = product.getAttribute('data-max-qty') || 10; 

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
        alert("Product not found!"); 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
        window.location.href = 'login.html'; 
    } else if (userRole === 'admin') {
        alert('You are logged in as an Admin. You will be redirected to the admin panel.');
        window.location.href = 'admin.html'
    }
});

// News slider functionality
function showSlides(n) {
    let slides = document.getElementsByClassName("news-slide");
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slides[slideIndex].style.display = "block"; 
}

function moveSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}


setInterval(function() {
    moveSlide(1); 
}, 4000);

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

window.addEventListener('click', function(event) {
    if (!event.target.matches('.user-icon')) {
        const dropdown = document.getElementById("profileDropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
});

function logout() {
    const identifier = localStorage.getItem('identifier'); 
    if (identifier) {
        // Update user activity on logout
        let userActivity = JSON.parse(localStorage.getItem('userActivity')) || {};
        if (userActivity[identifier]) {
            userActivity[identifier].lastLogout = new Date().toISOString(); 
        }
        localStorage.setItem('userActivity', JSON.stringify(userActivity));
    }

    localStorage.removeItem('userRole');
    localStorage.removeItem('identifier'); 
    window.location.href = 'login.html'; 
}

function submitContactForm(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simulate form submission (you can replace this with actual form submission logic)
    console.log("Form submitted:", { name, email, message });

    
    const responseDiv = document.getElementById("formResponse");
    responseDiv.style.display = "block";
    responseDiv.innerHTML = `<p>Thank you, ${name}! Your message has been sent.</p>`;

    // Clear the form fields
    document.getElementById("contactForm").reset();
}
function openCustomerServiceModal() {
    document.getElementById('customerServiceModal').style.display = 'block';
}

function closeCustomerServiceModal() {
    document.getElementById('customerServiceModal').style.display = 'none';
}

function submitCustomerServiceForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("csName").value;
    const email = document.getElementById("csEmail").value;
    const message = document.getElementById("csMessage").value;

    // Log the submission (for demonstration purposes)
    console.log("Customer Service Form submitted:", { name, email, message });

    // Create a notification for the admin
    const notification = `New message from ${name} (${email}): ${message}`;
    notifications.push(notification); // Add notification to the array

    // Show response message
    const responseDiv = document.getElementById("csFormResponse");
    responseDiv.style.display = "block";
    responseDiv.innerHTML = `<p>Thank you, ${name}! Your message has been sent.</p>`;

    
    document.getElementById("customerServiceForm").reset(); 
}

document.addEventListener("DOMContentLoaded", function() {
    const notification = localStorage.getItem('productAddedNotification');
    if (notification) {
        alert(notification);
        localStorage.removeItem('productAddedNotification'); 
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const availableItemsContainer = document.getElementById("available-items");

    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.setAttribute("data-price", product.price);
        productItem.setAttribute("data-requires-size", product.requiresSize);
        productItem.setAttribute("data-requires-gender", product.requiresGender);
        productItem.setAttribute("data-max-qty", product.maxQty);
        productItem.onclick = function() {
            openModal(product.image, product.name, product.price, product.requiresSize, product.maxQty);
        };
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}"> 
            <p>${product.name}</p>
        `;
        availableItemsContainer.appendChild(productItem);
    });
});
