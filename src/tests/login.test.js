const { describe, test, beforeAll, afterAll, expect } = require('@jest/globals');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/loginPage');
const ProductPage = require('../pages/productsPage');

describe('Login Functionality Tests', () => {
  let driver;
  let loginPage;
  let productsPage;

  beforeAll(async () => {
    // Set up Chrome options
    const options = new chrome.Options();
    options.addArguments('--headless'); // Re-enable headless mode
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--disable-web-security');
    options.addArguments('--disable-features=VizDisplayCompositor');

    // Create driver
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    loginPage = new LoginPage(driver);
    productsPage = new ProductPage(driver);
  }, 30000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  }, 30000);

  beforeEach(async () => {
    try {
      // Navigate to a blank page first to ensure clean state
      await driver.get('about:blank');
      
      // Complete session reset
      await driver.manage().deleteAllCookies();
      
      // Clear storage safely
      try {
        await driver.executeScript('window.localStorage.clear();');
        await driver.executeScript('window.sessionStorage.clear();');
      } catch (e) {
        // Storage might not be available in some contexts, ignore
      }
      
      // Navigate to login page
      await loginPage.navigate();
      await driver.sleep(1000); // Wait for page to stabilize
      
      // Ensure we're actually on the login page by checking for login button
      await driver.wait(async () => {
        try {
          const loginButton = await driver.findElement({id: 'login-button'});
          return await loginButton.isDisplayed();
        } catch (e) {
          return false;
        }
      }, 10000);
      
    } catch (error) {
      console.error('beforeEach error:', error.message);
      // Try to navigate anyway
      await loginPage.navigate();
    }
  }, 15000); // Increased timeout

  // TC001: Successful Login with Standard User
  test('TC001: Should login successfully with standard_user', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify redirect to products page
    const isOnProducts = await productsPage.isOnProductsPage();
    expect(isOnProducts).toBe(true);
    
    // Verify products are visible
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  }, 30000);

  // TC002: Invalid Login - Wrong Password
  test('TC002: Should show error with wrong password', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    
    // Add extra wait for error to appear
    await driver.sleep(2000);
    
    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    
    // Verify still on login page
    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);
  }, 30000);

  // TC003: Invalid Login - Wrong Username
  test('TC003: Should show error with invalid username', async () => {
    await loginPage.login('invalid_user', 'secret_sauce');
    
    // Add extra wait for error to appear
    await driver.sleep(2000);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  }, 30000);

  // TC004: Login with Empty Username
  test('TC004: Should show error when username is empty', async () => {
    await loginPage.login('', 'secret_sauce');
    
    // Add extra wait for error to appear
    await driver.sleep(2000);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username is required');
  }, 30000);

  // TC005: Login with Empty Password
  test('TC005: Should show error when password is empty', async () => {
    await loginPage.login('standard_user', '');
    
    // Add extra wait for error to appear
    await driver.sleep(2000);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Password is required');
  }, 30000);

  // TC006: Login with Both Fields Empty
  test('TC006: Should show error when both fields are empty', async () => {
    await loginPage.login('', '');
    
    // Add extra wait for error to appear
    await driver.sleep(2000);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username is required');
  }, 30000);

  // TC007: Login with Locked Out User
  test('TC007: Should show locked out error for locked_out_user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Add extra wait for error to appear
    await driver.sleep(2000);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out');
  }, 30000);

  // TC008: Login with Problem User
  test('TC008: Should login successfully with problem_user', async () => {
    await loginPage.login('problem_user', 'secret_sauce');
    
    // Should reach products page despite image issues
    const isOnProducts = await productsPage.isOnProductsPage();
    expect(isOnProducts).toBe(true);
    
    // Note: Images may not display correctly - this is expected behavior
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  }, 60000); // Increased timeout

  // TC009: Login with Performance Glitch User
  test('TC009: Should login with performance_glitch_user (may be slow)', async () => {
    const startTime = Date.now();
    
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    
    const loadTime = Date.now() - startTime;
    
    // Should eventually reach products page
    const isOnProducts = await productsPage.isOnProductsPage();
    expect(isOnProducts).toBe(true);
    
    // Note: Load time may be significantly longer
    console.log(`Login took ${loadTime}ms for performance_glitch_user`);
  }, 120000); // Increased timeout to 2 minutes for slow user

  // TC010: Error Close Button Functionality
  test('TC010: Should close error message when X button is clicked', async () => {
    await loginPage.login('', 'secret_sauce'); // Trigger error
    
    // Wait for error to appear
    await driver.sleep(2000);
    
    // Verify error is displayed
    let errorDisplayed = await loginPage.isErrorDisplayed();
    expect(errorDisplayed).toBe(true);
    
    // Close error
    await loginPage.closeError();
    await driver.sleep(500);
    
    // Verify error is no longer displayed
    errorDisplayed = await loginPage.isErrorDisplayed();
    expect(errorDisplayed).toBe(false);
  }, 30000);

  // Additional Test: Verify Login Logo
  test('Should display Swag Labs logo on login page', async () => {
    const logoText = await loginPage.getLogoText();
    expect(logoText).toContain('Swag Labs');
  }, 30000);

  // Additional Test: Multiple Failed Login Attempts
  test('Should show error consistently on multiple failed attempts', async () => {
    // First attempt
    await loginPage.login('invalid', 'wrong');
    await driver.sleep(2000);
    let errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    
    // Clear and try again
    await loginPage.clearFields();
    await loginPage.login('another_invalid', 'also_wrong');
    await driver.sleep(2000);
    errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  }, 60000);
});