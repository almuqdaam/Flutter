// Global variables
let currentUser = null;
let selectedService = null;
let demoStep = 'home';

// Navigation functionality
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('active');
        });
    });
});

// Service selection
function selectService(serviceType) {
    selectedService = serviceType;
    showServiceProviders(serviceType);
}

function showServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

// Demo functionality
function showDemo() {
    const demoSection = document.getElementById('demo');
    demoSection.style.display = 'block';
    showDemoStep('home');
}

function hideDemo() {
    const demoSection = document.getElementById('demo');
    demoSection.style.display = 'none';
}

function showDemoStep(step) {
    demoStep = step;
    const demoScreen = document.getElementById('demoScreen');
    
    switch(step) {
        case 'home':
            demoScreen.innerHTML = getDemoHomeContent();
            break;
        case 'services':
            demoScreen.innerHTML = getDemoServicesContent();
            break;
        case 'providers':
            demoScreen.innerHTML = getDemoProvidersContent();
            break;
        case 'booking':
            demoScreen.innerHTML = getDemoBookingContent();
            break;
    }
}

function getDemoHomeContent() {
    return `
        <div class="demo-app-header">
            <h3 style="color: var(--primary-color); text-align: center; margin-bottom: 20px;">Logis</h3>
            <p style="text-align: center; color: var(--text-light); margin-bottom: 30px;">Welcome back, Ahmed!</p>
        </div>
        <div class="demo-services">
            <h4 style="margin-bottom: 20px;">What service do you need?</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-gas-pump" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">Gas Delivery</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-tint" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">Water Tanker</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-toilet" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">Sewage Service</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-truck" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">Moving Service</span>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <h4 style="margin-bottom: 15px;">Recent Bookings</h4>
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>Gas Delivery</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">Al Khuwair - Completed</p>
                    </div>
                    <span style="color: var(--success-color); font-size: 0.9rem;">✓</span>
                </div>
            </div>
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>Water Tanker</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">Ruwi - In Progress</p>
                    </div>
                    <span style="color: var(--warning-color); font-size: 0.9rem;">⏱</span>
                </div>
            </div>
        </div>
        <style>
            .demo-service-card {
                background: var(--bg-light);
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: transform 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .demo-service-card:hover {
                transform: translateY(-3px);
                background: #e0f2fe;
            }
        </style>
    `;
}

function getDemoServicesContent() {
    return `
        <div class="demo-header">
            <button onclick="showDemoStep('home')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">←</button>
            <h3 style="color: var(--primary-color); margin: 0;">Gas Delivery</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 0.9rem;"><strong>Location:</strong> Al Khuwair, Muscat</p>
                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: var(--text-light);">Change location</p>
            </div>
            <h4 style="margin-bottom: 15px;">Available Providers</h4>
            <div class="provider-list">
                <div class="demo-provider-card" onclick="showDemoStep('providers')">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-right: 15px;">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div>
                            <strong>Oman Gas Services</strong>
                            <div style="display: flex; align-items: center; margin-top: 5px;">
                                <span style="color: var(--warning-color);">★★★★☆</span>
                                <span style="margin-left: 5px; font-size: 0.9rem; color: var(--text-light);">(4.2)</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.9rem; color: var(--text-light);">2.5 km away</span>
                        <span style="font-weight: bold; color: var(--primary-color);">OMR 8.5</span>
                    </div>
                </div>
                <div class="demo-provider-card" onclick="showDemoStep('providers')">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="width: 40px; height: 40px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-right: 15px;">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div>
                            <strong>Quick Gas Delivery</strong>
                            <div style="display: flex; align-items: center; margin-top: 5px;">
                                <span style="color: var(--warning-color);">★★★★★</span>
                                <span style="margin-left: 5px; font-size: 0.9rem; color: var(--text-light);">(4.8)</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.9rem; color: var(--text-light);">1.2 km away</span>
                        <span style="font-weight: bold; color: var(--primary-color);">OMR 9.0</span>
                    </div>
                </div>
            </div>
        </div>
        <style>
            .demo-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 15px;
                border-bottom: 1px solid var(--border-color);
            }
            .demo-provider-card {
                background: white;
                border: 1px solid var(--border-color);
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .demo-provider-card:hover {
                border-color: var(--primary-color);
                transform: translateY(-2px);
            }
        </style>
    `;
}

function getDemoProvidersContent() {
    return `
        <div class="demo-header">
            <button onclick="showDemoStep('services')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">←</button>
            <h3 style="color: var(--primary-color); margin: 0;">Quick Gas Delivery</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 15px;">
                    <i class="fas fa-gas-pump" style="font-size: 2rem;"></i>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                    <span style="color: var(--warning-color); font-size: 1.2rem;">★★★★★</span>
                    <span style="margin-left: 10px; font-weight: bold;">4.8 (127 reviews)</span>
                </div>
                <p style="color: var(--text-light); margin: 0;">1.2 km away • Available now</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">Service Details</h4>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Cylinder Size:</strong> 12kg LPG</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Price:</strong> OMR 9.0</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Delivery Time:</strong> 30-45 minutes</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Payment:</strong> Cash, Card, Online</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px;">Recent Reviews</h4>
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="font-size: 0.9rem;">Ahmed Al-Rashid</strong>
                        <span style="color: var(--warning-color);">★★★★★</span>
                    </div>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--text-light);">"Fast delivery and professional service. Highly recommended!"</p>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="font-size: 0.9rem;">Fatima Al-Zahra</strong>
                        <span style="color: var(--warning-color);">★★★★☆</span>
                    </div>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--text-light);">"Good service, arrived on time as promised."</p>
                </div>
            </div>
            
            <button onclick="showDemoStep('booking')" style="width: 100%; padding: 15px; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                Book Now - OMR 9.0
            </button>
        </div>
    `;
}

function getDemoBookingContent() {
    return `
        <div class="demo-header">
            <button onclick="showDemoStep('providers')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">←</button>
            <h3 style="color: var(--primary-color); margin: 0;">Booking Confirmation</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">Service Provider</h4>
                <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-right: 15px;">
                        <i class="fas fa-gas-pump"></i>
                    </div>
                    <div>
                        <strong>Quick Gas Delivery</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">★★★★★ (4.8)</p>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">Delivery Details</h4>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Service:</strong> Gas Delivery (12kg LPG)</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Location:</strong> Al Khuwair, Muscat</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Date:</strong> Today</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Time:</strong> ASAP (30-45 min)</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">Contact Information</h4>
                <input type="text" placeholder="Your Name" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; margin-bottom: 10px;">
                <input type="tel" placeholder="Phone Number" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; margin-bottom: 10px;">
                <textarea placeholder="Special Instructions (Optional)" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; height: 60px; resize: none;"></textarea>
            </div>
            
            <div style="background: white; border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Service Fee:</span>
                    <span>OMR 9.0</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Delivery Fee:</span>
                    <span>OMR 1.0</span>
                </div>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                    <span>Total:</span>
                    <span style="color: var(--primary-color);">OMR 10.0</span>
                </div>
            </div>
            
            <button onclick="confirmBooking()" style="width: 100%; padding: 15px; background: var(--success-color); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                Confirm Booking
            </button>
        </div>
    `;
}

function confirmBooking() {
    const demoScreen = document.getElementById('demoScreen');
    demoScreen.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="width: 80px; height: 80px; background: var(--success-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 20px;">
                <i class="fas fa-check" style="font-size: 2rem;"></i>
            </div>
            <h3 style="color: var(--success-color); margin-bottom: 15px;">Booking Confirmed!</h3>
            <p style="margin-bottom: 20px; color: var(--text-light);">Your gas delivery has been booked successfully.</p>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: left;">
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Booking ID:</strong> #LGS-2024-001</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Provider:</strong> Quick Gas Delivery</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Estimated Arrival:</strong> 30-45 minutes</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Total Amount:</strong> OMR 10.0</p>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button onclick="showDemoStep('home')" style="flex: 1; padding: 12px; background: var(--bg-light); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">
                    Back to Home
                </button>
                <button style="flex: 1; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Track Order
                </button>
            </div>
        </div>
    `;
}

// Modal functionality
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    
    // Update tab styles
    const tabs = document.querySelectorAll('.auth-tab');
    tabs[0].classList.add('active');
    tabs[1].classList.remove('active');
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    
    // Update tab styles
    const tabs = document.querySelectorAll('.auth-tab');
    tabs[0].classList.remove('active');
    tabs[1].classList.add('active');
}

function login() {
    // Simulate login
    currentUser = {
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
        phone: '+968 9XXX XXXX'
    };
    
    alert('Login successful! Welcome to Logis.');
    hideLoginModal();
    
    // Update UI to show logged in state
    updateUIForLoggedInUser();
}

function register() {
    // Simulate registration
    currentUser = {
        name: 'New User',
        email: 'newuser@example.com',
        phone: '+968 9XXX XXXX'
    };
    
    alert('Registration successful! Welcome to Logis.');
    hideLoginModal();
    
    // Update UI to show logged in state
    updateUIForLoggedInUser();
}

function updateUIForLoggedInUser() {
    // This would update the UI to show user-specific content
    console.log('User logged in:', currentUser);
}

// Service provider simulation
function showServiceProviders(serviceType) {
    const providers = getProvidersForService(serviceType);
    
    // This would typically navigate to a providers page
    // For demo purposes, we'll show an alert
    alert(`Showing ${providers.length} providers for ${serviceType} service in your area.`);
}

function getProvidersForService(serviceType) {
    const allProviders = {
        gas: [
            { name: 'Oman Gas Services', rating: 4.2, distance: 2.5, price: 8.5 },
            { name: 'Quick Gas Delivery', rating: 4.8, distance: 1.2, price: 9.0 },
            { name: 'Al Khaleej Gas', rating: 4.0, distance: 3.1, price: 8.0 }
        ],
        water: [
            { name: 'Pure Water Tankers', rating: 4.5, distance: 1.8, price: 15.0 },
            { name: 'Muscat Water Supply', rating: 4.3, distance: 2.2, price: 14.5 },
            { name: 'Fresh Water Services', rating: 4.7, distance: 0.9, price: 16.0 }
        ],
        sewage: [
            { name: 'Clean Sewage Services', rating: 4.4, distance: 2.0, price: 25.0 },
            { name: 'Oman Waste Management', rating: 4.1, distance: 3.5, price: 22.0 },
            { name: 'Professional Sewage Co.', rating: 4.6, distance: 1.5, price: 28.0 }
        ],
        moving: [
            { name: 'Reliable Movers', rating: 4.3, distance: 2.8, price: 45.0 },
            { name: 'Express Moving Services', rating: 4.7, distance: 1.6, price: 50.0 },
            { name: 'Oman Professional Movers', rating: 4.2, distance: 3.2, price: 42.0 }
        ]
    };
    
    return allProviders[serviceType] || [];
}

// Contact form submission
function submitContact(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    alert('Thank you for your interest! We will get back to you soon.');
    event.target.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        hideLoginModal();
    }
    
    const demoSection = document.getElementById('demo');
    if (event.target === demoSection) {
        hideDemo();
    }
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-item, .step, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.service-item, .step, .feature');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation check
    animateOnScroll();
});

// Utility functions
function formatCurrency(amount) {
    return `OMR ${amount.toFixed(1)}`;
}

function formatDistance(distance) {
    return `${distance} km away`;
}

function formatRating(rating) {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return `${stars} (${rating})`;
}

// Export functions for potential use in other scripts
window.LogisApp = {
    selectService,
    showDemo,
    hideDemo,
    showLoginModal,
    hideLoginModal,
    login,
    register,
    submitContact
};

