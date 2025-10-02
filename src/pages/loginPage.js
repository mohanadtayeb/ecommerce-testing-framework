const { By, until } = require('selenium-webdriver');

/**
 * Page Object Model for SauceDemo Login Page
 * Handles all interactions with the login page
 */
class LoginPage {
  constructor(driver) {
    this.driver = driver;
    
    // Locators
    this.usernameField = By.id('user-name');
    this.passwordField = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.css('[data-test="error"]');
    this.errorButton = By.css('button.error-button'); // Updated selector based on debug
    this.loginLogo = By.className('login_logo');
    this.botImage = By.className('bot_column');
  }

  /**
   * Navigate to the login page
   */
  async navigate() {
    await this.driver.get('https://www.saucedemo.com/');
    await this.driver.wait(until.elementLocated(this.loginButton), 10000);
  }

  /**
   * Enter username in the username field
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    const usernameElement = await this.driver.findElement(this.usernameField);
    await usernameElement.clear();
    await usernameElement.sendKeys(username);
  }

  /**
   * Enter password in the password field
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    const passwordElement = await this.driver.findElement(this.passwordField);
    await passwordElement.clear();
    await passwordElement.sendKeys(password);
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    const loginBtn = await this.driver.findElement(this.loginButton);
    await loginBtn.click();
  }

  /**
   * Perform complete login action
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    // Add a small wait for the result to process
    await this.driver.sleep(1000);
  }

  /**
   * Get error message text if displayed
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    try {
      // Wait for error to appear with explicit wait
      await this.driver.wait(until.elementLocated(By.css('h3[data-test="error"]')), 15000);
      
      const errorElement = await this.driver.findElement(By.css('h3[data-test="error"]'));
      if (await errorElement.isDisplayed()) {
        const text = await errorElement.getText();
        return text.trim();
      }
      
      return '';
    } catch (error) {
      // Try a backup approach with longer wait
      try {
        await this.driver.sleep(3000);
        const errorElement = await this.driver.findElement(By.css('h3[data-test="error"]'));
        const text = await errorElement.getText();
        return text.trim();
      } catch (e) {
        return '';
      }
    }
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error is displayed
   */
  async isErrorDisplayed() {
    try {
      const errorElement = await this.driver.findElement(By.css('h3[data-test="error"]'));
      return await errorElement.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Close error message by clicking X button
   */
  async closeError() {
    try {
      const closeButton = await this.driver.findElement(By.css('button[data-test="error-button"]'));
      if (await closeButton.isDisplayed()) {
        await closeButton.click();
        await this.driver.sleep(500); // Wait for close animation
        return;
      }
      
      throw new Error('Close button not found or not displayed');
    } catch (e) {
      throw new Error(`Could not find error close button: ${e.message}`);
    }
  }

  /**
   * Check if login page is displayed
   * @returns {Promise<boolean>} True if on login page
   */
  async isOnLoginPage() {
    try {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes('saucedemo.com') && 
             !currentUrl.includes('inventory.html');
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the page title/logo text
   * @returns {Promise<string>} Logo text
   */
  async getLogoText() {
    const logo = await this.driver.findElement(this.loginLogo);
    return await logo.getText();
  }

  /**
   * Clear all form fields
   */
  async clearFields() {
    const usernameElement = await this.driver.findElement(this.usernameField);
    const passwordElement = await this.driver.findElement(this.passwordField);
    await usernameElement.clear();
    await passwordElement.clear();
  }
}

module.exports = LoginPage;