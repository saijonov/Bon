document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');


    const validationRules = {
        name: {
            required: true,
            minLength: 2
        },
        email: {
            required: true,
            email: true
        },
        subject: {
            required: true,
            minLength: 5
        },
        message: {
            required: true,
            minLength: 10
        }
    };

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();


        const errors = validateForm(contactForm, validationRules);

        if (Object.keys(errors).length === 0) {
 
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.reset();
        } else {

            formMessage.className = 'form-message error';
            formMessage.textContent = Object.values(errors)[0];
        }


        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });


    const formElements = document.querySelectorAll('.contact-form-container, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    formElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});