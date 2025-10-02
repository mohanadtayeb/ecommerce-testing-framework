const { describe, test, beforeAll, afterAll, beforeEach, expect } = require('@jest/globals');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/loginPage');
const ProductPage = require('../pages/productsPage');

describe('Navigation and UI Tests', () => {
  let driver;
  let loginPage;
  let productsPage;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--window-size=1920,1080');

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
      
      await loginPage.navigate();
      await driver.sleep(1000);
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.waitForPageLoad();
    } catch (error) {
      console.error('navigation beforeEach error:', error.message);
      // Try basic navigation
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.waitForPageLoad();
    }
  }, 15000);

  // TC046: Logout Functionality
  test('TC046: Should logout successfully', async () => {
    await productsPage.logout();
    
    // Verify back on login page
    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);
  }, 30000);

  // TC047: Reset App State
  test('TC047: Should reset app state and clear cart', async () => {
    // Add items to cart
    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.addToCart('Sauce Labs Bike Light');
    
    let badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(2);
    
    // Reset app state
    await productsPage.openMenu();
    const { By } = require('selenium-webdriver');
    const resetButton = await driver.findElement(By.id('reset_sidebar_link'));
    await resetButton.click();
    
    // Wait a moment for reset
    await driver.sleep(1000);
    
    // Badge should be cleared
    badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(0);
  }, 30000);

  test('Should display hamburger menu options', async () => {
    await productsPage.openMenu();
    
    const { By, until } = require('selenium-webdriver');
    
    // Verify menu items are visible
    await driver.wait(until.elementLocated(By.id('inventory_sidebar_link')), 5000);
    await driver.wait(until.elementLocated(By.id('about_sidebar_link')), 5000);
    await driver.wait(until.elementLocated(By.id('logout_sidebar_link')), 5000);
    await driver.wait(until.elementLocated(By.id('reset_sidebar_link')), 5000);
    
    expect(true).toBe(true); // If we get here, all elements were found
  }, 30000);
});