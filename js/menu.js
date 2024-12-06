// Menu data
const menuItems = [
    {
        id: 1,
        title: 'Cappuccino',
        description: 'Classic Italian coffee with steamed milk foam',
        price: '25,000',
        category: 'coffee',
        image: 'images/cappuccino.jpg',
        tags: ['Hot', 'Popular']
    },
    {
        id: 2,
        title: 'Iced Americano',
        description: 'Chilled espresso with cold water',
        price: '22,000',
        category: 'cold-drinks',
        image: 'images/iced-americano.jpg',
        tags: ['Cold', 'Refreshing']
    },
    {
        id: 3,
        title: 'Caesar Salad',
        description: 'Fresh romaine lettuce with classic Caesar dressing',
        price: '45,000',
        category: 'salads',
        image: 'images/caesar-salad.jpg',
        tags: ['Fresh', 'Healthy']
    },
    {
        id: 4,
        title: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers',
        price: '35,000',
        category: 'desserts',
        image: 'images/tiramisu.jpg',
        tags: ['Sweet', 'Popular']
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.getElementById('menu-items');
    const categoryButtons = document.querySelectorAll('.category-btn');
    let currentCategory = 'all';


    function renderMenuItems(category) {
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);

        menuContainer.innerHTML = '';
        
        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item fade-in';
            
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.title}</h3>
                        <span class="menu-item-price">${item.price} UZS</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-tags">
                        ${item.tags.map(tag => `<span class="menu-item-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            menuContainer.appendChild(menuItem);
        });
    }


    renderMenuItems(currentCategory);


    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            

            currentCategory = category;
            renderMenuItems(category);
        });
    });
});