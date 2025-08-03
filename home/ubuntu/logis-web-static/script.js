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
            <h3 style="color: var(--primary-color); text-align: center; margin-bottom: 20px;">لوجِس</h3>
            <p style="text-align: center; color: var(--text-light); margin-bottom: 30px;">مرحباً بك، أحمد!</p>
        </div>
        <div class="demo-services">
            <h4 style="margin-bottom: 20px;">ما هي الخدمة التي تحتاجها؟</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-gas-pump" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">توصيل الغاز</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-tint" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">صهاريج المياه</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-toilet" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">خدمات الصرف الصحي</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-truck" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">خدمات النقل</span>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <h4 style="margin-bottom: 15px;">الحجوزات الأخيرة</h4>
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>توصيل الغاز</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">الخوير - مكتمل</p>
                    </div>
                    <span style="color: var(--success-color); font-size: 0.9rem;">✓</span>
                </div>
            </div>
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>صهريج مياه</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">روي - قيد التقدم</p>
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
            <h3 style="color: var(--primary-color); margin: 0;">توصيل الغاز</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 0.9rem;"><strong>الموقع:</strong> الخوير، مسقط</p>
                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: var(--text-light);">تغيير الموقع</p>
            </div>
            <h4 style="margin-bottom: 15px;">المزودون المتاحون</h4>
            <div class="provider-list">
                <div class="demo-provider-card" onclick="showDemoStep('providers')">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-left: 15px; margin-right: 0;">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div>
                            <strong>خدمات غاز عُمان</strong>
                            <div style="display: flex; align-items: center; margin-top: 5px;">
                                <span style="color: var(--warning-color);">★★★★☆</span>
                                <span style="margin-right: 5px; font-size: 0.9rem; color: var(--text-light); margin-left: 0;">(4.2)</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.9rem; color: var(--text-light);">2.5 كم بعيداً</span>
                        <span style="font-weight: bold; color: var(--primary-color);">8.5 ر.ع</span>
                    </div>
                </div>
                <div class="demo-provider-card" onclick="showDemoStep('providers')">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="width: 40px; height: 40px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-left: 15px; margin-right: 0;">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div>
                            <strong>توصيل غاز سريع</strong>
                            <div style="display: flex; align-items: center; margin-top: 5px;">
                                <span style="color: var(--warning-color);">★★★★★</span>
                                <span style="margin-right: 5px; font-size: 0.9rem; color: var(--text-light); margin-left: 0;">(4.8)</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.9rem; color: var(--text-light);">1.2 كم بعيداً</span>
                        <span style="font-weight: bold; color: var(--primary-color);">9.0 ر.ع</span>
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
            <h3 style="color: var(--primary-color); margin: 0;">توصيل غاز سريع</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 15px;">
                    <i class="fas fa-gas-pump" style="font-size: 2rem;"></i>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                    <span style="color: var(--warning-color); font-size: 1.2rem;">★★★★★</span>
                    <span style="margin-right: 10px; font-weight: bold; margin-left: 0;">4.8 (127 تقييم)</span>
                </div>
                <p style="color: var(--text-light); margin: 0;">1.2 كم بعيداً • متاح الآن</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">تفاصيل الخدمة</h4>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>حجم الأسطوانة:</strong> 12 كجم غاز بترول مسال</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>السعر:</strong> 9.0 ر.ع</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>وقت التسليم:</strong> 30-45 دقيقة</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>الدفع:</strong> نقداً، بطاقة، عبر الإنترنت</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px;">المراجعات الأخيرة</h4>
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="font-size: 0.9rem;">أحمد الرشيد</strong>
                        <span style="color: var(--warning-color);">★★★★★</span>
                    </div>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--text-light);">"توصيل سريع وخدمة احترافية. موصى به للغاية!"</p>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="font-size: 0.9rem;">فاطمة الزهراء</strong>
                        <span style="color: var(--warning-color);">★★★★☆</span>
                    </div>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--text-light);">"خدمة جيدة، وصلت في الوقت المحدد كما وعدوا."</p>
                </div>
            </div>
            
            <button onclick="showDemoStep('booking')" style="width: 100%; padding: 15px; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                احجز الآن - 9.0 ر.ع
            </button>
        </div>
    `;
}

function getDemoBookingContent() {
    return `
        <div class="demo-header">
            <button onclick="showDemoStep('providers')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">←</button>
            <h3 style="color: var(--primary-color); margin: 0;">تأكيد الحجز</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">مزود الخدمة</h4>
                <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-left: 15px; margin-right: 0;">
                        <i class="fas fa-gas-pump"></i>
                    </div>
                    <div>
                        <strong>توصيل غاز سريع</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">★★★★★ (4.8)</p>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">تفاصيل التسليم</h4>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>الخدمة:</strong> توصيل الغاز (12 كجم غاز بترول مسال)</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>الموقع:</strong> الخوير، مسقط</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>التاريخ:</strong> اليوم</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>الوقت:</strong> في أقرب وقت ممكن (30-45 دقيقة)</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">معلومات الاتصال</h4>
                <input type="text" placeholder="اسمك" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; margin-bottom: 10px;">
                <input type="tel" placeholder="رقم الهاتف" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; margin-bottom: 10px;">
                <textarea placeholder="تعليمات خاصة (اختياري)" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; height: 60px; resize: none;"></textarea>
            </div>
            
            <div style="background: white; border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>رسوم الخدمة:</span>
                    <span>9.0 ر.ع</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>رسوم التوصيل:</span>
                    <span>1.0 ر.ع</span>
                </div>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                    <span>الإجمالي:</span>
                    <span style="color: var(--primary-color);">10.0 ر.ع</span>
                </div>
            </div>
            
            <button onclick="confirmBooking()" style="width: 100%; padding: 15px; background: var(--success-color); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                تأكيد الحجز
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
            <h3 style="color: var(--success-color); margin-bottom: 15px;">تم تأكيد الحجز!</h3>
            <p style="margin-bottom: 20px; color: var(--text-light);">تم حجز توصيل الغاز الخاص بك بنجاح.</p>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: right;">
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>معرف الحجز:</strong> #LGS-2024-001</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>المزود:</strong> توصيل غاز سريع</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>وقت الوصول المقدر:</strong> 30-45 دقيقة</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>المبلغ الإجمالي:</strong> 10.0 ر.ع</p>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button onclick="showDemoStep('home')" style="flex: 1; padding: 12px; background: var(--bg-light); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">
                    العودة للرئيسية
                </button>
                <button style="flex: 1; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 6px; cursor: pointer;">
                    تتبع الطلب
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
        name: 'أحمد الرشيد',
        email: 'ahmed@example.com',
        phone: '+968 9XXX XXXX'
    };
    
    alert('تم تسجيل الدخول بنجاح! مرحباً بك في لوجِس.');
    hideLoginModal();
    
    // Update UI to show logged in state
    updateUIForLoggedInUser();
}

function register() {
    // Simulate registration
    currentUser = {
        name: 'مستخدم جديد',
        email: 'newuser@example.com',
        phone: '+968 9XXX XXXX'
    };
    
    alert('تم التسجيل بنجاح! مرحباً بك في لوجِس.');
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
    alert(`عرض ${providers.length} مزودين لخدمة ${serviceType} في منطقتك.`);
}

function getProvidersForService(serviceType) {
    const allProviders = {
        gas: [
            { name: 'خدمات غاز عُمان', rating: 4.2, distance: 2.5, price: 8.5 },
            { name: 'توصيل غاز سريع', rating: 4.8, distance: 1.2, price: 9.0 },
            { name: 'غاز الخليج', rating: 4.0, distance: 3.1, price: 8.0 }
        ],
        water: [
            { name: 'صهاريج مياه نقية', rating: 4.5, distance: 1.8, price: 15.0 },
            { name: 'تزويد مياه مسقط', rating: 4.3, distance: 2.2, price: 14.5 },
            { name: 'خدمات مياه عذبة', rating: 4.7, distance: 0.9, price: 16.0 }
        ],
        sewage: [
            { name: 'خدمات صرف صحي نظيفة', rating: 4.4, distance: 2.0, price: 25.0 },
            { name: 'إدارة النفايات في عُمان', rating: 4.1, distance: 3.5, price: 22.0 },
            { name: 'شركة الصرف الصحي الاحترافية', rating: 4.6, distance: 1.5, price: 28.0 }
        ],
        moving: [
            { name: 'نقل موثوق', rating: 4.3, distance: 2.8, price: 45.0 },
            { name: 'خدمات نقل سريعة', rating: 4.7, distance: 1.6, price: 50.0 },
            { name: 'نقل محترف في عُمان', rating: 4.2, distance: 3.2, price: 42.0 }
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
    alert('شكراً لاهتمامك! سنتواصل معك قريباً.');
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
    return `${amount.toFixed(1)} ر.ع`;
}

function formatDistance(distance) {
    return `${distance} كم بعيداً`;
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

