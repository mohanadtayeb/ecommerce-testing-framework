# Defect Log - SauceDemo Testing

## Defect Report Template
```
Defect ID: DEF[XXX]
Title: [Brief description]
Description: [Detailed description]
Steps to Reproduce:
1. [Step 1]
2. [Step 2]
...
Expected Result: [What should happen]
Actual Result: [What actually happened]
Severity: [Critical/High/Medium/Low]
Priority: [High/Medium/Low]
Status: [Open/In Progress/Resolved/Closed]
Environment: [Browser, OS, Version]
Affected User Types: [Which users experience this]
Screenshots: [Path to screenshot file]
Date Reported: [Date]
Reporter: [Your name]
```

---

## Defect #1: Problem User - Images Not Displaying Correctly

**Defect ID:** DEF001  
**Title:** Product images display incorrectly for problem_user  
**Description:** When logged in as `problem_user`, all product images on the inventory page display the same incorrect image (dog image) instead of the actual product images.  
**Steps to Reproduce:**
1. Navigate to https://www.saucedemo.com/
2. Login with username: `problem_user` and password: `secret_sauce`
3. Observe product images on inventory page

**Expected Result:** Each product should display its correct, unique product image  
**Actual Result:** All products display the same image (appears to be a dog with a helmet)  
**Severity:** High  
**Priority:** High  
**Status:** Open (Known Issue - Intentional Bug for Testing)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** problem_user only  
**Screenshots:** `results/screenshots/def001_problem_user_images.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #2: Performance Glitch User - Slow Page Load

**Defect ID:** DEF002  
**Title:** Significant delay when loading inventory page for performance_glitch_user  
**Description:** When logged in as `performance_glitch_user`, there is a noticeable delay (5+ seconds) before the inventory page loads completely.  
**Steps to Reproduce:**
1. Navigate to https://www.saucedemo.com/
2. Login with username: `performance_glitch_user` and password: `secret_sauce`
3. Observe loading time for inventory page

**Expected Result:** Inventory page loads within 2 seconds  
**Actual Result:** Inventory page takes approximately 5-7 seconds to fully load  
**Severity:** Medium  
**Priority:** Medium  
**Status:** Open (Known Issue - Intentional Performance Issue)  
**Environment:** Chrome v120, Windows 11, Stable Internet Connection  
**Affected User Types:** performance_glitch_user only  
**Screenshots:** `results/screenshots/def002_performance_delay.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #3: Locked Out User - Cannot Access Application

**Defect ID:** DEF003  
**Title:** locked_out_user is permanently locked and cannot login  
**Description:** User `locked_out_user` receives an error message stating the user has been locked out and cannot access the application at all.  
**Steps to Reproduce:**
1. Navigate to https://www.saucedemo.com/
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click Login button

**Expected Result:** [Depends on business requirement - either successful login or clear explanation]  
**Actual Result:** Error message: "Epic sadface: Sorry, this user has been locked out."  
**Severity:** High  
**Priority:** Medium  
**Status:** Open (Known Issue - Intentional for Testing Security)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** locked_out_user only  
**Screenshots:** `results/screenshots/def003_locked_out.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #4: Cart Badge Not Visible When Empty

**Defect ID:** DEF004  
**Title:** Shopping cart badge disappears when cart is empty  
**Description:** The cart badge (showing item count) is not visible when the cart is empty, which may confuse users about the location of the cart icon.  
**Steps to Reproduce:**
1. Login as any valid user
2. Ensure cart is empty (no items added)
3. Observe cart icon in header

**Expected Result:** Cart badge should display "0" or remain visible with empty state indication  
**Actual Result:** Cart badge is completely hidden when cart is empty  
**Severity:** Low  
**Priority:** Low  
**Status:** Open (UI/UX Issue)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** All users  
**Screenshots:** `results/screenshots/def004_empty_cart_badge.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #5: Error Message Styling Inconsistency

**Defect ID:** DEF005  
**Title:** Error messages use inconsistent styling and positioning  
**Description:** Error messages on different pages (login vs checkout) have slightly different styling, colors, or positioning, creating an inconsistent user experience.  
**Steps to Reproduce:**
1. Trigger error on login page (empty credentials)
2. Note error message style, color, and position
3. Navigate to checkout page
4. Trigger error on checkout page (empty fields)
5. Compare error message styles

**Expected Result:** Error messages should have consistent styling across all pages  
**Actual Result:** Error messages vary slightly in appearance and positioning  
**Severity:** Low  
**Priority:** Low  
**Status:** Open (UI/UX Issue)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** All users  
**Screenshots:** `results/screenshots/def005_error_styling.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #6: No Confirmation Modal Before Removing Item

**Defect ID:** DEF006  
**Title:** No confirmation dialog when removing items from cart  
**Description:** When clicking "Remove" button on cart page, the item is immediately removed without any confirmation dialog, which could lead to accidental removals.  
**Steps to Reproduce:**
1. Login as standard_user
2. Add items to cart
3. Navigate to cart page
4. Click "Remove" button on any item

**Expected Result:** Confirmation modal appears asking "Are you sure you want to remove this item?"  
**Actual Result:** Item is immediately removed without confirmation  
**Severity:** Low  
**Priority:** Low  
**Status:** Open (UX Enhancement)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** All users  
**Screenshots:** `results/screenshots/def006_no_confirmation.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #7: Missing Product Search Functionality

**Defect ID:** DEF007  
**Title:** No search functionality available for products  
**Description:** The application does not provide a search bar or search functionality to find specific products, forcing users to scroll through all items.  
**Steps to Reproduce:**
1. Login as any valid user
2. Look for search functionality on inventory page
3. Attempt to search for specific product

**Expected Result:** Search bar available to filter/search products by name or description  
**Actual Result:** No search functionality exists; only sorting options available  
**Severity:** Medium  
**Priority:** Low  
**Status:** Open (Feature Request)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** All users  
**Screenshots:** `results/screenshots/def007_no_search.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #8: Cannot Update Quantity in Cart

**Defect ID:** DEF008  
**Title:** No option to change item quantity in cart - only add or remove  
**Description:** Users cannot update the quantity of items in their cart. They can only add one at a time from the products page or remove the item entirely.  
**Steps to Reproduce:**
1. Login as standard_user
2. Add item to cart
3. Navigate to cart page
4. Attempt to change quantity (e.g., from 1 to 2)

**Expected Result:** Quantity selector available to increase/decrease item quantity  
**Actual Result:** No quantity modification option; must add items individually from products page  
**Severity:** Medium  
**Priority:** Medium  
**Status:** Open (Feature Gap)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** All users  
**Screenshots:** `results/screenshots/def008_no_quantity_update.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #9: Social Media Links Not Opening in New Tab

**Defect ID:** DEF009  
**Title:** Footer social media links open in same tab instead of new tab  
**Description:** When clicking on social media icons (Twitter, Facebook, LinkedIn) in the footer, they open in the same tab, causing users to lose their place in the application.  
**Steps to Reproduce:**
1. Login as any valid user
2. Scroll to footer
3. Click on any social media icon (Twitter, Facebook, LinkedIn)

**Expected Result:** Social media links should open in a new tab (target="_blank")  
**Actual Result:** Links open in the same tab, navigating away from the application  
**Severity:** Low  
**Priority:** Low  
**Status:** Open (UX Issue)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** All users  
**Screenshots:** `results/screenshots/def009_social_links.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect #10: Missing Back Button on Checkout Information Page

**Defect ID:** DEF010  
**Title:** No back button on checkout information page to return to cart  
**Description:** The checkout information page (step 1) has a Cancel button that goes to cart, but lacks a clear "Back to Cart" button, which may confuse users expecting standard navigation.  
**Steps to Reproduce:**
1. Login as standard_user
2. Add items to cart
3. Navigate to cart and click Checkout
4. Look for back/return to cart button on checkout-step-one page

**Expected Result:** Clear "Back to Cart" button available for navigation  
**Actual Result:** Only "Cancel" button available (which does return to cart but naming is unclear)  
**Severity:** Low  
**Priority:** Low  
**Status:** Open (UI/UX Improvement)  
**Environment:** Chrome v120, Windows 11  
**Affected User Types:** All users  
**Screenshots:** `results/screenshots/def010_no_back_button.png`  
**Date Reported:** [Insert Date]  
**Reporter:** [Your Name]

---

## Defect Summary Statistics

**Total Defects Reported:** 10  
**By Severity:**
- Critical: 0
- High: 2 (DEF001, DEF003)
- Medium: 3 (DEF002, DEF007, DEF008)
- Low: 5 (DEF004, DEF005, DEF006, DEF009, DEF010)

**By Priority:**
- High: 2
- Medium: 3
- Low: 5

**By Status:**
- Open: 10
- In Progress: 0
- Resolved: 0
- Closed: 0

**By Category:**
- Functional: 4 (DEF001, DEF002, DEF003, DEF008)
- UI/UX: 4 (DEF004, DEF005, DEF009, DEF010)
- Feature Gap: 2 (DEF007, DEF008)
- Performance: 1 (DEF002)

**Known Intentional Issues (For Testing Purposes):**
- DEF001: problem_user image issues
- DEF002: performance_glitch_user delays
- DEF003: locked_out_user access restriction

---

## Additional Notes

### Testing Environment Details
- **Browser:** Chrome Version 120.x
- **Operating System:** Windows 11
- **Screen Resolution:** 1920x1080
- **Network:** Stable broadband connection
- **Test Date Range:** [Insert dates]

### Defect Verification Process
1. All defects verified on multiple browsers where applicable
2. Screenshots captured for visual defects
3. Console logs checked for JavaScript errors
4. Network tab reviewed for failed requests

### Recommendations
1. **High Priority:** Address DEF001 and DEF003 for user experience consistency
2. **Medium Priority:** Consider implementing missing features (DEF007, DEF008)
3. **Low Priority:** UI/UX improvements can be addressed in future releases

### Future Testing Considerations
- Test on mobile devices and tablets
- Perform accessibility testing (WCAG compliance)
- Conduct security testing for authentication flows
- Load testing with multiple concurrent users
- API testing if backend APIs are exposed