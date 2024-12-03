
let currentProducts = [
    { name: "Daily Uniform", price: 200, image: "./Images/daily-uniform.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "ID Lace", price: 40, image: "./Images/id-lace.png", requiresSize: false, requiresGender: false, maxQty: 10 },
    { name: "PE Uniform", price: 250, image: "./Images/pe-uniform.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "Pin", price: 10, image: "./Images/sti-pin.png", requiresSize: false, requiresGender: false, maxQty: 10 },
    { name: "Blue Hooded Jacket", price: 450, image: "./Images/blue-jacket.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "Grey Hooded Jacket", price: 450, image: "./Images/grey-jacket.png", requiresSize: true, requiresGender: true, maxQty: 10 },
    { name: "Alumni Poloshirt", price: 275, image: "./Images/polo-shirt.png", requiresSize: true, requiresGender: true, maxQty: 10 }
];

let myProducts = []; 


function renderCurrentProductList() {
    const currentProductItemsContainer = document.getElementById("currentProductItems");
    currentProductItemsContainer.innerHTML = ""; 
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

document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImageInput = document.getElementById("productImage");
    const requiresSize = document.getElementById("requiresSize").checked;
    
    if (productImageInput.files.length === 0) {
        alert("Please upload an image.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const productImage = e.target.result; 
        const product = {
            name: productName,
            price: productPrice,
            image: productImage, 
            requiresSize: requiresSize,
            requiresGender: false,
            maxQty: 10
        };
    
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    };
    reader.readAsDataURL(productImageInput.files[0]); 

    
    alert("Product added successfully!");
    window.location.href = "websitedemo.html"; 
});

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

function viewUserActivity() {
    console.log("Fetching user activity..."); 
    const activityTableBody = document.getElementById('activityTableBody');
    activityTableBody.innerHTML = ''; 

    const userActivity = JSON.parse(localStorage.getItem('userActivity')) || {};
    console.log("User  Activity Data:", userActivity); 

    for (const user in userActivity) {
        userActivity[user].forEach(log => {
            const row = document.createElement('tr');
            
            
            if (log.action === 'Checkout') {
                row.innerHTML = `
                    <td>${user}</td>
                    <td>${log.action}</td>
                    <td>${new Date(log.date).toLocaleString()}</td>
                    <td>${log.uniqueId}</td> 
                `;
            } else {
                row.innerHTML = `
                    <td>${user}</td>
                    <td>${log.action}</td>
                    <td>${new Date(log.date).toLocaleString()}</td>
                    <td>N/A</td> 
                `;
            }
            
            activityTableBody.appendChild(row);
        });
    }

    if (activityTableBody.innerHTML === '') {
        console.log("No activity logs found."); 
    }
}
