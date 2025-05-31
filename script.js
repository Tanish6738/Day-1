// LMB Jaipur - Royal Heritage Website JavaScript

// ===== GLOBAL VARIABLES =====
let cart = [];
let currentTestimonial = 0;
let currentSlide = 0;

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const contactForm = document.getElementById('contactForm');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading animation
    initLuxuryLoader();
    
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Add royal dividers between sections
    addRoyalDividers();
    
    initEventListeners();
    
    // Initialize hero parallax effect
    initHeroParallax();
});

// Function to initialize all event listeners
function initEventListeners() {
    // Navigation scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Menu accordion functionality
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const header = item.querySelector('.menu-header');
        if (header) {
            header.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        }
    });

    // Sweets filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sweetCards = document.querySelectorAll('.sweet-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            sweetCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Thali slider functionality
    const sliderBtns = document.querySelectorAll('.slider-btn');
    const sliderImages = document.querySelectorAll('.thali-slider img');

    sliderBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and images
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            sliderImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked button and corresponding image
            this.classList.add('active');
            sliderImages[index].classList.add('active');
        });
    });

    // Testimonial carousel functionality
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    const testimonials = document.querySelectorAll('.testimonial');

    carouselBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and testimonials
            carouselBtns.forEach(btn => btn.classList.remove('active'));
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            
            // Add active class to clicked button and corresponding testimonial
            this.classList.add('active');
            testimonials[index].classList.add('active');
        });
    });

    // Hotel gallery functionality
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnails img');
    const galleryMain = document.querySelector('.gallery-main img');

    if (galleryMain && galleryThumbnails.length > 0) {
        galleryThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                galleryMain.src = this.src.replace('w=150&h=150', 'w=500&h=600');
            });
        });
    }

    // Shopping cart functionality
    if (cartBtn && cartSidebar && cartClose && cartOverlay) {
        cartBtn.addEventListener('click', function() {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        cartClose.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        cartOverlay.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const price = parseFloat(this.getAttribute('data-price'));
            const name = this.parentElement.querySelector('h3').textContent;
            
            // Check if item is already in cart
            const existingItem = cart.find(cartItem => cartItem.item === item);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    item: item,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show a brief animation or feedback
            this.innerHTML = '✓ Added';
            setTimeout(() => {
                this.innerHTML = 'Add to Cart';
            }, 1500);
        });
    });

    // Contact form functionality
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you'd send form data to server here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}

// ===== ROYAL DIVIDERS =====
function addRoyalDividers() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index > 0) { // Skip the first section (hero)
            const prevSection = sections[index - 1];
            const divider = document.createElement('div');
            divider.className = 'royal-divider';
            divider.innerHTML = '<span class="emblem">✦</span>';
            
            // Insert divider before current section
            section.parentNode.insertBefore(divider, section);
        }
    });
}

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===== ACTIVE NAV LINK UPDATE =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling for navigation links
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80, // 80px offset for navbar
            behavior: 'smooth'
        });
    }
};

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-image');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in effect
    const fadeElements = document.querySelectorAll('.sweet-card, .gift-card, .timeline-item');
    fadeElements.forEach(el => observer.observe(el));
}

// ===== CART FUNCTIONALITY =====
function initCart() {
    // Cart toggle
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const price = parseInt(this.getAttribute('data-price'));
            addToCart(item, price);
        });
    });

    // Load cart from localStorage
    loadCartFromStorage();
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showAddToCartNotification(itemName);
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
    saveCartToStorage();
}

function updateCartQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

// Function to update cart UI
function updateCart() {
    if (cartItems && cartTotal && cartCount) {
        // Clear cart items
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0';
            cartCount.textContent = '0';
            return;
        }
        
        // Calculate total
        let total = 0;
        let count = 0;
        
        // Add each item to cart
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            count += item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
                </div>
                <div class="cart-item-total">₹${itemTotal}</div>
                <button class="cart-item-remove" data-item="${item.item}">×</button>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Update total and count
        cartTotal.textContent = total;
        cartCount.textContent = count;
        
        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemToRemove = this.getAttribute('data-item');
                cart = cart.filter(item => item.item !== itemToRemove);
                updateCart();
            });
        });
    }
}

function formatItemName(name) {
    return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function saveCartToStorage() {
    localStorage.setItem('lmb_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('lmb_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function showAddToCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${formatItemName(itemName)} added to cart!
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: var(--accent-color);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== SWEET FILTERS =====
function initSweetFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sweetCards = document.querySelectorAll('.sweet-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter sweet cards
            sweetCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== TESTIMONIALS CAROUSEL =====
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    
    if (testimonials.length === 0) return;

    // Auto-advance testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000);

    // Manual navigation
    carouselBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        carouselBtns.forEach(b => b.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        carouselBtns[index].classList.add('active');
        
        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
}

// ===== THALI IMAGE SLIDER =====
function initThaliSlider() {
    const slides = document.querySelectorAll('.thali-slider img');
    const sliderBtns = document.querySelectorAll('.slider-btn');
    
    if (slides.length === 0) return;

    // Auto-advance slides
    setInterval(() => {
        nextSlide();
    }, 4000);

    // Manual navigation
    sliderBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showSlide(index);
        });
    });

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        sliderBtns.forEach(b => b.classList.remove('active'));
        
        slides[index].classList.add('active');
        sliderBtns[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}

// ===== MENU ACCORDION =====
function initMenuAccordion() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const header = item.querySelector('.menu-header');
        
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showFormNotification('Message sent successfully! We will get back to you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function showFormNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'var(--primary-color)' : '#ff4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== HOTEL GALLERY =====
function initHotelGallery() {
    const mainImage = document.querySelector('.gallery-main img');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const newSrc = this.src.replace('150x150', '500x600');
            mainImage.src = newSrc;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.style.opacity = '0.7');
            this.style.opacity = '1';
        });
    });
}

// ===== QUICK VIEW FUNCTIONALITY =====
function initQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sweetCard = this.closest('.sweet-card');
            const sweetName = sweetCard.querySelector('h3').textContent;
            const sweetImage = sweetCard.querySelector('img').src;
            const sweetPrice = sweetCard.querySelector('.sweet-price').textContent;
            const sweetDescription = sweetCard.querySelector('p').textContent;
            
            showQuickViewModal(sweetName, sweetImage, sweetPrice, sweetDescription);
        });
    });
}

function showQuickViewModal(name, image, price, description) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="modal-info">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <div class="modal-price">${price}</div>
                    <div class="quantity-selector">
                        <label>Quantity:</label>
                        <button class="qty-btn minus">-</button>
                        <span class="qty-value">1</span>
                        <button class="qty-btn plus">+</button>
                    </div>
                    <button class="btn btn-primary modal-add-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    function closeModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }
    
    // Quantity selector
    const qtyValue = modal.querySelector('.qty-value');
    const minusBtn = modal.querySelector('.minus');
    const plusBtn = modal.querySelector('.plus');
    
    let quantity = 1;
    
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyValue.textContent = quantity;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        quantity++;
        qtyValue.textContent = quantity;
    });
    
    // Add to cart from modal
    const addCartBtn = modal.querySelector('.modal-add-cart');
    addCartBtn.addEventListener('click', () => {
        const itemName = name.toLowerCase().replace(/\s+/g, '-');
        const itemPrice = parseInt(price.replace(/[^\d]/g, ''));
        
        for (let i = 0; i < quantity; i++) {
            addToCart(itemName, itemPrice);
        }
        
        closeModal();
    });
}

// ===== LOADING ANIMATION =====
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="https://via.placeholder.com/80x60/C9A35C/FFFFFF?text=LMB" alt="LMB">
            </div>
            <div class="loader-spinner"></div>
            <p>Loading Royal Experience...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-color);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 500);
    }, 1500);
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const sweetCards = document.querySelectorAll('.sweet-card');
        
        sweetCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (name.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== COOKIE CONSENT =====
function initCookieConsent() {
    if (!localStorage.getItem('lmb_cookies_accepted')) {
        const consent = document.createElement('div');
        consent.className = 'cookie-consent';
        consent.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.</p>
                <button class="btn btn-primary accept-cookies">Accept</button>
            </div>
        `;
        
        consent.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: var(--primary-color);
            color: white;
            padding: 20px;
            z-index: 2000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(consent);
        
        setTimeout(() => {
            consent.style.transform = 'translateY(0)';
        }, 1000);
        
        const acceptBtn = consent.querySelector('.accept-cookies');
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('lmb_cookies_accepted', 'true');
            consent.style.transform = 'translateY(100%)';
            setTimeout(() => {
                document.body.removeChild(consent);
            }, 300);
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// ===== LUXURY LOADER ANIMATION =====
function initLuxuryLoader() {
    const luxuryLoader = document.getElementById('luxuryLoader');
    
    if (!luxuryLoader) return;
    
    // Force scrollbar to show during loading to prevent layout shift
    document.body.style.overflow = 'hidden';
      // Add content loaded listener
    window.addEventListener('load', function() {
        setTimeout(() => {
            // Start fadeout animation
            luxuryLoader.classList.add('fade-out');
            
            // Enable scrolling after animation
            setTimeout(() => {
                document.body.style.overflow = '';
                
                // Trigger zoom effect on hero image
                const heroImage = document.getElementById('heroImage');
                if (heroImage) {
                    heroImage.classList.add('zoom-effect');
                }
                
                // Ensure hero content is visible with proper background
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.opacity = '1';
                }
                
                // Refresh AOS
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 800);
        }, 1500);
    });
}

// ===== HERO PARALLAX EFFECT =====
function initHeroParallax() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.getElementById('heroImage');
    
    if (!heroSection || !heroImage) return;
    
    // Add ornament animation
    const ornaments = document.querySelectorAll('.ornament');
    ornaments.forEach(ornament => {
        const speed = 0.03 + Math.random() * 0.02;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        setInterval(() => {
            ornament.style.transform = `rotate(${direction * performance.now() * speed % 360}deg)`;
        }, 100);
    });
      // Parallax scroll effect
    window.addEventListener('scroll', function() {
        if (!isInViewport(heroSection)) return;
        
        const scrollPosition = window.scrollY;
        if (scrollPosition <= heroSection.offsetHeight) {
            const parallaxOffset = scrollPosition * 0.4;
            heroImage.style.transform = `scale(1.15) translateY(${parallaxOffset}px)`;
            
            // Add subtle opacity effect to overlay
            const heroOverlay = document.querySelector('.hero-overlay');
            if (heroOverlay) {
                const baseOpacity = 0.85; // Increased base opacity for better text visibility
                const scrollOpacity = scrollPosition / heroSection.offsetHeight * 0.15;
                heroOverlay.style.backgroundColor = `rgba(80, 0, 0, ${baseOpacity + scrollOpacity})`;
            }
            
            // Adjust hero content background opacity for better visibility while scrolling
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                const baseContentOpacity = 0.4; // Base background opacity
                const scrollContentOpacity = scrollPosition / heroSection.offsetHeight * 0.2;
                heroContent.style.backgroundColor = `rgba(0, 0, 0, ${baseContentOpacity + scrollContentOpacity})`;
            }
        }
    });
    
    // Mouse move effect for added depth
    heroSection.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        heroImage.style.transform = `scale(1.15) translate(${-xPos}px, ${-yPos}px)`;
        
        // Move ornaments in opposite direction for depth effect
        ornaments.forEach((ornament, index) => {
            const factor = 0.5 + (index * 0.1);
            ornament.style.transform = `translate(${xPos * factor}px, ${yPos * factor}px) rotate(${ornament.style.transform ? ornament.style.transform.split('rotate(')[1] : '0deg'})`;
        });
    });
    
    // Reset transform on mouse leave
    heroSection.addEventListener('mouseleave', function() {
        heroImage.style.transform = 'scale(1.15)';
        
        // Reset ornament positions
        ornaments.forEach(ornament => {
            ornament.style.transform = `rotate(${ornament.style.transform ? ornament.style.transform.split('rotate(')[1] : '0deg'})`;
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// ===== EVENT LISTENERS =====

// Window load event
window.addEventListener('load', function() {
    // Hide loading screen if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Initialize additional features
    initHotelGallery();
    initQuickView();
    initCookieConsent();
    optimizeImages();
});

// Window resize event
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Recalculate AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close cart with Escape key
    if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
        closeCart();
    }
    
    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft') {
        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : 2;
        showTestimonial(currentTestimonial);
    } else if (e.key === 'ArrowRight') {
        currentTestimonial = (currentTestimonial + 1) % 3;
        showTestimonial(currentTestimonial);
    }
});

// ===== SERVICE WORKER =====
// Only register service worker in production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
} else {
    console.log('Service worker not registered in development environment');
}

// ===== ANALYTICS TRACKING =====
function trackEvent(category, action, label) {
    // Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track cart actions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const itemName = e.target.getAttribute('data-item');
        trackEvent('Cart', 'Add Item', itemName);
    }
    
    if (e.target.classList.contains('cart-checkout')) {
        trackEvent('Cart', 'Checkout Initiated', 'Sidebar');
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Show user-friendly error message
    const errorNotification = document.createElement('div');
    errorNotification.className = 'error-notification';
    errorNotification.textContent = 'Something went wrong. Please refresh the page.';
    errorNotification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 2000;
    `;
    
    document.body.appendChild(errorNotification);
    
    setTimeout(() => {
        document.body.removeChild(errorNotification);
    }, 5000);
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
%c🍭 Welcome to LMB Jaipur - Royal Heritage Since 1727 🍭
%c========================================================
Serving authentic Rajasthani flavours with modern digital experience.
Website developed with ❤️ for the royal food lovers.
`, 
'color: #C9A35C; font-size: 16px; font-weight: bold;', 
'color: #800000; font-size: 12px;');

// ===== EXPORT FUNCTIONS FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateCartQuantity,
        formatItemName,
        scrollToSection
    };
}