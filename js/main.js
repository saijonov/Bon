// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#main-nav')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


function validateForm(formElement, validationRules) {
    const errors = {};
    
    for (const [fieldName, rules] of Object.entries(validationRules)) {
        const field = formElement.querySelector(`[name="${fieldName}"]`);
        if (!field) continue;

        if (rules.required && !field.value.trim()) {
            errors[fieldName] = 'This field is required';
            continue;
        }

        if (rules.email && !validateEmail(field.value)) {
            errors[fieldName] = 'Please enter a valid email address';
        }

        if (rules.minLength && field.value.length < rules.minLength) {
            errors[fieldName] = `Must be at least ${rules.minLength} characters`;
        }
    }

    return errors;
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function createElementWithData(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}