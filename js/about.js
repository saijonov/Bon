// Team members data
const teamMembers = [
    {
        name: 'Sophie Laurent',
        position: 'Executive Chef',
        image: 'images/chef.jpg',
        description: 'Trained in Paris with over 15 years of experience'
    },
    {
        name: 'Ahmad Karimov',
        position: 'Operations Manager',
        image: 'images/manager.jpg',
        description: 'Ensuring smooth operations across all locations'
    },
    {
        name: 'Marie Dubois',
        position: 'Head Barista',
        image: 'images/barista.jpg',
        description: 'Coffee expert with international certification'
    }
];

const timelineEvents = [
    {
        date: '2018',
        title: 'First Location Opens',
        description: 'Bon Cafe opens its first café in central Tashkent'
    },
    {
        date: '2019',
        title: 'Award-Winning Coffee',
        description: 'Recognized for "Best Coffee Experience" in Uzbekistan'
    },
    {
        date: '2020',
        title: 'Expansion Begins',
        description: 'Opening of three new locations across Tashkent'
    },
    {
        date: '2021',
        title: 'Sustainability Initiative',
        description: 'Launch of eco-friendly packaging and waste reduction program'
    },
    {
        date: '2022',
        title: 'Barista Academy',
        description: 'Establishment of our training program for aspiring baristas'
    }
];

document.addEventListener('DOMContentLoaded', function() {

    const teamGrid = document.getElementById('team-members');
    if (teamGrid) {
        teamMembers.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member fade-in';
            
            memberElement.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <div class="team-member-info">
                    <h3>${member.name}</h3>
                    <p class="position">${member.position}</p>
                    <p>${member.description}</p>
                </div>
            `;
            
            teamGrid.appendChild(memberElement);
        });
    }


    const timeline = document.getElementById('timeline');
    if (timeline) {
        timelineEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'timeline-event fade-in';
            
            eventElement.innerHTML = `
                <div class="timeline-content">
                    <div class="date">${event.date}</div>
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                </div>
            `;
            
            timeline.appendChild(eventElement);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});