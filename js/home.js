// Featured items data
const featuredItems = [
    {
        title: 'Signature Coffee',
        description: 'Our premium blend of Arabica beans',
        image: 'images/coffee.jpg'
    },
    {
        title: 'Fresh Salads',
        description: 'Made with locally sourced ingredients',
        image: 'images/salad.jpg'
    },
    {
        title: 'Cold Drinks',
        description: 'Refreshing beverages for any season',
        image: 'images/drinks.jpg'
    }
];


document.addEventListener('DOMContentLoaded', function() {
    const featuredContainer = document.getElementById('featured-items');
    
    if (featuredContainer) {
        featuredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'featured-item';
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="featured-item-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            featuredContainer.appendChild(itemElement);
        });
    }
});