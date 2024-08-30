

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.bg-teal-500.text-white.px-4.py-2.rounded-full');
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const productForm = document.getElementById('productForm');
    const tableBody = document.querySelector('tbody');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const searchInput = document.getElementById('searchInput'); 
    let uploadedImage = ''; 
    let editingRow = null; 

    const frameOptions = {
        '1': 'Металлический',
        '2': 'Прямоугольная',
        '3': 'Рамка призмы'
    };

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => {
            addProductRow(product);
        });
    }

    function saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function addProductRow(product) {
        const newRow = document.createElement('tr');
        newRow.classList.add('bg-white', 'border-b', 'border-gray-200');
        newRow.innerHTML = `
            <td class="px-4 py-2 whitespace-nowrap">
                <img src="${product.image}" alt="Product Image" class="w-20 h-20 object-cover">
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-gray-900 font-semibold">${product.price} сум</td>
            <td class="px-4 py-2 whitespace-nowrap text-gray-900">${product.quantity}</td>
            <td class="px-4 py-2 whitespace-nowrap text-gray-900">${product.frame}</td>
            <td class="px-4 py-2 whitespace-nowrap">
                <div class="flex items-center space-x-5">
                    <button class="text-teal-500 hover:text-teal-600 edit-button">
                        <i class="fa-sharp fa-solid fa-pen"></i>
                    </button>
                    <button class="text-red-500 hover:text-red-600 delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(newRow);
    }

    addButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        productForm.reset();
        imagePreview.src = '';
        imagePreview.classList.add('hidden');
        uploadedImage = ''; // Reset uploaded image variable
        editingRow = null; // Clear the editing row
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage = e.target.result; 
                imagePreview.src = uploadedImage;
                imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = '';
            imagePreview.classList.add('hidden');
        }
    });

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;
        const frame = document.getElementById('frame').value;

        const frameLabel = frameOptions[frame] || 'Не указана';

        const product = {
            image: uploadedImage || 'default-image-url',
            price: price,
            quantity: quantity,
            frame: frameLabel
        };

        let products = JSON.parse(localStorage.getItem('products')) || [];

        if (editingRow) {
            // Update existing row
            const index = Array.from(tableBody.children).indexOf(editingRow);
            products[index] = product; // Update the product in localStorage
            tableBody.children[index].innerHTML = `
                <td class="px-4 py-2 whitespace-nowrap">
                    <img src="${product.image}" alt="Product Image" class="w-20 h-20 object-cover">
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-gray-900 font-semibold">${product.price} сум</td>
                <td class="px-4 py-2 whitespace-nowrap text-gray-900">${product.quantity}</td>
                <td class="px-4 py-2 whitespace-nowrap text-gray-900">${product.frame}</td>
                <td class="px-4 py-2 whitespace-nowrap">
                    <div class="flex items-center space-x-5">
                        <button class="text-teal-500 hover:text-teal-600 edit-button">
                            <i class="fa-sharp fa-solid fa-pen"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-600 delete-button">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
        } else {
            // Add new row
            addProductRow(product);
            products.push(product); // Add the new product to localStorage
        }

        // Save updated products to localStorage
        saveProducts(products);

        // Hide the modal
        modal.classList.add('hidden');
    });

    tableBody.addEventListener('click', function(event) {
        const target = event.target;
        const row = target.closest('tr');

        if (target.matches('.edit-button, .edit-button *')) {
            const imgSrc = row.querySelector('img').src;
            const price = row.querySelector('.text-gray-900.font-semibold').textContent.replace(' сум', '');
            const quantity = row.querySelector('td:nth-child(3)').textContent;
            const frameText = row.querySelector('td:nth-child(4)').textContent;

            document.getElementById('price').value = price;
            document.getElementById('quantity').value = quantity;
            document.getElementById('frame').value = Object.keys(frameOptions).find(key => frameOptions[key] === frameText);

            uploadedImage = imgSrc;
            imagePreview.src = uploadedImage;
            imagePreview.classList.remove('hidden');

            modal.classList.remove('hidden');
            editingRow = row; 
        } 
        else if (target.matches('.delete-button, .delete-button *')) {
            if (confirm('Are you sure you want to delete this item?')) {
                const index = Array.from(tableBody.children).indexOf(row);
                let products = JSON.parse(localStorage.getItem('products')) || [];
                products.splice(index, 1); 
                saveProducts(products);
                row.remove();
            }
        }
    });

    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const priceCell = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            if (priceCell.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    loadProducts();
});
