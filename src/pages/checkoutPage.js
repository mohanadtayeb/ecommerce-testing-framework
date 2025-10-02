const { By, until } = require('selenium-webdriver');

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.saucedemo.com/checkout-step-one.html';
    this.firstNameInput = By.css('#first-name');
    this.lastNameInput = By.css('#last-name');
    this.zipInput = By.css('#postal-code');
    this.continueButton = By.css('#continue');
    this.checkoutOverview = By.css('#checkout-summary-container');
    this.finishButton = By.id('finish');
    this.shoppingCartLink = By.css('.shopping_cart_link');
  }

  async navigate() {
    await this.driver.get(this.url);
  }

  async navigateToCheckout() {
    try {
      // Click the shopping cart icon
      const cartLink = await this.driver.findElement(this.shoppingCartLink);
      await cartLink.click();
      
      // Wait for cart page and look for checkout button
      await this.driver.sleep(3000);
      
      // Try multiple selectors for checkout button
      const checkoutSelectors = [
        By.id('checkout'),
        By.css('#checkout'),
        By.css('[data-test="checkout"]'),
        By.css('button[name="checkout"]')
      ];
      
      let checkoutButton = null;
      for (let selector of checkoutSelectors) {
        try {
          await this.driver.wait(until.elementLocated(selector), 5000);
          checkoutButton = await this.driver.findElement(selector);
          if (await checkoutButton.isDisplayed()) {
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!checkoutButton) {
        throw new Error('Checkout button not found - cart may be empty');
      }
      
      await checkoutButton.click();
      await this.driver.sleep(1000);
    } catch (error) {
      throw new Error(`Failed to navigate to checkout: ${error.message}`);
    }
  }

  async waitForPageLoad() {
    try {
      // Wait for checkout form to load
      await this.driver.wait(until.elementLocated(this.firstNameInput), 10000);
    } catch (error) {
      throw new Error(`Failed to wait for checkout page: ${error.message}`);
    }
  }

  async fillCheckoutForm(firstName, lastName, zip) {
    await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
    await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
    await this.driver.findElement(this.zipInput).sendKeys(zip);
  }

  async clickContinueButton() {
    await this.driver.findElement(this.continueButton).click();
  }

  async waitForCheckoutOverviewPage() {
    await this.driver.wait(until.elementLocated(this.checkoutOverview), 10000);
  }

  async getFinishButton() {
    try {
      return await this.driver.findElement(this.finishButton);
    } catch (error) {
      return null;
    }
  }

  async clickFinishButton() {
    try {
      const finishBtn = await this.driver.findElement(this.finishButton);
      await finishBtn.click();
    } catch (error) {
      throw new Error(`Failed to click finish button: ${error.message}`);
    }
  }

  async getConfirmationText() {
    try {
      // Wait for order confirmation page
      await this.driver.sleep(2000);
      const confirmationElement = await this.driver.findElement(By.css('.complete-header'));
      return await confirmationElement.getText();
    } catch (error) {
      try {
        // Try alternative selector
        const confirmationElement = await this.driver.findElement(By.css('h2'));
        return await confirmationElement.getText();
      } catch (e) {
        return '';
      }
    }
  }
}

module.exports = CheckoutPage;
