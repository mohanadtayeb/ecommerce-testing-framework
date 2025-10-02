# Test Cases Specification - E-commerce Testing Framework

## 📋 Overview

This document contains detailed test case specifications for the SauceDemo e-commerce application. Each test case is designed to validate specific functionality and is directly mapped to automated test implementations in the framework.

**Total Test Cases**: 31 automated test cases  
**Coverage Areas**: Authentication, Products, Cart, Checkout, Navigation, Performance  
**Test Design**: Based on risk analysis and user journey mapping  
**Implementation**: Selenium WebDriver + Jest automation framework

---

## 📖 Test Case Template

```markdown
### TC[ID]: [Test Case Name]
**Module**: [Module Name]
**Priority**: [High/Medium/Low]
**Type**: [Functional/Negative/Performance/UI]
**User Type**: [standard_user/problem_user/etc.]
**Automation**: ✅ Automated / ❌ Manual

**Preconditions**: 
- [Required state before test execution]

**Test Steps**:
1. [Step 1 with expected behavior]
2. [Step 2 with expected behavior]
3. [Additional steps...]

**Expected Result**: 
- [Detailed expected outcome]

**Implementation File**: `src/tests/[filename].test.js`
```

---

## 🔐 Authentication Module Tests

### TC001: Standard User Login Success
**Module**: Authentication  
**Priority**: High  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- Browser is open and navigated to https://www.saucedemo.com/
- User is on login page

**Test Steps**:
1. Enter username: `standard_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
4. Verify redirection to products page

**Expected Result**: 
- User successfully logs in
- Redirected to inventory page (https://www.saucedemo.com/inventory.html)
- Products are visible and loading correctly

**Implementation File**: `src/tests/login.test.js`

---

### TC002: Problem User Login with Visual Issues
**Module**: Authentication  
**Priority**: High  
**Type**: Functional  
**User Type**: problem_user  
**Automation**: ✅ Automated

**Preconditions**: 
- Browser is open and navigated to login page

**Test Steps**:
1. Enter username: `problem_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
4. Verify login success despite known visual issues

**Expected Result**: 
- Login succeeds
- User reaches products page
- Framework handles known UI anomalies gracefully

**Implementation File**: `src/tests/login.test.js`

---

### TC003: Performance Glitch User Login
**Module**: Authentication  
**Priority**: Medium  
**Type**: Performance  
**User Type**: performance_glitch_user  
**Automation**: ✅ Automated

**Preconditions**: 
- Browser is open and navigated to login page

**Test Steps**:
1. Enter username: `performance_glitch_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
4. Measure and log login time
5. Verify eventual successful login

**Expected Result**: 
- Login eventually succeeds (slower than normal)
- Performance delay is logged and measured
- System handles slow user scenarios gracefully

**Implementation File**: `src/tests/login.test.js`

---

### TC004: Error User Login
**Module**: Authentication  
**Priority**: High  
**Type**: Functional  
**User Type**: error_user  
**Automation**: ✅ Automated

**Preconditions**: 
- Browser is open and navigated to login page

**Test Steps**:
1. Enter username: `error_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
4. Verify successful login

**Expected Result**: 
- Login succeeds
- User can access the application
- Framework handles error-prone user scenarios

**Implementation File**: `src/tests/login.test.js`

---

### TC005: Visual User Login
**Module**: Authentication  
**Priority**: Medium  
**Type**: UI  
**User Type**: visual_user  
**Automation**: ✅ Automated

**Preconditions**: 
- Browser is open and navigated to login page

**Test Steps**:
1. Enter username: `visual_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
4. Verify login and UI rendering

**Expected Result**: 
- Login succeeds
- Visual elements render correctly
- No UI blocking issues

**Implementation File**: `src/tests/login.test.js`

---

### TC006: Invalid Username Login Attempt
**Module**: Authentication  
**Priority**: High  
**Type**: Negative  
**User Type**: N/A  
**Automation**: ✅ Automated

**Preconditions**: 
- Browser is open and navigated to login page

**Test Steps**:
1. Enter username: `invalid_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
4. Verify error message display

**Expected Result**: 
- Login fails appropriately
- Error message is displayed
- User remains on login page

**Implementation File**: `src/tests/login.test.js`

---

### TC007: Invalid Password Login Attempt
**Module**: Authentication  
**Priority**: High  
**Type**: Negative  
**User Type**: N/A  
**Automation**: ✅ Automated

**Preconditions**: 
- Browser is open and navigated to login page

**Test Steps**:
1. Enter username: `standard_user`
2. Enter password: `wrong_password`
3. Click "Login" button
4. Verify error message display

**Expected Result**: 
- Login fails appropriately
- Error message is displayed
- User remains on login page

**Implementation File**: `src/tests/login.test.js`

---

### TC008: Successful Logout
**Module**: Authentication  
**Priority**: Medium  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in and on products page

**Test Steps**:
1. Click hamburger menu button
2. Click "Logout" option
3. Verify redirection to login page

**Expected Result**: 
- User successfully logs out
- Redirected to login page
- Session is terminated

**Implementation File**: `src/tests/login.test.js`

---

## 🛍️ Products Module Tests

### TC009: Product List Display
**Module**: Products  
**Priority**: High  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in as standard_user
- On products/inventory page

**Test Steps**:
1. Verify products page loads
2. Count number of products displayed
3. Verify product information is visible

**Expected Result**: 
- Products page loads successfully
- Multiple products (6+) are displayed
- Product names, prices, and images are visible

**Implementation File**: `src/tests/products.test.js`

---

### TC010: Product Sorting Functionality
**Module**: Products  
**Priority**: Medium  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in and on products page

**Test Steps**:
1. Click on sort dropdown
2. Select "Price (low to high)"
3. Verify products are sorted correctly
4. Test other sorting options

**Expected Result**: 
- Sort dropdown is functional
- Products reorder based on selected criteria
- Sorting works for all available options

**Implementation File**: `src/tests/products.test.js`

---

### TC011: Product Details Navigation
**Module**: Products  
**Priority**: Medium  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in and on products page

**Test Steps**:
1. Click on a product name or image
2. Verify navigation to product details page
3. Verify product information is displayed
4. Navigate back to products page

**Expected Result**: 
- Navigation to product details works
- Product details page displays correctly
- Back navigation functions properly

**Implementation File**: `src/tests/products.test.js`

---

### TC012-TC014: Additional Product Tests
**Note**: Tests for product filtering, search functionality, and product comparison features.
**Implementation File**: `src/tests/products.test.js`

---

## 🛒 Shopping Cart Module Tests

### TC015: Add Product to Cart
**Module**: Cart  
**Priority**: High  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in and on products page

**Test Steps**:
1. Click "Add to cart" button for first product
2. Verify cart badge updates
3. Verify cart badge count increases

**Expected Result**: 
- Product is added to cart successfully
- Cart badge appears with count "1"
- Add to cart button changes to "Remove"

**Implementation File**: `src/tests/cart.test.js`

---

### TC016: Remove Product from Cart
**Module**: Cart  
**Priority**: High  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in
- At least one product is in cart

**Test Steps**:
1. Add product to cart
2. Navigate to cart page or use remove button
3. Remove product from cart
4. Verify cart updates correctly

**Expected Result**: 
- Product is removed from cart
- Cart badge decreases or disappears
- Cart page reflects changes

**Implementation File**: `src/tests/cart.test.js`

---

## 💳 Checkout Module Tests

### TC017: Checkout with Valid Information
**Module**: Checkout  
**Priority**: High  
**Type**: Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in
- Products are in cart

**Test Steps**:
1. Navigate to checkout page
2. Verify checkout page loads
3. Verify form elements are present

**Expected Result**: 
- Checkout page loads successfully
- User can access checkout process
- No blocking errors occur

**Implementation File**: `src/tests/checkout.test.js`

---

### TC018: Checkout with Invalid Credentials
**Module**: Checkout  
**Priority**: Medium  
**Type**: Negative  
**User Type**: invalid_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User attempts login with invalid credentials

**Test Steps**:
1. Attempt login with invalid credentials
2. Verify login fails appropriately
3. Verify user cannot access checkout

**Expected Result**: 
- Login fails as expected
- User remains on login page
- Checkout process is not accessible

**Implementation File**: `src/tests/checkout.test.js`

---

### TC019: Checkout with Empty Cart
**Module**: Checkout  
**Priority**: Medium  
**Type**: Negative  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in
- Cart is empty

**Test Steps**:
1. Navigate to cart page
2. Attempt to proceed to checkout
3. Verify appropriate handling

**Expected Result**: 
- System handles empty cart gracefully
- Checkout button is disabled or shows error
- User cannot proceed with empty cart

**Implementation File**: `src/tests/checkout.test.js`

---

### TC020: Checkout with Missing Information
**Module**: Checkout  
**Priority**: Medium  
**Type**: Negative  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in
- Products are in cart
- On checkout form page

**Test Steps**:
1. Navigate to checkout form
2. Leave required fields empty
3. Attempt to continue
4. Verify validation messages

**Expected Result**: 
- Form validation prevents submission
- User remains on checkout form
- Appropriate error messages displayed

**Implementation File**: `src/tests/checkout.test.js`

---

## 🧭 Navigation Module Tests

### TC021-TC026: Navigation and UI Tests
**Module**: Navigation  
**Priority**: Medium  
**Type**: UI/Functional  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Coverage**:
- Menu navigation functionality
- Page transitions and routing
- Hamburger menu operations
- Footer link validation
- Header element verification
- Application state reset

**Implementation File**: `src/tests/navigation.test.js`

---

## ⚡ Performance Module Tests

### TC027: Standard User Performance
**Module**: Performance  
**Priority**: Medium  
**Type**: Performance  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- Clean browser session

**Test Steps**:
1. Navigate to login page
2. Measure login time
3. Log performance metrics
4. Verify acceptable performance

**Expected Result**: 
- Login completes within reasonable time
- Performance metrics are logged
- No significant performance degradation

**Implementation File**: `src/tests/performance.test.js`

---

### TC028: Performance Glitch User Delay
**Module**: Performance  
**Priority**: Medium  
**Type**: Performance  
**User Type**: performance_glitch_user  
**Automation**: ✅ Automated

**Preconditions**: 
- Clean browser session

**Test Steps**:
1. Navigate to login page
2. Login with performance_glitch_user
3. Measure extended load times
4. Verify eventual success

**Expected Result**: 
- Login eventually succeeds despite delays
- Performance delay is measured and logged
- System handles slow scenarios gracefully

**Implementation File**: `src/tests/performance.test.js`

---

### TC029: Image Loading Performance
**Module**: Performance  
**Priority**: Low  
**Type**: Performance  
**User Type**: standard_user  
**Automation**: ✅ Automated

**Preconditions**: 
- User is logged in

**Test Steps**:
1. Navigate to products page
2. Verify page elements load
3. Check basic page functionality

**Expected Result**: 
- Page loads successfully
- Basic elements are accessible
- No critical loading failures

**Implementation File**: `src/tests/performance.test.js`

---

## 📊 Test Case Summary

### Test Distribution by Module
| Module | Test Cases | Priority High | Priority Medium | Priority Low |
|--------|------------|---------------|-----------------|--------------|
| **Authentication** | 8 | 5 | 2 | 1 |
| **Products** | 6 | 2 | 3 | 1 |
| **Cart** | 2 | 2 | 0 | 0 |
| **Checkout** | 4 | 1 | 3 | 0 |
| **Navigation** | 6 | 0 | 6 | 0 |
| **Performance** | 3 | 0 | 2 | 1 |
| **Total** | **31** | **10** | **16** | **3** |

### Test Types Distribution
- **Functional Tests**: 22 (71%)
- **Negative Tests**: 5 (16%)
- **Performance Tests**: 3 (10%)
- **UI Tests**: 1 (3%)

### Automation Coverage
- **Automated Tests**: 31 (100%)
- **Manual Tests**: 0 (0%)

---

## 🔗 Traceability Matrix

| Requirement Area | Test Cases | Implementation |
|------------------|------------|----------------|
| **User Login/Logout** | TC001-TC008 | `login.test.js` |
| **Product Browsing** | TC009-TC014 | `products.test.js` |
| **Cart Operations** | TC015-TC016 | `cart.test.js` |
| **Checkout Process** | TC017-TC020 | `checkout.test.js` |
| **Navigation & UI** | TC021-TC026 | `navigation.test.js` |
| **Performance** | TC027-TC029 | `performance.test.js` |

---

*This test case specification demonstrates comprehensive test coverage and professional test design for e-commerce applications, showcasing systematic testing approach and detailed documentation skills.*
**Preconditions:** User is on login page  
**Steps:**
1. Leave username field empty
2. Enter password: `secret_sauce`
3. Click "Login" button
**Expected Result:** Error message displayed: "Epic sadface: Username is required"  
**Priority:** High  
**Type:** Negative

### TC005: Login with Empty Password
**Preconditions:** User is on login page  
**Steps:**
1. Enter username: `standard_user`
2. Leave password field empty
3. Click "Login" button
**Expected Result:** Error message displayed: "Epic sadface: Password is required"  
**Priority:** High  
**Type:** Negative

### TC006: Login with Both Fields Empty
**Preconditions:** User is on login page  
**Steps:**
1. Leave both username and password fields empty
2. Click "Login" button
**Expected Result:** Error message displayed: "Epic sadface: Username is required"  
**Priority:** Medium  
**Type:** Negative

### TC007: Login with Locked Out User
**Preconditions:** User is on login page  
**Steps:**
1. Enter username: `locked_out_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
**Expected Result:** Error message displayed: "Epic sadface: Sorry, this user has been locked out."  
**Priority:** High  
**Type:** Negative

### TC008: Login with Problem User
**Preconditions:** User is on login page  
**Steps:**
1. Enter username: `problem_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
**Expected Result:** User is redirected to products page (note: images may not display correctly - known issue)  
**Priority:** Medium  
**Type:** Functional

### TC009: Login with Performance Glitch User
**Preconditions:** User is on login page  
**Steps:**
1. Enter username: `performance_glitch_user`
2. Enter password: `secret_sauce`
3. Click "Login" button
**Expected Result:** User is redirected to products page with noticeable delay (performance issue simulation)  
**Priority:** Medium  
**Type:** Performance

### TC010: Error Close Button Functionality
**Preconditions:** User is on login page with error message displayed  
**Steps:**
1. Enter invalid credentials to trigger error
2. Click the "X" button on error message
**Expected Result:** Error message is dismissed and removed from view  
**Priority:** Low  
**Type:** UI

---

## 2. Product Browsing & Filtering Module

### TC011: View All Products After Login
**Preconditions:** Logged in as `standard_user`  
**Steps:**
1. Observe products page
**Expected Result:** All 6 products are displayed with images, names, descriptions, and prices  
**Priority:** High  
**Type:** Functional

### TC012: Sort Products by Name (A to Z)
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click sort dropdown
2. Select "Name (A to Z)"
**Expected Result:** Products sorted alphabetically: Sauce Labs Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt (Red)  
**Priority:** Medium  
**Type:** Functional

### TC013: Sort Products by Name (Z to A)
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click sort dropdown
2. Select "Name (Z to A)"
**Expected Result:** Products sorted reverse alphabetically  
**Priority:** Medium  
**Type:** Functional

### TC014: Sort Products by Price (Low to High)
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click sort dropdown
2. Select "Price (low to high)"
**Expected Result:** Products sorted with cheapest first: Sauce Labs Onesie ($7.99), then increasing prices  
**Priority:** High  
**Type:** Functional

### TC015: Sort Products by Price (High to Low)
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click sort dropdown
2. Select "Price (high to low)"
**Expected Result:** Products sorted with most expensive first: Sauce Labs Fleece Jacket ($49.99), then decreasing prices  
**Priority:** High  
**Type:** Functional

### TC016: Product Image Display
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Verify each product has an image
**Expected Result:** All 6 products display proper images  
**Priority:** Medium  
**Type:** UI

### TC017: Product Price Display Format
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Check price format for all products
**Expected Result:** All prices displayed in format $XX.XX  
**Priority:** Low  
**Type:** UI

### TC018: Product Description Display
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Verify each product has a description
**Expected Result:** All products show descriptive text below product name  
**Priority:** Low  
**Type:** UI

### TC019: Click Product Image to View Details
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click on any product image
**Expected Result:** Navigate to product detail page with full description and larger image  
**Priority:** Medium  
**Type:** Functional

### TC020: Click Product Name to View Details
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click on any product name/title
**Expected Result:** Navigate to product detail page with full description  
**Priority:** Medium  
**Type:** Functional

---

## 3. Shopping Cart Operations Module

### TC021: Add Single Item to Cart
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click "Add to cart" button on Sauce Labs Backpack
**Expected Result:** Button changes to "Remove", cart badge shows "1"  
**Priority:** High  
**Type:** Functional

### TC022: Add Multiple Different Items to Cart
**Preconditions:** Logged in as `standard_user`, on products page  
**Steps:**
1. Click "Add to cart" on Sauce Labs Backpack
2. Click "Add to cart" on Sauce Labs Bike Light
3. Click "Add to cart" on Sauce Labs Bolt T-Shirt
**Expected Result:** Cart badge shows "3", all three items' buttons show "Remove"  
**Priority:** High  
**Type:** Functional

### TC023: Remove Item from Cart via Products Page
**Preconditions:** Item already added to cart  
**Steps:**
1. Click "Remove" button on previously added item
**Expected Result:** Button changes back to "Add to cart", cart badge decrements by 1  
**Priority:** High  
**Type:** Functional

### TC024: Cart Badge Updates Correctly
**Preconditions:** Logged in as `standard_user`, cart is empty  
**Steps:**
1. Add item, verify badge shows 1
2. Add another item, verify badge shows 2
3. Remove one item, verify badge shows 1
**Expected Result:** Cart badge accurately reflects number of items at each step  
**Priority:** High  
**Type:** Functional

### TC025: Navigate to Cart Page
**Preconditions:** Logged in as `standard_user`, at least one item in cart  
**Steps:**
1. Click shopping cart icon in top right
**Expected Result:** Navigate to cart page (cart.html), items are listed  
**Priority:** High  
**Type:** Functional

### TC026: View Cart Contents
**Preconditions:** Items added to cart, on cart page  
**Steps:**
1. Verify cart displays all added items with quantities, names, descriptions, and prices
**Expected Result:** All items shown correctly with complete information  
**Priority:** High  
**Type:** Functional

### TC027: Remove Item from Cart Page
**Preconditions:** Items in cart, on cart page  
**Steps:**
1. Click "Remove" button next to an item
**Expected Result:** Item is removed from cart, total updates, cart badge decrements  
**Priority:** High  
**Type:** Functional

### TC028: Continue Shopping from Cart
**Preconditions:** On cart page  
**Steps:**
1. Click "Continue Shopping" button
**Expected Result:** Navigate back to products page (inventory.html)  
**Priority:** Medium  
**Type:** Functional

### TC029: Cart Persistence Across Pages
**Preconditions:** Items added to cart  
**Steps:**
1. Navigate to different pages (product details, back to inventory)
2. Check cart badge on each page
**Expected Result:** Cart badge shows same count across all pages  
**Priority:** High  
**Type:** Functional

### TC030: Empty Cart Display
**Preconditions:** Logged in as `standard_user`, no items in cart  
**Steps:**
1. Navigate to cart page
**Expected Result:** Cart page shows no items, displays empty state  
**Priority:** Low  
**Type:** UI

---

## 4. Checkout Process Module

### TC031: Initiate Checkout from Cart
**Preconditions:** At least one item in cart, on cart page  
**Steps:**
1. Click "Checkout" button
**Expected Result:** Navigate to checkout information page (checkout-step-one.html)  
**Priority:** High  
**Type:** Functional

### TC032: Complete Checkout with Valid Information
**Preconditions:** On checkout information page  
**Steps:**
1. Enter First Name: `John`
2. Enter Last Name: `Doe`
3. Enter Zip/Postal Code: `12345`
4. Click "Continue" button
**Expected Result:** Navigate to checkout overview page (checkout-step-two.html)  
**Priority:** High  
**Type:** Functional

### TC033: Checkout with Empty First Name
**Preconditions:** On checkout information page  
**Steps:**
1. Leave First Name empty
2. Enter Last Name: `Doe`
3. Enter Zip/Postal Code: `12345`
4. Click "Continue" button
**Expected Result:** Error message: "Error: First Name is required"  
**Priority:** High  
**Type:** Negative

### TC034: Checkout with Empty Last Name
**Preconditions:** On checkout information page  
**Steps:**
1. Enter First Name: `John`
2. Leave Last Name empty
3. Enter Zip/Postal Code: `12345`
4. Click "Continue" button
**Expected Result:** Error message: "Error: Last Name is required"  
**Priority:** High  
**Type:** Negative

### TC035: Checkout with Empty Postal Code
**Preconditions:** On checkout information page  
**Steps:**
1. Enter First Name: `John`
2. Enter Last Name: `Doe`
3. Leave Zip/Postal Code empty
4. Click "Continue" button
**Expected Result:** Error message: "Error: Postal Code is required"  
**Priority:** High  
**Type:** Negative

### TC036: Cancel from Checkout Information Page
**Preconditions:** On checkout information page  
**Steps:**
1. Click "Cancel" button
**Expected Result:** Navigate back to cart page  
**Priority:** Medium  
**Type:** Functional

### TC037: Verify Order Summary on Overview Page
**Preconditions:** Completed checkout step one, on overview page  
**Steps:**
1. Verify all items are listed with quantities and prices
2. Verify payment information section
3. Verify shipping information section
**Expected Result:** All information displayed correctly, item total calculated properly  
**Priority:** High  
**Type:** Functional

### TC038: Verify Price Calculations on Overview
**Preconditions:** On checkout overview page with items  
**Steps:**
1. Check Item Total
2. Check Tax amount
3. Check Total (Item Total + Tax)
**Expected Result:** All calculations are mathematically correct  
**Priority:** High  
**Type:** Functional

### TC039: Cancel from Checkout Overview Page
**Preconditions:** On checkout overview page  
**Steps:**
1. Click "Cancel" button
**Expected Result:** Navigate back to products page (inventory.html)  
**Priority:** Medium  
**Type:** Functional

### TC040: Complete Order from Overview Page
**Preconditions:** On checkout overview page  
**Steps:**
1. Click "Finish" button
**Expected Result:** Navigate to checkout complete page (checkout-complete.html), success message displayed  
**Priority:** High  
**Type:** Functional

### TC041: Verify Order Confirmation Page
**Preconditions:** Just completed an order  
**Steps:**
1. Check for success message: "Thank you for your order!"
2. Check for confirmation image (Pony Express)
3. Check for order dispatch message
**Expected Result:** All confirmation elements are present and correct  
**Priority:** High  
**Type:** Functional

### TC042: Back Home from Confirmation Page
**Preconditions:** On checkout complete page  
**Steps:**
1. Click "Back Home" button
**Expected Result:** Navigate to products page, cart is now empty (badge shows no count)  
**Priority:** High  
**Type:** Functional

---

## 5. Navigation & UI Module

### TC043: Hamburger Menu Functionality
**Preconditions:** Logged in as `standard_user`  
**Steps:**
1. Click hamburger menu icon (three lines) in top left
**Expected Result:** Sidebar menu opens showing navigation options  
**Priority:** Medium  
**Type:** UI

### TC044: All Items Menu Option
**Preconditions:** Hamburger menu is open  
**Steps:**
1. Click "All Items" option
**Expected Result:** Navigate to products page (inventory.html)  
**Priority:** Medium  
**Type:** Functional

### TC045: About Menu Option
**Preconditions:** Hamburger menu is open  
**Steps:**
1. Click "About" option
**Expected Result:** Navigate to Sauce Labs website (external link)  
**Priority:** Low  
**Type:** Functional

### TC046: Logout Functionality
**Preconditions:** Logged in as any user, hamburger menu open  
**Steps:**
1. Click "Logout" option
**Expected Result:** User is logged out and redirected to login page, cannot access inventory without logging in again  
**Priority:** High  
**Type:** Functional

### TC047: Reset App State
**Preconditions:** Items in cart, hamburger menu open  
**Steps:**
1. Click "Reset App State" option
**Expected Result:** Cart is cleared, app returns to initial state  
**Priority:** Medium  
**Type:** Functional

### TC048: Close Hamburger Menu
**Preconditions:** Hamburger menu is open  
**Steps:**
1. Click "X" close button on menu
**Expected Result:** Sidebar menu closes  
**Priority:** Low  
**Type:** UI

### TC049: Footer Links - Twitter
**Preconditions:** Logged in, on any page  
**Steps:**
1. Scroll to footer
2. Click Twitter icon
**Expected Result:** Opens Sauce Labs Twitter in new tab  
**Priority:** Low  
**Type:** Functional

### TC050: Footer Links - Facebook
**Preconditions:** Logged in, on any page  
**Steps:**
1. Scroll to footer
2. Click Facebook icon
**Expected Result:** Opens Sauce Labs Facebook in new tab  
**Priority:** Low  
**Type:** Functional

### TC051: Footer Links - LinkedIn
**Preconditions:** Logged in, on any page  
**Steps:**
1. Scroll to footer
2. Click LinkedIn icon
**Expected Result:** Opens Sauce Labs LinkedIn in new tab  
**Priority:** Low  
**Type:** Functional

### TC052: Back Button Functionality from Product Detail
**Preconditions:** On product detail page  
**Steps:**
1. Click "Back to products" button
**Expected Result:** Navigate back to products page (inventory.html)  
**Priority:** Medium  
**Type:** Functional

---

## 6. Product Detail Page Module

### TC053: View Product Details
**Preconditions:** Logged in, clicked on a product from inventory  
**Steps:**
1. Verify product detail page shows:
   - Product name
   - Larger product image
   - Full product description
   - Price
   - Add to cart button
**Expected Result:** All product information displayed correctly  
**Priority:** Medium  
**Type:** Functional

### TC054: Add to Cart from Product Detail Page
**Preconditions:** On product detail page, item not in cart  
**Steps:**
1. Click "Add to cart" button
**Expected Result:** Button changes to "Remove", cart badge increments by 1  
**Priority:** High  
**Type:** Functional

### TC055: Remove from Cart on Product Detail Page
**Preconditions:** On product detail page, item already in cart  
**Steps:**
1. Click "Remove" button
**Expected Result:** Button changes to "Add to cart", cart badge decrements by 1  
**Priority:** High  
**Type:** Functional

---

## 7. Cross-Browser & Performance Module

### TC056: Chrome Browser Compatibility
**Preconditions:** Access site using Chrome browser  
**Steps:**
1. Execute critical user flows (login, add to cart, checkout)
**Expected Result:** All functionality works correctly in Chrome  
**Priority:** High  
**Type:** Compatibility

### TC057: Firefox Browser Compatibility
**Preconditions:** Access site using Firefox browser  
**Steps:**
1. Execute critical user flows (login, add to cart, checkout)
**Expected Result:** All functionality works correctly in Firefox  
**Priority:** High  
**Type:** Compatibility

### TC058: Page Load Performance - Standard User
**Preconditions:** Using `standard_user` account  
**Steps:**
1. Login and measure time to products page load
**Expected Result:** Page loads in under 2 seconds  
**Priority:** Medium  
**Type:** Performance

### TC059: Page Load Performance - Performance Glitch User
**Preconditions:** Using `performance_glitch_user` account  
**Steps:**
1. Login and measure time to products page load
**Expected Result:** Noticeable delay (>2 seconds) - expected behavior for this user type  
**Priority:** Medium  
**Type:** Performance

### TC060: Responsive Design - Cart Badge Visibility
**Preconditions:** Items in cart  
**Steps:**
1. Verify cart badge is visible on all pages at various window sizes
**Expected Result:** Cart badge remains visible and readable  
**Priority:** Low  
**Type:** UI

---

## Test Execution Summary

**Total Test Cases:** 60  
**Critical Path Test Cases:** 25 (marked as High Priority)  
**Coverage:**
- Authentication: 10 test cases
- Product Browsing: 10 test cases
- Shopping Cart: 10 test cases
- Checkout Process: 12 test cases
- Navigation & UI: 10 test cases
- Product Details: 3 test cases
- Cross-Browser & Performance: 5 test cases

**Recommended Execution Order:**
1. Authentication tests (TC001-TC010)
2. Product browsing (TC011-TC020)
3. Cart operations (TC021-TC030)
4. Checkout process (TC031-TC042)
5. Navigation (TC043-TC052)
6. Product details (TC053-TC055)
7. Performance & compatibility (TC056-TC060)

---

## Notes
- All test cases assume starting from a clean state unless specified in preconditions
- Known issues with `problem_user`: Images may not display correctly
- `performance_glitch_user` intentionally has delays
- Some test cases may need adjustment based on actual execution results
- Screenshot evidence should be captured for all failed test cases