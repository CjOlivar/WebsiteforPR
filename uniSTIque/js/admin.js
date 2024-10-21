
let currentProducts = [
    {
        name: "Daily Uniform",
        price: 200,
        image: "./Images/daily-uniform.png",
        requiresSize: true,
        requiresGender: true,
        maxQty: 10
    },
    {
        name: "ID Lace",
        price: 40,
        image: "./Images/id-lace.png",
        requiresSize: false,
        requiresGender: false,
        maxQty: 10
    },
    {
        name: "PE Uniform",
        price: 250,
        image: "./Images/pe-uniform.png",
        requiresSize: true,
        requiresGender: true,
        maxQty: 10
    },
    {
        name: "Pin",
        price: 10,
        image: "./Images/sti-pin.png",
        requiresSize: false,
        requiresGender: false,
        maxQty: 10
    },
    {
        name: "Blue Hooded Jacket",
        price: 450,
        image: "./Images/blue-jacket.png",
        requiresSize: true,
        requiresGender: true,
        maxQty: 10
    },
    {
        name: "Grey Hooded Jacket",
        price: 450,
        image: "./Images/grey-jacket.png",
        requiresSize: true,
        requiresGender: true,
        maxQty: 10
    },
    {
        name: "Alumni Poloshirt",
        price: 275,
        image: "./Images/polo-shirt.png",
        requiresSize: true,
        requiresGender: true,
        maxQty: 10
    }
];

let myProducts = []; // Initialize empty array for my products

// Function to handle product form submission
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the form fields
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImageInput = document.getElementById("productImage");
    
    // Check if an image file is selected
    if (productImageInput.files.length === 0) {
        alert("Please upload an image.");
        return;
    }

    const productImage = URL.createObjectURL(productImageInput.files[0]);

    // Create a product object
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        requiresSize: false, // Default value, change if needed
        requiresGender: false, // Default value, change if needed
        maxQty: 10 // Default value, change if needed
    };

    // Add the product to my products array
    myProducts.push(product);

    // Clear the form fields for new entry
    document.getElementById("productForm").reset();

    // Render the updated product lists
    renderCurrentProductList();
    renderMyProductList();
});

// Function to render the list of current products
function renderCurrentProductList() {
    const currentProductItemsContainer = document.getElementById("currentProductItems");
    currentProductItemsContainer.innerHTML = ""; // Clear existing items

    // Loop through the current products array and create list items
    currentProducts.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.innerHTML = `
            <h4>${product.name}</h4>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
        `;
        currentProductItemsContainer.appendChild(productItem);
    });
}

// Function to render the list of my products
function renderMyProductList() {
    const myProductItemsContainer = document.getElementById("myProductItems");
    myProductItemsContainer.innerHTML = ""; // Clear existing items

    // Loop through the my products array and create list items
    myProducts.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.innerHTML = `
            <h4>${product.name}</h4>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
        `;
        myProductItemsContainer.appendChild(productItem);
    });
}

// Call render functions to show initial products on page load
renderCurrentProductList();
renderMyProductList();

// Function to toggle the profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Function to open the profile modal
function openProfileModal() {
    const modal = document.getElementById("profileModal");
    modal.style.display = "block";
}

// Function to close the profile modal
function closeProfileModal() {
    const modal = document.getElementById("profileModal");
    modal.style.display = "none";
}

function logout() {
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

// Example function to view user activity (placeholder)
function viewUserActivity() {
    const logDiv = document.getElementById("userActivityLog");
    logDiv.innerHTML = "<p>User activity log will be displayed here.</p>";
}

// Example function to view orders (placeholder)
function viewOrders() {
    const orderDiv = document.getElementById("orderList");
    orderDiv.innerHTML = "<p>Order list will be displayed here.</p>";
}
