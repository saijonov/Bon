// Gallery data
const galleryItems = [
    {
        id: 1,
        title: 'Modern Interior',
        description: 'Our cozy and stylish café interior',
        category: 'interior',
        image: 'images/interior-1.jpg'
    },
    {
        id: 2,
        title: 'Signature Latte Art',
        description: 'Handcrafted latte art by our skilled baristas',
        category: 'coffee',
        image: 'images/coffee-1.jpg'
    },
    {
        id: 3,
        title: 'Fresh Salads',
        description: 'Healthy and delicious salad selection',
        category: 'food',
        image: 'images/food-1.jpg'
    },
    {
        id: 4,
        title: 'Coffee Workshop',
        description: 'Barista training session',
        category: 'events',
        image: 'images/events-1.jpg'
    },
    {
        id: 5,
        title: 'Outdoor Seating',
        description: 'Beautiful terrace area',
        category: 'interior',
        image: 'images/interior-2.jpg'
    },
    {
        id: 6,
        title: 'Cold Brew Selection',
        description: 'Refreshing cold brew coffee varieties',
        category: 'coffee',
        image: 'images/coffee-2.jpg'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let currentCategory = 'all';
    let currentImageIndex = 0;
    let filteredItems = [...galleryItems];


    function renderGallery(category) {
        filteredItems = category === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === category);

        galleryGrid.innerHTML = '';
        
        filteredItems.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item fade-in';
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openModal(index));
            galleryGrid.appendChild(galleryItem);
        });


        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(item => {
                item.classList.add('visible');
            });
        }, 100);
    }


    function openModal(index) {
        currentImageIndex = index;
        updateModalImage();
        modal.style.display = 'flex';
    }

    function updateModalImage() {
        const item = filteredItems[currentImageIndex];
        modalImg.src = item.image;
        modalCaption.textContent = `${item.title} - ${item.description}`;
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function navigateModal(direction) {
        currentImageIndex = (currentImageIndex + direction + filteredItems.length) % filteredItems.length;
        updateModalImage();
    }


    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => navigateModal(-1));
    modalNext.addEventListener('click', () => navigateModal(1));


    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        }
    });


    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.filter;
            

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            

            currentCategory = category;
            renderGallery(category);
        });
    });


    renderGallery(currentCategory);


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
});