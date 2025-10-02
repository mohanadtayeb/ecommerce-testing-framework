const { Builder, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

/**
 * WebDriver utility for creating and configuring browser instances
 */
class WebDriverManager {
  /**
   * Create a new Chrome WebDriver instance with automatic driver management
   * @param {boolean} headless - Run in headless mode
   * @returns {Promise<WebDriver>} Configured WebDriver instance
   */
  static async getChromeDriver(headless = true) {
    const options = new chrome.Options();
    
    if (headless) {
      options.addArguments('--headless');
    }
    
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--disable-blink-features=AutomationControlled');
    options.addArguments('--disable-web-security');
    options.addArguments('--disable-features=VizDisplayCompositor');
    
    // Use Chrome service for automatic driver management
    const service = new chrome.ServiceBuilder();
    
    // Enable automatic driver management
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
    
    // Maximize window
    await driver.manage().window().maximize();
    
    // Set implicit wait
    await driver.manage().setTimeouts({ implicit: 10000 });
    
    return driver;
  }

  /**
   * Take screenshot
   * @param {WebDriver} driver 
   * @param {string} filename 
   */
  static async takeScreenshot(driver, filename) {
    const fs = require('fs');
    const path = require('path');
    
    const screenshotPath = path.join(__dirname, '../../results/screenshots');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(screenshotPath)) {
      fs.mkdirSync(screenshotPath, { recursive: true });
    }
    
    const image = await driver.takeScreenshot();
    fs.writeFileSync(
      path.join(screenshotPath, `${filename}.png`),
      image,
      'base64'
    );
  }
}

module.exports = WebDriverManager;