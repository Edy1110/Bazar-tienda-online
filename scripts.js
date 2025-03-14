document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const filterForm = document.getElementById('filter-form');
    const searchBar = document.getElementById('searchbar');
    const priceSearch = document.getElementById('price-search');
    const categorySelect = document.getElementById('category-select');

    const aboutBtn = document.getElementById('about-btn');
    const contactBtn = document.getElementById('contact-btn');
    const aboutModal = document.getElementById('about-modal');
    const contactModal = document.getElementById('contact-modal');
    const closeModalButtons = document.querySelectorAll('.close');
    const contactForm = document.getElementById('contact-form');

    let products = []; // Almacenará los productos obtenidos de la API
    

    // Función para obtener productos de la API
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            renderProducts(products);
            populateCategories();
        } catch (error) {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<p>Error al cargar los productos.</p>';
        }
    }

    // Función para llenar las categorías
    function populateCategories() {
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Función para renderizar los productos
    function renderProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productElement = document.createElement('article');
            productElement.classList.add('article-product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" style="max-height: 150px;">
                <h3>${product.title}</h3>
                <p>Precio: $${product.price}</p>
                <p>Categoría: $${product.category}</p>
            `;
            productList.appendChild(productElement);
        });
    }

    // Función para filtrar los productos
    function filterProducts() {
        const searchTerm = searchBar.value.toLowerCase();
        const maxPrice = parseFloat(priceSearch.value) || Infinity;
        const selectedCategory = categorySelect.value;

        const filteredProducts = products.filter(product => {
            const nameMatch = product.title.toLowerCase().includes(searchTerm);
            const priceMatch = product.price <= maxPrice;
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

            return nameMatch && priceMatch && categoryMatch;
        });

        renderProducts(filteredProducts);
    }

    // Event listener para el formulario de filtro
    filterForm.addEventListener('input', filterProducts);

    // Cargar los productos al cargar la página
    fetchProducts();
});
