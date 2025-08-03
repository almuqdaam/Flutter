let currentUser = null;
let selectedService = null;
let demoStep = 'home';

const translations = {
    'ar': {
        'page_title': 'لوجِس - خدمات عُمان الأساسية، بلمسة زر',
        'logis_brand_ar': 'لوجِس',
        'logis_brand_en': 'Logis',
        'nav_home': 'الرئيسية',
        'nav_services': 'الخدمات',
        'nav_about': 'عن لوجِس',
        'nav_contact': 'اتصل بنا',
        'nav_login': 'تسجيل الدخول',
        'hero_title_part1': 'خدمات عُمان الأساسية،',
        'hero_title_part2': 'بلمسة زر',
        'hero_description': 'تواصل مع مزودي الخدمات الموثوق بهم لتوصيل الغاز، صهاريج المياه، خدمات الصرف الصحي، وخدمات نقل الأثاث في جميع أنحاء عُمان.',
        'hero_get_started': 'ابدأ الآن',
        'hero_watch_demo': 'شاهد العرض التوضيحي',
        'logis_brand_ar_app': 'لوجِس',
        'service_gas_delivery': 'توصيل الغاز',
        'service_water_tanker': 'صهاريج المياه',
        'service_sewage': 'خدمات الصرف الصحي',
        'service_moving': 'خدمات النقل',
        'our_services_title': 'خدماتنا',
        'our_services_description': 'خدمات أساسية للمرافق واللوجستيات في متناول يدك',
        'service_gas_delivery_title': 'توصيل الغاز',
        'service_gas_delivery_desc': 'اطلب اسطوانات غاز البترول المسال للمنزل أو العمل مع خدمة توصيل سريعة وموثوقة في جميع أنحاء عُمان.',
        'feature_same_day_delivery': 'توصيل في نفس اليوم',
        'feature_licensed_providers': 'مزودون مرخصون',
        'feature_competitive_pricing': 'أسعار تنافسية',
        'service_water_tanker_title': 'صهاريج المياه',
        'service_water_tanker_desc': 'احصل على مياه نظيفة يتم توصيلها إلى موقعك من خلال شبكتنا من موردي المياه المعتمدين.',
        'feature_clean_water': 'مياه نظيفة ومختبرة',
        'feature_various_tank_sizes': 'أحجام خزانات متنوعة',
        'feature_emergency_service': 'خدمة طوارئ',
        'service_sewage_title': 'خدمات الصرف الصحي',
        'service_sewage_desc': 'خدمات احترافية لإدارة الصرف الصحي والنفايات للعقارات السكنية والتجارية.',
        'feature_24_7_availability': 'متوفرة 24/7',
        'feature_eco_friendly_disposal': 'التخلص الصديق للبيئة',
        'feature_licensed_operators': 'مشغلون مرخصون',
        'service_moving_title': 'خدمات النقل',
        'service_moving_desc': 'خدمات نقل الأثاث والمنازل الاحترافية مع فرق ذوي خبرة ومعدات مناسبة.',
        'feature_trained_movers': 'ناقلون مدربون',
        'feature_insurance_coverage': 'تغطية تأمينية',
        'feature_flexible_scheduling': 'جدولة مرنة',
        'how_it_works_title': 'كيف تعمل',
        'how_it_works_description': 'خطوات بسيطة للحصول على الخدمة التي تحتاجها',
        'step1_title': 'اختر الخدمة',
        'step1_desc': 'اختر الخدمة التي تحتاجها من فئاتنا الأربع الرئيسية',
        'step2_title': 'ابحث عن مزود',
        'step2_desc': 'تصفح مزودي الخدمات القريبين مع التقييمات والأسعار',
        'step3_title': 'احجز وتتبع',
        'step3_desc': 'حدد موعد خدمتك وتتبع مزود الخدمة في الوقت الفعلي',
        'step4_title': 'قيم وادفع',
        'step4_desc': 'أكمل الدفع وقيم تجربتك',
        'demo_title': 'عرض توضيحي تفاعلي',
        'demo_description': 'جرب تدفق تطبيق لوجِس',
        'demo_home_btn': 'الرئيسية',
        'demo_services_btn': 'الخدمات',
        'demo_providers_btn': 'المزودون',
        'demo_booking_btn': 'الحجز',
        'about_title': 'عن لوجِس',
        'about_desc1': 'يعالج لوجِس فجوة حرجة في قطاع الخدمات في عُمان من خلال توفير منصة مركزية وسهلة الاستخدام تربط الأفراد بخدمات المرافق واللوجستيات الأساسية عند الطلب.',
        'about_desc2': 'مهمتنا هي تحويل كيفية وصول العمانيين إلى الخدمات الأساسية، مما يجعلها أكثر سهولة وموثوقية وشفافية من خلال التكنولوجيا.',
        'stat_categories_num': '4',
        'stat_categories_text': 'فئات الخدمة',
        'stat_providers_num': '100+',
        'stat_providers_text': 'مزود شريك',
        'stat_support_num': '24/7',
        'stat_support_text': 'دعم العملاء',
        'feature_realtime_tracking': 'تتبع في الوقت الفعلي',
        'feature_provider_ratings': 'تقييمات المزودين',
        'feature_secure_payments': 'مدفوعات آمنة',
        'feature_flexible_scheduling': 'جدولة مرنة',
        'contact_title': 'تواصل معنا',
        'contact_description': 'هل أنت مستعد للانضمام إلى شبكة لوجِس أو لديك أسئلة؟',
        'contact_email_title': 'البريد الإلكتروني',
        'contact_email_address': 'info@logis.om',
        'contact_phone_title': 'الهاتف',
        'contact_phone_number': '+968 9XXX XXXX',
        'contact_location_title': 'الموقع',
        'contact_location_address': 'مسقط، عُمان',
        'contact_form_name_placeholder': 'اسمك',
        'contact_form_email_placeholder': 'بريدك الإلكتروني',
        'contact_form_interest_placeholder': 'أنا مهتم بـ...',
        'contact_form_interest_customer': 'استخدام لوجِس كعميل',
        'contact_form_interest_provider': 'أن أصبح مزود خدمة',
        'contact_form_interest_investor': 'فرص الاستثمار',
        'contact_form_interest_partnership': 'فرص الشراكة',
        'contact_form_message_placeholder': 'رسالتك',
        'contact_form_submit_btn': 'إرسال الرسالة',
        'footer_tagline': 'خدمات عُمان الأساسية، بلمسة زر',
        'footer_services_title': 'الخدمات',
        'footer_gas_delivery': 'توصيل الغاز',
        'footer_water_tanker': 'صهاريج المياه',
        'footer_sewage': 'خدمات الصرف الصحي',
        'footer_moving': 'خدمات النقل',
        'footer_company_title': 'الشركة',
        'footer_about_us': 'عنا',
        'footer_contact': 'اتصل بنا',
        'footer_privacy_policy': 'سياسة الخصوصية',
        'footer_terms_of_service': 'شروط الخدمة',
        'footer_connect_title': 'تواصل',
        'footer_twitter': 'تويتر',
        'footer_linkedin': 'لينكد إن',
        'footer_instagram': 'انستغرام',
        'footer_copyright': '© 2024 لوجِس. جميع الحقوق محفوظة.',
        'modal_welcome_title': 'مرحباً بك في لوجِس',
        'modal_login_tab': 'تسجيل الدخول',
        'modal_register_tab': 'التسجيل',
        'modal_email_placeholder': 'البريد الإلكتروني',
        'modal_password_placeholder': 'كلمة المرور',
        'modal_login_btn': 'تسجيل الدخول',
        'modal_no_account': 'ليس لديك حساب؟',
        'modal_register_here': 'سجل هنا',
        'modal_full_name_placeholder': 'الاسم الكامل',
        'modal_email_placeholder_reg': 'البريد الإلكتروني',
        'modal_phone_placeholder': 'رقم الهاتف',
        'modal_password_placeholder_reg': 'كلمة المرور',
        'modal_confirm_password_placeholder': 'تأكيد كلمة المرور',
        'modal_register_btn': 'التسجيل',
        'modal_already_account': 'هل لديك حساب بالفعل؟',
        'modal_login_here': 'سجل الدخول هنا',
        'demo_welcome_ahmed': 'مرحباً بك، أحمد!',
        'demo_what_service': 'ما هي الخدمة التي تحتاجها؟',
        'demo_recent_bookings': 'الحجوزات الأخيرة',
        'demo_gas_delivery_completed': 'توصيل الغاز - الخوير - مكتمل',
        'demo_water_tanker_inprogress': 'صهريج مياه - روي - قيد التقدم',
        'demo_location': 'الموقع:',
        'demo_change_location': 'تغيير الموقع',
        'demo_available_providers': 'المزودون المتاحون',
        'demo_gas_oman_services': 'خدمات غاز عُمان',
        'demo_fast_gas_delivery': 'توصيل غاز سريع',
        'demo_km_away': 'كم بعيداً',
        'demo_book_now': 'احجز الآن',
        'demo_service_details': 'تفاصيل الخدمة',
        'demo_cylinder_size': 'حجم الأسطوانة:',
        'demo_price': 'السعر:',
        'demo_delivery_time': 'وقت التسليم:',
        'demo_payment': 'الدفع:',
        'demo_cash': 'نقداً، بطاقة، عبر الإنترنت',
        'demo_recent_reviews': 'المراجعات الأخيرة',
        'demo_ahmed_review': 'توصيل سريع وخدمة احترافية. موصى به للغاية!',
        'demo_fatima_review': 'خدمة جيدة، وصلت في الوقت المحدد كما وعدوا.',
        'demo_confirm_booking': 'تأكيد الحجز',
        'demo_service_provider': 'مزود الخدمة',
        'demo_delivery_details': 'تفاصيل التسليم',
        'demo_service': 'الخدمة:',
        'demo_location_booking': 'الموقع:',
        'demo_date': 'التاريخ:',
        'demo_time': 'الوقت:',
        'demo_asap': 'في أقرب وقت ممكن (30-45 دقيقة)',
        'demo_contact_info': 'معلومات الاتصال',
        'demo_your_name': 'اسمك',
        'demo_phone_number': 'رقم الهاتف',
        'demo_special_instructions': 'تعليمات خاصة (اختياري)',
        'demo_service_fee': 'رسوم الخدمة:',
        'demo_delivery_fee': 'رسوم التوصيل:',
        'demo_total': 'الإجمالي:',
        'demo_booking_confirmed': 'تم تأكيد الحجز!',
        'demo_booking_success_message': 'تم حجز توصيل الغاز الخاص بك بنجاح.',
        'demo_booking_id': 'معرف الحجز:',
        'demo_provider': 'المزود:',
        'demo_eta': 'وقت الوصول المقدر:',
        'demo_total_amount': 'المبلغ الإجمالي:',
        'demo_back_to_home': 'العودة للرئيسية',
        'demo_track_order': 'تتبع الطلب',
        'alert_login_success': 'تم تسجيل الدخول بنجاح! مرحباً بك في لوجِس.',
        'alert_register_success': 'تم التسجيل بنجاح! مرحباً بك في لوجِس.',
        'alert_show_providers': 'عرض {count} مزودين لخدمة {serviceType} في منطقتك.',
        'alert_contact_success': 'شكراً لاهتمامك! سنتواصل معك قريباً.'
    },
    'en': {
        'page_title': 'Logis - Oman\'s Essential Services, At Your Fingertips',
        'logis_brand_ar': 'Logis',
        'logis_brand_en': 'لوجِس',
        'nav_home': 'Home',
        'nav_services': 'Services',
        'nav_about': 'About Logis',
        'nav_contact': 'Contact Us',
        'nav_login': 'Login',
        'hero_title_part1': 'Oman\'s Essential Services,',
        'hero_title_part2': 'At Your Fingertips',
        'hero_description': 'Connect with trusted service providers for gas delivery, water tankers, sewage services, and furniture moving services across Oman.',
        'hero_get_started': 'Get Started',
        'hero_watch_demo': 'Watch Demo',
        'logis_brand_ar_app': 'Logis',
        'service_gas_delivery': 'Gas Delivery',
        'service_water_tanker': 'Water Tankers',
        'service_sewage': 'Sewage Services',
        'service_moving': 'Moving Services',
        'our_services_title': 'Our Services',
        'our_services_description': 'Essential Utility & Logistics Services at Your Fingertips',
        'service_gas_delivery_title': 'Gas Delivery',
        'service_gas_delivery_desc': 'Order LPG gas cylinders for home or business with fast and reliable delivery across Oman.',
        'feature_same_day_delivery': 'Same-Day Delivery',
        'feature_licensed_providers': 'Licensed Providers',
        'feature_competitive_pricing': 'Competitive Pricing',
        'service_water_tanker_title': 'Water Tankers',
        'service_water_tanker_desc': 'Get clean water delivered to your location through our network of certified water suppliers.',
        'feature_clean_water': 'Clean & Tested Water',
        'feature_various_tank_sizes': 'Various Tank Sizes',
        'feature_emergency_service': 'Emergency Service',
        'service_sewage_title': 'Sewage Services',
        'service_sewage_desc': 'Professional sewage and waste management services for residential and commercial properties.',
        'feature_24_7_availability': '24/7 Availability',
        'feature_eco_friendly_disposal': 'Eco-Friendly Disposal',
        'feature_licensed_operators': 'Licensed Operators',
        'service_moving_title': 'Moving Services',
        'service_moving_desc': 'Professional furniture and home moving services with experienced teams and proper equipment.',
        'feature_trained_movers': 'Trained Movers',
        'feature_insurance_coverage': 'Insurance Coverage',
        'feature_flexible_scheduling': 'Flexible Scheduling',
        'how_it_works_title': 'How It Works',
        'how_it_works_description': 'Simple Steps to Get the Service You Need',
        'step1_title': 'Choose Service',
        'step1_desc': 'Select the service you need from our four main categories',
        'step2_title': 'Find Provider',
        'step2_desc': 'Browse nearby service providers with ratings and prices',
        'step3_title': 'Book & Track',
        'step3_desc': 'Schedule your service and track your provider in real-time',
        'step4_title': 'Rate & Pay',
        'step4_desc': 'Complete payment and rate your experience',
        'demo_title': 'Interactive Demo',
        'demo_description': 'Experience the Logis app flow',
        'demo_home_btn': 'Home',
        'demo_services_btn': 'Services',
        'demo_providers_btn': 'Providers',
        'demo_booking_btn': 'Booking',
        'about_title': 'About Logis',
        'about_desc1': 'Logis addresses a critical gap in Oman\'s service sector by providing a centralized, user-friendly platform that connects individuals to essential on-demand utility and logistics services.',
        'about_desc2': 'Our mission is to transform how Omanis access essential services, making them more accessible, reliable, and transparent through technology.',
        'stat_categories_num': '4',
        'stat_categories_text': 'Service Categories',
        'stat_providers_num': '100+',
        'stat_providers_text': 'Partner Providers',
        'stat_support_num': '24/7',
        'stat_support_text': 'Customer Support',
        'feature_realtime_tracking': 'Real-time Tracking',
        'feature_provider_ratings': 'Provider Ratings',
        'feature_secure_payments': 'Secure Payments',
        'feature_flexible_scheduling': 'Flexible Scheduling',
        'contact_title': 'Contact Us',
        'contact_description': 'Ready to join the Logis network or have questions?',
        'contact_email_title': 'Email',
        'contact_email_address': 'info@logis.om',
        'contact_phone_title': 'Phone',
        'contact_phone_number': '+968 9XXX XXXX',
        'contact_location_title': 'Location',
        'contact_location_address': 'Muscat, Oman',
        'contact_form_name_placeholder': 'Your Name',
        'contact_form_email_placeholder': 'Your Email',
        'contact_form_interest_placeholder': 'I am interested in...',
        'contact_form_interest_customer': 'Using Logis as a customer',
        'contact_form_interest_provider': 'Becoming a service provider',
        'contact_form_interest_investor': 'Investment opportunities',
        'contact_form_interest_partnership': 'Partnership opportunities',
        'contact_form_message_placeholder': 'Your Message',
        'contact_form_submit_btn': 'Send Message',
        'footer_tagline': 'Oman\'s Essential Services, At Your Fingertips',
        'footer_services_title': 'Services',
        'footer_gas_delivery': 'Gas Delivery',
        'footer_water_tanker': 'Water Tankers',
        'footer_sewage': 'Sewage Services',
        'footer_moving': 'Moving Services',
        'footer_company_title': 'Company',
        'footer_about_us': 'About Us',
        'footer_contact': 'Contact',
        'footer_privacy_policy': 'Privacy Policy',
        'footer_terms_of_service': 'Terms of Service',
        'footer_connect_title': 'Connect',
        'footer_twitter': 'Twitter',
        'footer_linkedin': 'LinkedIn',
        'footer_instagram': 'Instagram',
        'footer_copyright': '© 2024 Logis. All rights reserved.',
        'modal_welcome_title': 'Welcome to Logis',
        'modal_login_tab': 'Login',
        'modal_register_tab': 'Register',
        'modal_email_placeholder': 'Email',
        'modal_password_placeholder': 'Password',
        'modal_login_btn': 'Login',
        'modal_no_account': 'Don\'t have an account?',
        'modal_register_here': 'Register here',
        'modal_full_name_placeholder': 'Full Name',
        'modal_email_placeholder_reg': 'Email',
        'modal_phone_placeholder': 'Phone Number',
        'modal_password_placeholder_reg': 'Password',
        'modal_confirm_password_placeholder': 'Confirm Password',
        'modal_register_btn': 'Register',
        'modal_already_account': 'Already have an account?',
        'modal_login_here': 'Login here',
        'demo_welcome_ahmed': 'Welcome, Ahmed!',
        'demo_what_service': 'What service do you need?',
        'demo_recent_bookings': 'Recent Bookings',
        'demo_gas_delivery_completed': 'Gas Delivery - Al Khuwair - Completed',
        'demo_water_tanker_inprogress': 'Water Tanker - Ruwi - In Progress',
        'demo_location': 'Location:',
        'demo_change_location': 'Change Location',
        'demo_available_providers': 'Available Providers',
        'demo_gas_oman_services': 'Oman Gas Services',
        'demo_fast_gas_delivery': 'Fast Gas Delivery',
        'demo_km_away': 'km away',
        'demo_book_now': 'Book Now',
        'demo_service_details': 'Service Details',
        'demo_cylinder_size': 'Cylinder Size:',
        'demo_price': 'Price:',
        'demo_delivery_time': 'Delivery Time:',
        'demo_payment': 'Payment:',
        'demo_cash': 'Cash, Card, Online',
        'demo_recent_reviews': 'Recent Reviews',
        'demo_ahmed_review': 'Fast delivery and professional service. Highly recommended!',
        'demo_fatima_review': 'Good service, arrived on time as promised.',
        'demo_confirm_booking': 'Confirm Booking',
        'demo_service_provider': 'Service Provider',
        'demo_delivery_details': 'Delivery Details',
        'demo_service': 'Service:',
        'demo_location_booking': 'Location:',
        'demo_date': 'Date:',
        'demo_time': 'Time:',
        'demo_asap': 'As soon as possible (30-45 minutes)',
        'demo_contact_info': 'Contact Information',
        'demo_your_name': 'Your Name',
        'demo_phone_number': 'Phone Number',
        'demo_special_instructions': 'Special Instructions (optional)',
        'demo_service_fee': 'Service Fee:',
        'demo_delivery_fee': 'Delivery Fee:',
        'demo_total': 'Total:',
        'demo_booking_confirmed': 'Booking Confirmed!',
        'demo_booking_success_message': 'Your gas delivery has been successfully booked.',
        'demo_booking_id': 'Booking ID:',
        'demo_provider': 'Provider:',
        'demo_eta': 'Estimated Arrival:',
        'demo_total_amount': 'Total Amount:',
        'demo_back_to_home': 'Back to Home',
        'demo_track_order': 'Track Order',
        'alert_login_success': 'Login successful! Welcome to Logis.',
        'alert_register_success': 'Registration successful! Welcome to Logis.',
        'alert_show_providers': 'Showing {count} providers for {serviceType} in your area.',
        'alert_contact_success': 'Thank you for your interest! We will contact you soon.'
    }
};

let currentLang = localStorage.getItem('lang') || 'ar'; // Default to Arabic

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.body.className = lang; // Add class to body for CSS adjustments

    // Update all elements with data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang][key]) {
            // Handle placeholders for input fields
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Update language switcher buttons active state
    document.querySelectorAll('.lang-button').forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Update dynamic content (demo section)
    if (document.getElementById('demo').style.display === 'block') {
        showDemoStep(demoStep);
    }

    localStorage.setItem('lang', lang);
}

// Navigation functionality
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLang); // Set initial language on load

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

    // Language switcher event listeners
    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', function() {
            setLanguage(this.getAttribute('data-lang'));
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
            <h3 style="color: var(--primary-color); text-align: center; margin-bottom: 20px;">${translations[currentLang]['logis_brand_ar_app']}</h3>
            <p style="text-align: center; color: var(--text-light); margin-bottom: 30px;">${translations[currentLang]['demo_welcome_ahmed']}</p>
        </div>
        <div class="demo-services">
            <h4 style="margin-bottom: 20px;">${translations[currentLang]['demo_what_service']}</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-gas-pump" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">${translations[currentLang]['service_gas_delivery']}</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-tint" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">${translations[currentLang]['service_water_tanker']}</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-toilet" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">${translations[currentLang]['service_sewage']}</span>
                </div>
                <div class="demo-service-card" onclick="showDemoStep('services')">
                    <i class="fas fa-truck" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">${translations[currentLang]['service_moving']}</span>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <h4 style="margin-bottom: 15px;">${translations[currentLang]['demo_recent_bookings']}</h4>
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${translations[currentLang]['service_gas_delivery']}</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">${translations[currentLang]['demo_gas_delivery_completed']}</p>
                    </div>
                    <span style="color: var(--success-color); font-size: 0.9rem;">✓</span>
                </div>
            </div>
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${translations[currentLang]['service_water_tanker']}</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">${translations[currentLang]['demo_water_tanker_inprogress']}</p>
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
            <button onclick="showDemoStep('home')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">${currentLang === 'ar' ? '←' : '→'}</button>
            <h3 style="color: var(--primary-color); margin: 0;">${translations[currentLang]['service_gas_delivery']}</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_location']}</strong> ${currentLang === 'ar' ? 'الخوير، مسقط' : 'Al Khuwair, Muscat'}</p>
                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: var(--text-light);">${translations[currentLang]['demo_change_location']}</p>
            </div>
            <h4 style="margin-bottom: 15px;">${translations[currentLang]['demo_available_providers']}</h4>
            <div class="provider-list">
                <div class="demo-provider-card" onclick="showDemoStep('providers')">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-left: ${currentLang === 'ar' ? '15px' : '0'}; margin-right: ${currentLang === 'ar' ? '0' : '15px'};">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div>
                            <strong>${translations[currentLang]['demo_gas_oman_services']}</strong>
                            <div style="display: flex; align-items: center; margin-top: 5px;">
                                <span style="color: var(--warning-color);">★★★★☆</span>
                                <span style="margin-right: ${currentLang === 'ar' ? '5px' : '0'}; font-size: 0.9rem; color: var(--text-light); margin-left: ${currentLang === 'ar' ? '0' : '5px'};">
                                    (4.2)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.9rem; color: var(--text-light);">2.5 ${translations[currentLang]['demo_km_away']}</span>
                        <span style="font-weight: bold; color: var(--primary-color);">8.5 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}</span>
                    </div>
                </div>
                <div class="demo-provider-card" onclick="showDemoStep('providers')">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="width: 40px; height: 40px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-left: ${currentLang === 'ar' ? '15px' : '0'}; margin-right: ${currentLang === 'ar' ? '0' : '15px'};">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div>
                            <strong>${translations[currentLang]['demo_fast_gas_delivery']}</strong>
                            <div style="display: flex; align-items: center; margin-top: 5px;">
                                <span style="color: var(--warning-color);">★★★★★</span>
                                <span style="margin-right: ${currentLang === 'ar' ? '5px' : '0'}; font-size: 0.9rem; color: var(--text-light); margin-left: ${currentLang === 'ar' ? '0' : '5px'};">
                                    (4.8)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.9rem; color: var(--text-light);">1.2 ${translations[currentLang]['demo_km_away']}</span>
                        <span style="font-weight: bold; color: var(--primary-color);">9.0 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}</span>
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
            <button onclick="showDemoStep('services')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">${currentLang === 'ar' ? '←' : '→'}</button>
            <h3 style="color: var(--primary-color); margin: 0;">${translations[currentLang]['demo_fast_gas_delivery']}</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 15px;">
                    <i class="fas fa-gas-pump" style="font-size: 2rem;"></i>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                    <span style="color: var(--warning-color); font-size: 1.2rem;">★★★★★</span>
                    <span style="margin-right: ${currentLang === 'ar' ? '10px' : '0'}; font-weight: bold; margin-left: ${currentLang === 'ar' ? '0' : '10px'};">4.8 (127 ${currentLang === 'ar' ? 'تقييم' : 'reviews'})</span>
                </div>
                <p style="color: var(--text-light); margin: 0;">1.2 ${translations[currentLang]['demo_km_away']} • ${currentLang === 'ar' ? 'متاح الآن' : 'Available Now'}</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">${translations[currentLang]['demo_service_details']}</h4>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_cylinder_size']}</strong> 12 ${currentLang === 'ar' ? 'كجم غاز بترول مسال' : 'kg LPG'}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_price']}</strong> 9.0 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_delivery_time']}</strong> 30-45 ${currentLang === 'ar' ? 'دقيقة' : 'minutes'}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_payment']}</strong> ${translations[currentLang]['demo_cash']}</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px;">${translations[currentLang]['demo_recent_reviews']}</h4>
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="font-size: 0.9rem;">${currentLang === 'ar' ? 'أحمد الرشيد' : 'Ahmed Al-Rashid'}</strong>
                        <span style="color: var(--warning-color);">★★★★★</span>
                    </div>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--text-light);">"${translations[currentLang]['demo_ahmed_review']}"</p>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="font-size: 0.9rem;">${currentLang === 'ar' ? 'فاطمة الزهراء' : 'Fatima Al-Zahra'}</strong>
                        <span style="color: var(--warning-color);">★★★★☆</span>
                    </div>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--text-light);">"${translations[currentLang]['demo_fatima_review']}"</p>
                </div>
            </div>
            
            <button onclick="showDemoStep('booking')" style="width: 100%; padding: 15px; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                ${translations[currentLang]['demo_book_now']} - 9.0 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}
            </button>
        </div>
    `;
}

function getDemoBookingContent() {
    return `
        <div class="demo-header">
            <button onclick="showDemoStep('providers')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">${currentLang === 'ar' ? '←' : '→'}</button>
            <h3 style="color: var(--primary-color); margin: 0;">${translations[currentLang]['demo_confirm_booking']}</h3>
            <div></div>
        </div>
        <div style="margin-top: 20px;">
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">${translations[currentLang]['demo_service_provider']}</h4>
                <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-left: ${currentLang === 'ar' ? '15px' : '0'}; margin-right: ${currentLang === 'ar' ? '0' : '15px'};">
                        <i class="fas fa-gas-pump"></i>
                    </div>
                    <div>
                        <strong>${translations[currentLang]['demo_fast_gas_delivery']}</strong>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">★★★★★ (4.8)</p>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">${translations[currentLang]['demo_delivery_details']}</h4>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_service']}</strong> ${translations[currentLang]['service_gas_delivery']} (12 ${currentLang === 'ar' ? 'كجم غاز بترول مسال' : 'kg LPG'})</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_location_booking']}</strong> ${currentLang === 'ar' ? 'الخوير، مسقط' : 'Al Khuwair, Muscat'}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_date']}</strong> ${currentLang === 'ar' ? 'اليوم' : 'Today'}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_time']}</strong> ${translations[currentLang]['demo_asap']}</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">${translations[currentLang]['demo_contact_info']}</h4>
                <input type="text" placeholder="${translations[currentLang]['demo_your_name']}" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; margin-bottom: 10px;">
                <input type="tel" placeholder="${translations[currentLang]['demo_phone_number']}" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; margin-bottom: 10px;">
                <textarea placeholder="${translations[currentLang]['demo_special_instructions']}" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; height: 60px; resize: none;"></textarea>
            </div>
            
            <div style="background: white; border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>${translations[currentLang]['demo_service_fee']}</span>
                    <span>9.0 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>${translations[currentLang]['demo_delivery_fee']}</span>
                    <span>1.0 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}</span>
                </div>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                    <span>${translations[currentLang]['demo_total']}</span>
                    <span style="color: var(--primary-color);">10.0 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}</span>
                </div>
            </div>
            
            <button onclick="confirmBooking()" style="width: 100%; padding: 15px; background: var(--success-color); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                ${translations[currentLang]['demo_confirm_booking']}
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
            <h3 style="color: var(--success-color); margin-bottom: 15px;">${translations[currentLang]['demo_booking_confirmed']}</h3>
            <p style="margin-bottom: 20px; color: var(--text-light);">${translations[currentLang]['demo_booking_success_message']}</p>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: ${currentLang === 'ar' ? 'right' : 'left'};">
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_booking_id']}</strong> #LGS-2024-001</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_provider']}</strong> ${translations[currentLang]['demo_fast_gas_delivery']}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_eta']}</strong> 30-45 ${currentLang === 'ar' ? 'دقيقة' : 'minutes'}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>${translations[currentLang]['demo_total_amount']}</strong> 10.0 ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}</p>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button onclick="showDemoStep('home')" style="flex: 1; padding: 12px; background: var(--bg-light); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">
                    ${translations[currentLang]['demo_back_to_home']}
                </button>
                <button style="flex: 1; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 6px; cursor: pointer;">
                    ${translations[currentLang]['demo_track_order']}
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
        name: translations[currentLang]['demo_welcome_ahmed'].replace('مرحباً بك، ', '').replace('Welcome, ', ''),
        email: 'ahmed@example.com',
        phone: '+968 9XXX XXXX'
    };
    
    alert(translations[currentLang]['alert_login_success']);
    hideLoginModal();
    
    // Update UI to show logged in state
    updateUIForLoggedInUser();
}

function register() {
    // Simulate registration
    currentUser = {
        name: translations[currentLang]['modal_full_name_placeholder'],
        email: 'newuser@example.com',
        phone: '+968 9XXX XXXX'
    };
    
    alert(translations[currentLang]['alert_register_success']);
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
    
    // For demo purposes, we'll show an alert
    let serviceName = '';
    switch(serviceType) {
        case 'gas': serviceName = translations[currentLang]['service_gas_delivery']; break;
        case 'water': serviceName = translations[currentLang]['service_water_tanker']; break;
        case 'sewage': serviceName = translations[currentLang]['service_sewage']; break;
        case 'moving': serviceName = translations[currentLang]['service_moving']; break;
    }
    alert(translations[currentLang]['alert_show_providers'].replace('{count}', providers.length).replace('{serviceType}', serviceName));
}

function getProvidersForService(serviceType) {
    const allProviders = {
        gas: [
            { name: translations[currentLang]['demo_gas_oman_services'], rating: 4.2, distance: 2.5, price: 8.5 },
            { name: translations[currentLang]['demo_fast_gas_delivery'], rating: 4.8, distance: 1.2, price: 9.0 },
            { name: (currentLang === 'ar' ? 'غاز الخليج' : 'Gulf Gas'), rating: 4.0, distance: 3.1, price: 8.0 }
        ],
        water: [
            { name: (currentLang === 'ar' ? 'صهاريج مياه نقية' : 'Pure Water Tankers'), rating: 4.5, distance: 1.8, price: 15.0 },
            { name: (currentLang === 'ar' ? 'تزويد مياه مسقط' : 'Muscat Water Supply'), rating: 4.3, distance: 2.2, price: 14.5 },
            { name: (currentLang === 'ar' ? 'خدمات مياه عذبة' : 'Fresh Water Services'), rating: 4.7, distance: 0.9, price: 16.0 }
        ],
        sewage: [
            { name: (currentLang === 'ar' ? 'خدمات صرف صحي نظيفة' : 'Clean Sewage Services'), rating: 4.4, distance: 2.0, price: 25.0 },
            { name: (currentLang === 'ar' ? 'إدارة النفايات في عُمان' : 'Oman Waste Management'), rating: 4.1, distance: 3.5, price: 22.0 },
            { name: (currentLang === 'ar' ? 'شركة الصرف الصحي الاحترافية' : 'Professional Sewage Company'), rating: 4.6, distance: 1.5, price: 28.0 }
        ],
        moving: [
            { name: (currentLang === 'ar' ? 'نقل موثوق' : 'Reliable Movers'), rating: 4.3, distance: 2.8, price: 45.0 },
            { name: (currentLang === 'ar' ? 'خدمات نقل سريعة' : 'Fast Moving Services'), rating: 4.7, distance: 1.6, price: 50.0 },
            { name: (currentLang === 'ar' ? 'نقل محترف في عُمان' : 'Professional Movers Oman'), rating: 4.2, distance: 3.2, price: 42.0 }
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
    alert(translations[currentLang]['alert_contact_success']);
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
    return `${amount.toFixed(1)} ${currentLang === 'ar' ? 'ر.ع' : 'OMR'}`;
}

function formatDistance(distance) {
    return `${distance} ${translations[currentLang]['demo_km_away']}`;
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
    submitContact,
    setLanguage
};

