# Logis MVP UI Design Specifications

## Brand Identity

### Colors
- **Primary**: #0891b2 (Teal Blue)
- **Secondary**: #f97316 (Orange)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #333333 (Dark Gray)
- **Success**: #10b981 (Green)
- **Error**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)

### Typography
- **Primary Font**: SF Pro (iOS), Roboto (Android)
- **Headings**: Bold, 24sp/20sp/18sp (H1/H2/H3)
- **Body Text**: Regular, 16sp
- **Button Text**: Medium, 16sp
- **Caption**: Regular, 14sp

### Iconography
- **Style**: Outlined with 2px stroke
- **Size**: 24dp x 24dp (standard)
- **Corner Radius**: 4dp

## Screen Designs

### 1. Onboarding & Authentication

#### Splash Screen
- Logo centered
- App name below logo
- Loading indicator
- Background gradient (Primary to white)

#### Welcome Screen
- App introduction
- Value proposition
- "Get Started" button
- "Login" text button

#### Registration Screen
- Name input
- Email input
- Phone input
- Password input
- Confirm password input
- Terms & conditions checkbox
- "Register" button
- "Already have an account? Login" text button

#### Login Screen
- Email/Phone input
- Password input
- "Forgot Password?" text button
- "Login" button
- "Don't have an account? Register" text button

### 2. Home & Service Selection

#### Home Screen
- User greeting
- Search bar
- Service category cards (4 categories)
  - Gas Delivery
  - Water Trucks
  - Sewage Services
  - Furniture Movers
- Recent bookings section
- Bottom navigation (Home, Bookings, Profile)

#### Service Category Screen
- Category title
- Filter options (Rating, Price, Distance)
- Service provider list
  - Provider image
  - Provider name
  - Rating (stars)
  - Distance
  - Base price
  - "Book Now" button

### 3. Service Provider Details

#### Provider Details Screen
- Provider image gallery
- Provider name
- Rating and review count
- Service description
- Pricing details
- Coverage area
- Reviews section
- "Book Service" button

### 4. Booking Flow

#### Location Selection Screen
- Map view
- Current location marker
- Address input field
- Confirm location button

#### Booking Confirmation Screen
- Service provider details
- Service type
- Location details
- Pricing estimate
- Notes input field
- "Confirm Booking" button

#### Booking Success Screen
- Success animation
- Booking reference number
- Provider ETA (if available)
- "View Booking" button
- "Back to Home" button

### 5. Bookings Management

#### Bookings List Screen
- Tabs: Active, Completed, Cancelled
- Booking cards
  - Service type icon
  - Provider name
  - Status indicator
  - Date/time
  - Amount

#### Booking Details Screen
- Booking reference number
- Service provider details
- Service type
- Status with timeline
- Location details
- Date and time
- Amount
- Action buttons based on status
  - "Cancel Booking" (if pending)
  - "Contact Provider" (if accepted/in progress)
  - "Leave Review" (if completed)

### 6. User Profile

#### Profile Screen
- Profile picture
- User name
- Email and phone
- Edit profile button
- Settings section
  - Notifications
  - Payment methods
  - Addresses
  - Help & Support
  - About
  - Logout

## Component Library

### Buttons
- **Primary Button**: Filled, rounded corners, Primary color
- **Secondary Button**: Outlined, rounded corners, Primary color border
- **Text Button**: No background, Primary color text
- **Icon Button**: Circular, light background, icon in Primary color

### Input Fields
- **Text Input**: Outlined, rounded corners, label animation
- **Search Input**: Pill-shaped, with search icon
- **Dropdown**: Outlined, with chevron icon
- **Checkbox**: Square with rounded corners, Primary color when checked

### Cards
- **Service Card**: Rounded corners, image, title, subtitle, action button
- **Provider Card**: Rounded corners, image, details, rating, action button
- **Booking Card**: Rounded corners, status indicator, details, action button

### Navigation
- **Bottom Navigation**: 3 items (Home, Bookings, Profile)
- **Tab Bar**: Underline indicator, Primary color
- **Back Button**: Left-aligned, icon + optional text

### Feedback
- **Toast**: Brief message at bottom of screen
- **Dialog**: Centered modal with title, message, actions
- **Loading Indicator**: Circular, Primary color
- **Rating Stars**: Filled/unfilled, Secondary color

## Responsive Design Guidelines

- Design for multiple screen sizes (small, medium, large phones)
- Use constraints-based layout
- Ensure touch targets are at least 48dp x 48dp
- Maintain 8dp grid system for spacing
- Use scalable text (sp units)
- Support both portrait and landscape orientations

## Accessibility Guidelines

- Maintain color contrast ratio of at least 4.5:1
- Include content descriptions for all images
- Support screen readers
- Provide haptic feedback for important actions
- Allow text scaling up to 200%

This UI design specification provides a comprehensive guide for implementing the Logis MVP mobile application interface.
