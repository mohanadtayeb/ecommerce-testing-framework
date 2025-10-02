   const { getDriver } = require('./webdriver');
   const { until } = require('selenium-webdriver');

   class BaseTest {
     static async setup() {
       this.driver = await getDriver();
       this.driver.manage().window().maximize();
       await this.driver.get('https://www.saucedemo.com/');
     }

     static async teardown() {
       if (this.driver) {
         await this.driver.quit();
       }
     }

     static async waitForElement(locator) {
       return await this.driver.wait(until.elementLocated(locator), 10000);
     }
   }

   module.exports = BaseTest;