document.addEventListener('DOMContentLoaded', () => {
    let productList = [];
    let editIndex = null;

    const productForm = document.getElementById('productForm');
    const productListElement = document.getElementById('product-list');
    const productNameInput = document.getElementById('product-name');
    const productDescInput = document.getElementById('product-desc');
    const addProductBtn = document.getElementById('addProductBtn');
    const saveProductBtn = document.getElementById('saveProductBtn');
    const cancelProductBtn = document.getElementById('cancelProductBtn');

    // Load products into the list
    const loadProducts = () => {
        productListElement.innerHTML = ''; // Clear the list first

        // Create and append header row
        const headerRow = document.createElement('li');
        headerRow.classList.add('product-list-header');
        headerRow.innerHTML = `
            <span>Completed</span>
            <span>Product Name</span>
            <span>Description</span>
            <span>Actions</span>
        `;
        productListElement.appendChild(headerRow);

        // Populate product list
        productList.forEach((product, index) => {
            const productItem = document.createElement('li');
            productItem.classList.toggle('completed', product.completed);
            productItem.innerHTML = `
                <span class="product-checkbox">
                    <input type="checkbox" ${product.completed ? 'checked' : ''} data-index="${index}" class="toggle-completed">
                </span>
                <span class="product-info">${product.name}</span>
                <span class="product-info">${product.desc}</span>
                <span class="product-actions">
                    <button class="btn-view" onclick="viewProduct(${index})">View</button>
                    <button class="btn-edit" onclick="editProduct(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${index})">Delete</button>
                </span>
            `;
            productListElement.appendChild(productItem);
        });
    };

    // Show product form for adding a new product
    const showProductForm = () => {
        productForm.style.display = 'block';
        productNameInput.value = '';
        productDescInput.value = '';
        editIndex = null; // Reset editIndex for new product
    };

    // Add product
    addProductBtn.addEventListener('click', showProductForm);

    // Save product
    saveProductBtn.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productDesc = productDescInput.value.trim();

        if (productName && productDesc) {
            const product = {
                name: productName,
                desc: productDesc,
                completed: false // Initialize as not completed
            };

            if (editIndex === null) {
                // Add new product
                productList.push(product);
            } else {
                // Update existing product
                productList[editIndex] = product;
            }

            loadProducts(); // Reload the product list
            productForm.style.display = 'none'; // Hide the form
        } else {
            alert('Please fill out both fields.'); // Alert for empty fields
        }
    });

    // Cancel product form
    cancelProductBtn.addEventListener('click', () => {
        productForm.style.display = 'none'; // Hide the form
    });

    // Edit product
    window.editProduct = (index) => {
        const product = productList[index];
        productNameInput.value = product.name;
        productDescInput.value = product.desc;
        productForm.style.display = 'block';
        editIndex = index; // Set the index to the current product being edited
    };

    // Delete product
    window.deleteProduct = (index) => {
        if (confirm('Are you sure you want to delete this product?')) { // Confirmation before delete
            productList.splice(index, 1); // Remove the product from the list
            loadProducts(); // Reload the product list
        }
    };

    // View product
    window.viewProduct = (index) => {
        const product = productList[index];
        alert(`Product: ${product.name}\nDescription: ${product.desc}`);
    };

    // Toggle product completion status
    productListElement.addEventListener('change', (event) => {
        if (event.target.classList.contains('toggle-completed')) {
            const index = event.target.dataset.index;
            productList[index].completed = event.target.checked; // Update completion status
            loadProducts(); // Reload product list to reflect changes
        }
    });
});