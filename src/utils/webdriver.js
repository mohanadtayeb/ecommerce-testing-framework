const { Builder, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

async function getDriver() {
  const options = new chrome.Options();
  options.addArguments('--headless'); // Headless for CI; remove for debugging
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1920,1080');

  const caps = Capabilities.chrome();
  caps.set('chromeOptions', options);

  return await new Builder()
    .forBrowser('chrome')
    .setChromeService(new chrome.ServiceBuilder(chromedriver.path))
    .withCapabilities(caps)
    .build();
}

module.exports = { getDriver };