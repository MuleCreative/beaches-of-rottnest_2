// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize beach cards
    initializeBeachCards();
    
    // Initialize bus schedule
    initializeBusSchedule();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize footer legal documents
    initializeFooterLegal();
    
    // Add smooth scrolling for navigation
    initializeSmoothScrolling();
    
    // Add keyboard navigation
    initializeKeyboardNavigation();
});

function initializeBeachCards() {
    const beachCards = document.querySelectorAll('.beach-card');
    
    beachCards.forEach(card => {
        // Add click handler for card selection
        card.addEventListener('click', function() {
            selectBeachCard(this);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectBeachCard(this);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
}

function selectBeachCard(card) {
    // Remove previous selection
    document.querySelectorAll('.beach-card').forEach(c => {
        c.classList.remove('beach-card--selected');
        c.setAttribute('aria-pressed', 'false');
    });
    
    // Add selection to clicked card
    card.classList.add('beach-card--selected');
    card.setAttribute('aria-pressed', 'true');
    
    // Get beach data
    const beachId = card.dataset.beachId;
    const beachName = card.querySelector('.beach-card__name').textContent;
    const beachRating = card.querySelector('.beach-card__rating-score').textContent;
    
    // Announce selection to screen readers
    announceSelection(beachName, beachRating);
    
    // You can add more functionality here, like:
    // - Show detailed beach information
    // - Update a map view
    // - Scroll to beach details
    console.log(`Selected beach: ${beachName} (Rating: ${beachRating})`);
}

function announceSelection(name, rating) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Selected ${name} beach with a shelter rating of ${rating} out of 10`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeKeyboardNavigation() {
    // Add keyboard navigation for beach cards
    document.addEventListener('keydown', function(e) {
        const selectedCard = document.querySelector('.beach-card--selected');
        
        if (!selectedCard) return;
        
        const allCards = Array.from(document.querySelectorAll('.beach-card'));
        const currentIndex = allCards.indexOf(selectedCard);
        
        let nextIndex = currentIndex;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = (currentIndex + 1) % allCards.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                nextIndex = (currentIndex - 1 + allCards.length) % allCards.length;
                break;
            case 'Home':
                e.preventDefault();
                nextIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                nextIndex = allCards.length - 1;
                break;
        }
        
        if (nextIndex !== currentIndex) {
            allCards[nextIndex].focus();
            selectBeachCard(allCards[nextIndex]);
        }
    });
}

function initializeBusSchedule() {
    // Initialize bus stop cards
    const busStopCards = document.querySelectorAll('.bus-stop-card');
    
    busStopCards.forEach(card => {
        // Add click handler for bus stop selection
        card.addEventListener('click', function() {
            selectBusStop(this);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectBusStop(this);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
    
    // Initialize info boxes
    const infoBoxes = document.querySelectorAll('.info-box');
    
    infoBoxes.forEach(box => {
        box.addEventListener('click', function() {
            highlightInfoBox(this);
        });
    });
}

function selectBusStop(card) {
    // Remove previous selection
    document.querySelectorAll('.bus-stop-card').forEach(c => {
        c.classList.remove('bus-stop-card--selected');
        c.setAttribute('aria-pressed', 'false');
    });
    
    // Add selection to clicked card
    card.classList.add('bus-stop-card--selected');
    card.setAttribute('aria-pressed', 'true');
    
    // Get bus stop data
    const stopName = card.querySelector('.bus-stop-card__name').textContent;
    const stopNumber = card.querySelector('.bus-stop-card__stop-value').textContent;
    
    // Announce selection to screen readers
    announceBusStopSelection(stopName, stopNumber);
    
    console.log(`Selected bus stop: ${stopName} (Stop #${stopNumber})`);
}

function highlightInfoBox(box) {
    // Remove previous highlight
    document.querySelectorAll('.info-box').forEach(b => {
        b.classList.remove('info-box--highlighted');
    });
    
    // Add highlight to clicked box
    box.classList.add('info-box--highlighted');
    
    // Get info box data
    const title = box.querySelector('.info-box__title').textContent;
    
    // Announce selection to screen readers
    announceInfoBoxSelection(title);
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
        box.classList.remove('info-box--highlighted');
    }, 3000);
}

function announceBusStopSelection(name, number) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Selected bus stop: ${name}, stop number ${number}`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

function announceInfoBoxSelection(title) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Highlighted information: ${title}`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const feedbackButton = document.querySelector('.btn--feedback');
    
    if (contactForm) {
        // Add form submission handler
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
    
    if (feedbackButton) {
        // Add feedback button handler
        feedbackButton.addEventListener('click', handleFeedbackButton);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    const isValid = validateForm(form);
    
    if (isValid) {
        submitForm(data);
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is empty
    if (!value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    } else {
        // Email validation
        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Message length validation
        if (fieldName === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
    }
    
    // Show/hide error
    if (errorElement) {
        if (isValid) {
            errorElement.classList.remove('show');
            field.classList.remove('error');
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.classList.add('error');
        }
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.classList.remove('show');
        field.classList.remove('error');
    }
}

function submitForm(data) {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.btn--submit');
    
    // Disable form and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success state
        form.classList.add('success');
        submitButton.textContent = 'Message Sent!';
        
        // Announce success to screen readers
        announceFormSuccess();
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            form.classList.remove('success');
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="btn__text">Continue</span>';
        }, 3000);
        
        console.log('Form submitted:', data);
    }, 2000);
}

function handleFeedbackButton() {
    // Scroll to contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Focus on message field
        const messageField = document.getElementById('contactMessage');
        if (messageField) {
            setTimeout(() => {
                messageField.focus();
            }, 500);
        }
    }
}

function announceFormSuccess() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = 'Your message has been sent successfully. Thank you for your feedback!';
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

function initializeFooterLegal() {
    // Initialize legal document toggles
    const legalDocuments = document.querySelectorAll('.legal-document');
    
    legalDocuments.forEach(doc => {
        const header = doc.querySelector('.legal-document__header');
        const content = doc.querySelector('.legal-document__content');
        
        if (header && content) {
            // Add click handler
            header.addEventListener('click', function() {
                toggleLegalDocument(doc);
            });
            
            // Add keyboard support
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleLegalDocument(doc);
                }
            });
            
            // Make header focusable
            header.setAttribute('tabindex', '0');
        }
    });
    
    // Initialize footer navigation links
    const footerNavLinks = document.querySelectorAll('.footer__nav-link--legal');
    
    footerNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetDocument = document.getElementById(targetId);
            
            if (targetDocument) {
                // Scroll to the legal document
                targetDocument.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Open the document if it's closed
                const isExpanded = targetDocument.querySelector('.legal-document__header').getAttribute('aria-expanded') === 'true';
                if (!isExpanded) {
                    setTimeout(() => {
                        toggleLegalDocument(targetDocument);
                    }, 500);
                }
            }
        });
    });
}

function toggleLegalDocument(documentElement) {
    const header = documentElement.querySelector('.legal-document__header');
    const content = documentElement.querySelector('.legal-document__content');
    const icon = documentElement.querySelector('.legal-document__icon');
    
    if (!header || !content) return;
    
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    // Update ARIA attributes
    header.setAttribute('aria-expanded', newState.toString());
    content.setAttribute('aria-hidden', (!newState).toString());
    
    // Update visual state
    if (newState) {
        content.style.maxHeight = content.scrollHeight + 'px';
        header.classList.add('expanded');
    } else {
        content.style.maxHeight = '0';
        header.classList.remove('expanded');
    }
    
    // Announce state change to screen readers
    const documentTitle = header.querySelector('.legal-document__title').textContent;
    announceLegalDocumentToggle(documentTitle, newState);
    
    console.log(`${documentTitle} ${newState ? 'opened' : 'closed'}`);
}

function announceLegalDocumentToggle(title, isOpen) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `${title} ${isOpen ? 'opened' : 'closed'}`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}
