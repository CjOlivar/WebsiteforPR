// Existing mock data for demonstration purposes
let mockProducts = [
    { id: 1, name: 'Product 1', price: 100, stock: 50 },
    { id: 2, name: 'Product 2', price: 200, stock: 30 },
    { id: 3, name: 'Product 3', price: 150, stock: 40 }
];

let mockOrders = [
    { id: 1, products: [1, 2], total: 300, date: '2023-07-01' },
    { id: 2, products: [3], total: 150, date: '2023-07-02' },
    { id: 3, products: [1, 3], total: 250, date: '2023-07-03' }
];

let mockUsers = [
    { id: 1, name: 'User 1', email: 'user1@example.com', lastActive: '2023-07-03' },
    { id: 2, name: 'User 2', email: 'user2@example.com', lastActive: '2023-07-02' },
    { id: 3, name: 'User 3', email: 'user3@example.com', lastActive: '2023-07-01' }
];

// New product data to be integrated
let currentProducts = [
    { name: "Daily Uniform", price: 200, image: "./Images/daily-uniform.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "ID Lace", price: 40, image: "./Images/id-lace.png", requiresSize: false, requiresGender: false, maxQty: 10 },
    { name: "PE Uniform", price: 250, image: "./Images/pe-uniform.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "Pin", price: 10, image: "./Images/sti-pin.png", requiresSize: false, requiresGender: false, maxQty: 10 },
    { name: "Blue Hooded Jacket", price: 450, image: "./Images/blue-jacket.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "Grey Hooded Jacket", price: 450, image: "./Images/grey-jacket.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "Alumni Poloshirt", price: 275, image: "./Images/polo-shirt.png", requiresSize: true, requiresGender: true, maxQty: 10 }
];

let myProducts = []; // Initialize empty array for custom products added by the user

// Function to render the list of current products
function renderCurrentProductList() {
    const currentProductItemsContainer = document.getElementById("currentProductItems");
    currentProductItemsContainer.innerHTML = ""; // Clear existing items
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

// Function to handle product form submission
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImageInput = document.getElementById("productImage");
    
    if (productImageInput.files.length === 0) {
        alert("Please upload an image.");
        return;
    }
    const productImage = URL.createObjectURL(productImageInput.files[0]);

    // Create a new product object
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        requiresSize: false, // Default value, adjust if necessary
        requiresGender: false, // Default value, adjust if necessary
        maxQty: 10 // Default value, adjust if necessary
    };

    // Store the new product in Local Storage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    // Clear form fields
    document.getElementById("productForm").reset();

    // Notify the user and redirect to websitedemo.html
    alert("Product added successfully!");
    window.location.href = "websitedemo.html"; // Redirect to websitedemo.html
});