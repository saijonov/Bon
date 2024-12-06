// Location data
const locations = [
    {
        id: 1,
        name: 'Bon Cafe Central',
        address: '123 Amir Temur Avenue, Tashkent',
        district: 'Yunusabad',
        image: 'images/central.jpg',
        hours: '8:00 - 22:00',
        phone: '+998 71 123 4567',
        coordinates: { lat: 41.311081, lng: 69.279737 },
        amenities: ['parking', 'wifi', 'outdoor'],
        rating: 4.8
    },
    {
        id: 2,
        name: 'Bon Cafe Mirzo Ulugbek',
        address: '45 Mirzo Ulugbek Street, Tashkent',
        district: 'Mirzo Ulugbek',
        image: 'images/ulugbek.jpg',
        hours: '8:00 - 22:00',
        phone: '+998 71 234 5678',
        coordinates: { lat: 41.325684, lng: 69.286772 },
        amenities: ['wifi', 'outdoor'],
        rating: 4.6
    },
    {
        id: 3,
        name: 'Bon Cafe Chilanzar',
        address: '78 Chilanzar Street, Tashkent',
        district: 'Chilanzar',
        image: 'images/chilanzar.jpg',
        hours: '9:00 - 23:00',
        phone: '+998 71 345 6789',
        coordinates: { lat: 41.285908, lng: 69.204429 },
        amenities: ['parking', 'wifi'],
        rating: 4.7
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const locationsGrid = document.getElementById('locations-grid');
    const searchInput = document.getElementById('location-search');
    const searchBtn = document.getElementById('search-btn');
    const amenityFilters = document.querySelectorAll('.amenity-filter');
    
    let filteredLocations = [...locations];

    function renderLocations(locationsList) {
        locationsGrid.innerHTML = '';
        
        locationsList.forEach(location => {
            const locationCard = document.createElement('div');
            locationCard.className = 'location-card fade-in';
            
            locationCard.innerHTML = `
                <img src="${location.image}" alt="${location.name}" class="location-image">
                <div class="location-info">
                    <h3 class="location-name">${location.name}</h3>
                    <p class="location-address">${location.address}</p>
                    <div class="location-details">
                        <div class="location-detail">
                            <span>⏰</span>
                            <span>${location.hours}</span>
                        </div>
                        <div class="location-detail">
                            <span>📞</span>
                            <span>${location.phone}</span>
                        </div>
                        <div class="location-detail">
                            <span>⭐</span>
                            <span>${location.rating}</span>
                        </div>
                        <div class="location-detail">
                            <span>📍</span>
                            <span>${location.district}</span>
                        </div>
                    </div>
                    <div class="amenities">
                        ${location.amenities.map(amenity => `
                            <span class="amenity">${getAmenityLabel(amenity)}</span>
                        `).join('')}
                    </div>
                </div>
            `;
            
            locationsGrid.appendChild(locationCard);
        });

        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(item => {
                item.classList.add('visible');
            });
        }, 100);
    }


    function getAmenityLabel(amenity) {
        const labels = {
            'parking': '🅿️ Parking',
            'wifi': '📶 WiFi',
            'outdoor': '🌳 Outdoor'
        };
        return labels[amenity] || amenity;
    }

    function filterLocations() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedAmenities = Array.from(amenityFilters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);

        filteredLocations = locations.filter(location => {
            const matchesSearch = location.name.toLowerCase().includes(searchTerm) ||
                                location.district.toLowerCase().includes(searchTerm) ||
                                location.address.toLowerCase().includes(searchTerm);

            const matchesAmenities = selectedAmenities.length === 0 ||
                                   selectedAmenities.every(amenity => location.amenities.includes(amenity));

            return matchesSearch && matchesAmenities;
        });

        renderLocations(filteredLocations);
    }

    searchBtn.addEventListener('click', filterLocations);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterLocations();
        }
    });

    amenityFilters.forEach(filter => {
        filter.addEventListener('change', filterLocations);
    });

    renderLocations(locations);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.location-card').forEach(card => {
        observer.observe(card);
    });
});