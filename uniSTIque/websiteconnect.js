$(document).ready(function() {
    $.get('/api/products', function(products) {
        products.forEach(product => {
            // Append product data to the available section
            $('.available-items').append(`
                <div class="product-item" data-price="${product.price}" data-requires-size="${product.requiresSize}" data-max-qty="${product.maxQty}" onclick="openModal('${product.image}', '${product.name}', ${product.price}, ${product.requiresSize}, ${product.maxQty})">
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                </div>
            `);
        });
    });
});
