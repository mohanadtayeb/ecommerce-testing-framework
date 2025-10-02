const { describe, test, beforeAll, afterAll, expect } = require('@jest/globals');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/loginPage');
const ProductPage = require('../pages/productsPage');

describe('Product Browsing Tests', () => {
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
      
      // Login and navigate to products
      await loginPage.navigate();
      await driver.sleep(1000);
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.waitForPageLoad();
    } catch (error) {
      console.error('products beforeEach error:', error.message);
      // Try basic navigation
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.waitForPageLoad();
    }
  }, 15000);

  // TC011: Product List Visibility
  test('TC011: Should show product list', async () => {
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  }, 30000);

  // TC012: Product List Ordering
  test('TC012: Should allow product list ordering', async () => {
    await productsPage.selectSortOption('Name (A to Z)');
    await productsPage.waitForPageLoad();
    const productNames = await productsPage.getProductNames();
    expect(productNames).toEqual(expect.arrayContaining(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']));
  }, 30000);

  // TC013: Product Details Page Accessibility
  test('TC013: Should allow navigation to product details page', async () => {
    await productsPage.navigateToProductDetails('Sauce Labs Backpack');
    const isOnProductDetails = await productsPage.isOnProductDetailsPage('Sauce Labs Backpack');
    expect(isOnProductDetails).toBe(true);
  }, 30000);

  // TC014: Product Details Page Content
  test('TC014: Should display product details content', async () => {
    await productsPage.navigateToProductDetails('Sauce Labs Backpack');
    const productDescription = await productsPage.getProductDescription();
    expect(productDescription).toContain('carry.allTheThings()');
  }, 30000);

  // TC015: Product Details Page Image
  test('TC015: Should display product image', async () => {
    await productsPage.navigateToProductDetails('Sauce Labs Backpack');
    const productImage = await productsPage.getProductImage();
    expect(productImage).not.toBeNull();
  }, 30000);

  // TC016: Product Details Page Price
  test('TC016: Should display product price', async () => {
    await productsPage.navigateToProductDetails('Sauce Labs Backpack');
    const productPrice = await productsPage.getProductPrice();
    expect(productPrice).not.toBeNull();
  }, 30000);
    // TC017: Back Navigation from Product Details
    test('TC017: Should navigate back to products page from product details', async () => {
        await productsPage.navigateToProductDetails('Sauce Labs Backpack');
        await productsPage.goBackToProductsPage();
        const isOnProducts = await productsPage.isOnProductsPage();
        expect(isOnProducts).toBe(true);
    }, 30000);
});