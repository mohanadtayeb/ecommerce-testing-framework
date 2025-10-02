const { By, until } = require('selenium-webdriver');

class ProductPage {
  constructor(driver) {
    this.driver = driver;
    
    // Locators for products page
    this.inventoryContainer = By.className('inventory_container');
    this.inventoryList = By.className('inventory_list');
    this.productItems = By.className('inventory_item');
    this.pageTitle = By.className('title');
    this.shoppingCartLink = By.className('shopping_cart_link');
  }

  /**
   * Check if currently on products page
   * @returns {Promise<boolean>} True if on products page
   */
  async isOnProductsPage() {
    try {
      // Check URL first with shorter polling
      for (let i = 0; i < 5; i++) {
        const currentUrl = await this.driver.getCurrentUrl();
        
        if (currentUrl.includes('inventory.html') || currentUrl.includes('saucedemo.com/inventory')) {
          // Wait for inventory elements to be visible
          try {
            await this.driver.wait(until.elementLocated(this.inventoryContainer), 10000);
            return true;
          } catch (e) {
            await this.driver.sleep(2000);
          }
        } else {
          // Wait a bit and check URL again
          await this.driver.sleep(2000);
        }
      }
      
      // Final attempt: check for any inventory-related elements
      try {
        await this.driver.wait(until.elementLocated(this.inventoryContainer), 5000);
        return true;
      } catch (e) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Legacy method for backward compatibility
   */
  async onProductPage() {
    return await this.isOnProductsPage();
  }

  /**
   * Wait for the products page to fully load
   * @returns {Promise<void>}
   */
  async waitForPageLoad() {
    try {
      // Use the same logic as isOnProductsPage but wait longer for slow users
      const isLoaded = await this.isOnProductsPage();
      if (!isLoaded) {
        // If still not loaded, try waiting with much longer timeout for performance_glitch_user
        try {
          await this.driver.wait(until.elementLocated(this.inventoryContainer), 60000);
        } catch (e) {
          // Final attempt with alternative selectors
          const alternativeSelectors = [
            this.inventoryList,
            this.productItems,
            By.css('.inventory_item'),
            By.css('#inventory_container'),
            By.css('.header_secondary_container')
          ];
          
          for (let selector of alternativeSelectors) {
            try {
              await this.driver.wait(until.elementLocated(selector), 40000);
              return; // Success with alternative selector
            } catch (err) {
              continue;
            }
          }
          
          throw new Error('Products page did not load within timeout');
        }
      }
      
      // Additional wait to ensure page is fully loaded
      await this.driver.sleep(2000);
    } catch (error) {
      throw new Error(`Failed to wait for products page to load: ${error.message}`);
    }
  }

  async getProductCount() {
    try {
      await this.driver.wait(until.elementLocated(this.productItems), 10000);
      const productElements = await this.driver.findElements(this.productItems);
      return productElements.length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Select sort option from the dropdown
   * @param {string} option - Sort option to select
   */
  async selectSortOption(option) {
    try {
      const sortDropdown = await this.driver.findElement(By.css('.product_sort_container'));
      await sortDropdown.click();
      
      // Find option by text
      const options = await this.driver.findElements(By.css('.product_sort_container option'));
      for (let opt of options) {
        const text = await opt.getText();
        if (text === option) {
          await opt.click();
          return;
        }
      }
      
      throw new Error(`Sort option "${option}" not found`);
    } catch (error) {
      throw new Error(`Failed to select sort option: ${error.message}`);
    }
  }

  /**
   * Get all product names
   * @returns {Promise<Array<string>>} Array of product names
   */
  async getProductNames() {
    try {
      await this.driver.wait(until.elementLocated(this.productItems), 10000);
      const nameElements = await this.driver.findElements(By.css('.inventory_item_name'));
      const names = await Promise.all(nameElements.map(element => element.getText()));
      return names;
    } catch (error) {
      throw new Error(`Failed to get product names: ${error.message}`);
    }
  }

  async getProductDetails(productIndex) {
    const productElements = await this.driver.findElements(By.css('.inventory_item'));
    const productElement = productElements[productIndex];
    const productNameElement = await productElement.findElement(By.css('.inventory_item_name'));
    const productName = await productNameElement.getText();
    const productPriceElement = await productElement.findElement(By.css('.inventory_item_price'));
    const productPrice = await productPriceElement.getText();
    return { name: productName, price: productPrice };
  }

  async clickProductImage(productIndex) {
    const productElements = await this.driver.findElements(By.css('.inventory_item'));
    const productElement = productElements[productIndex];
    const productImageElement = await productElement.findElement(By.css('.inventory_item_img'));
    await productImageElement.click();
  }

  /**
   * Add a product to cart by product name
   * @param {string} productName - Name of the product to add
   */
  async addToCart(productName) {
    try {
      // Wait for products to load
      await this.driver.wait(until.elementLocated(this.productItems), 10000);
      
      // Find the product by name and click its add to cart button
      let attempts = 0;
      while (attempts < 3) {
        try {
          const products = await this.driver.findElements(this.productItems);
          
          for (let i = 0; i < products.length; i++) {
            // Re-find the element each time to avoid stale reference
            const currentProducts = await this.driver.findElements(this.productItems);
            const product = currentProducts[i];
            
            const nameElement = await product.findElement(By.css('.inventory_item_name'));
            const name = await nameElement.getText();
            
            if (name === productName) {
              // Try multiple selectors for the add to cart button
              const buttonSelectors = [
                'button[id^="add-to-cart"]',
                'button[data-test^="add-to-cart"]',
                'button.btn_primary',
                'button:contains("Add to cart")',
                '.btn_inventory'
              ];
              
              let addButton = null;
              for (let selector of buttonSelectors) {
                try {
                  addButton = await product.findElement(By.css(selector));
                  if (await addButton.isDisplayed()) {
                    break;
                  }
                } catch (e) {
                  continue;
                }
              }
              
              if (!addButton) {
                // Fallback: find any button in the product container
                const buttons = await product.findElements(By.css('button'));
                for (let button of buttons) {
                  const text = await button.getText();
                  if (text.toLowerCase().includes('add') || text.toLowerCase().includes('cart')) {
                    addButton = button;
                    break;
                  }
                }
              }
              
              if (!addButton) {
                throw new Error('Add to cart button not found');
              }
              
              await addButton.click();
              
              // Wait for the cart badge to update
              await this.driver.sleep(2000);
              
              // Verify the button text changed to "Remove"
              try {
                const newProducts = await this.driver.findElements(this.productItems);
                const newProduct = newProducts[i];
                const buttons = await newProduct.findElements(By.css('button'));
                for (let button of buttons) {
                  const buttonText = await button.getText();
                  if (buttonText.toLowerCase().includes('remove')) {
                    return; // Success - button changed to remove
                  }
                }
              } catch (e) {
                // Ignore verification errors
              }
              return;
            }
          }
          break; // If we get here without finding the product, exit loop
        } catch (error) {
          if (error.message.includes('stale element') && attempts < 2) {
            attempts++;
            await this.driver.sleep(1000);
            continue;
          }
          throw error;
        }
      }
      
      throw new Error(`Product "${productName}" not found`);
    } catch (error) {
      throw new Error(`Failed to add product to cart: ${error.message}`);
    }
  }

  /**
   * Wait for cart badge to update after adding item
   */
  async waitForCartBadgeUpdate() {
    try {
      await this.driver.sleep(2000); // Wait for cart badge to update
      // Optionally verify the badge exists
      await this.driver.wait(until.elementLocated(By.css('.shopping_cart_badge')), 10000);
    } catch (error) {
      // Badge might not be visible if cart is empty, that's ok
      // But let's wait a bit more just in case
      await this.driver.sleep(1000);
    }
  }

  /**
   * Get cart badge count
   * @returns {Promise<number>} Number on cart badge
   */
  async getCartBadgeCount() {
    try {
      const cartBadge = await this.driver.findElement(By.css('.shopping_cart_badge'));
      const text = await cartBadge.getText();
      return parseInt(text, 10) || 0;
    } catch (error) {
      return 0; // No badge means empty cart
    }
  }

  /**
   * Open the hamburger menu
   */
  async openMenu() {
    try {
      const menuButton = await this.driver.findElement(By.id('react-burger-menu-btn'));
      await menuButton.click();
      await this.driver.sleep(500); // Wait for menu animation
    } catch (error) {
      throw new Error(`Failed to open menu: ${error.message}`);
    }
  }

  /**
   * Logout from the application
   */
  async logout() {
    try {
      await this.openMenu();
      await this.driver.sleep(3000); // Wait longer for menu animation
      
      // Force click on logout link even if not visually displayed
      const logoutLink = await this.driver.findElement(By.id('logout_sidebar_link'));
      
      // Use JavaScript to click if regular click fails
      try {
        await logoutLink.click();
      } catch (e) {
        console.log('Regular click failed, trying JavaScript click');
        await this.driver.executeScript('arguments[0].click();', logoutLink);
      }
      
      await this.driver.sleep(1000); // Wait for logout to complete
    } catch (error) {
      throw new Error(`Failed to logout: ${error.message}`);
    }
  }

  /**
   * Reset app state
   */
  async resetAppState() {
    try {
      await this.openMenu();
      const resetLink = await this.driver.findElement(By.id('reset_sidebar_link'));
      await resetLink.click();
    } catch (error) {
      throw new Error(`Failed to reset app state: ${error.message}`);
    }
  }

  /**
   * Get product title at specific index
   * @param {number} index - Product index
   * @returns {Promise<string>} Product title
   */
  async getProductTitleAt(index) {
    try {
      const products = await this.driver.findElements(this.productItems);
      if (index >= products.length) {
        throw new Error(`Product index ${index} out of range`);
      }
      const nameElement = await products[index].findElement(By.css('.inventory_item_name'));
      return await nameElement.getText();
    } catch (error) {
      throw new Error(`Failed to get product title: ${error.message}`);
    }
  }

  /**
   * Add to cart at specific index
   * @param {number} index - Product index
   */
  async addToCartAt(index) {
    try {
      await this.driver.wait(until.elementLocated(this.productItems), 10000);
      
      let attempts = 0;
      while (attempts < 3) {
        try {
          const products = await this.driver.findElements(this.productItems);
          if (index >= products.length) {
            throw new Error(`Product index ${index} out of range`);
          }
          
          // Re-find elements to avoid stale reference
          const currentProducts = await this.driver.findElements(this.productItems);
          const product = currentProducts[index];
          
          // Get product name for logging
          let productName = 'unknown';
          try {
            const nameElement = await product.findElement(By.css('.inventory_item_name'));
            productName = await nameElement.getText();
          } catch (e) {}
          
          // Use a more direct approach - find button by text content
          const allButtons = await this.driver.findElements(By.css('button'));
          let addButton = null;
          
          for (let button of allButtons) {
            try {
              const text = await button.getText();
              const id = await button.getAttribute('id');
              
              // Check if this button is for adding the current product to cart
              if ((text.toLowerCase().includes('add to cart') || 
                   (id && id.includes('add-to-cart') && id.includes(productName.toLowerCase().replace(/\s+/g, '-')))) &&
                  await button.isDisplayed()) {
                addButton = button;
                break;
              }
            } catch (e) {
              continue;
            }
          }
          
          // Fallback: try to find button within the product element
          if (!addButton) {
            const buttons = await product.findElements(By.css('button'));
            for (let button of buttons) {
              try {
                const text = await button.getText();
                if (text.toLowerCase().includes('add') && await button.isDisplayed()) {
                  addButton = button;
                  break;
                }
              } catch (e) {
                continue;
              }
            }
          }
          
          if (!addButton) {
            throw new Error(`Add to cart button not found for product: ${productName}`);
          }
          
          // Use JavaScript click to ensure it works
          await this.driver.executeScript('arguments[0].click();', addButton);
          
          // Wait for the cart badge to update
          await this.driver.sleep(3000);
          
          return;
        } catch (error) {
          if (error.message.includes('stale element') && attempts < 2) {
            attempts++;
            await this.driver.sleep(1000);
            continue;
          }
          throw error;
        }
      }
    } catch (error) {
      throw new Error(`Failed to add product to cart: ${error.message}`);
    }
  }

  /**
   * Navigate to cart page
   */
  async navigateToCart() {
    try {
      // Try multiple selectors for the cart link
      const cartSelectors = [
        this.shoppingCartLink,
        By.css('.shopping_cart_link'),
        By.css('#shopping_cart_container'),
        By.css('.shopping_cart_container'),
        By.css('[data-test="shopping-cart-link"]')
      ];
      
      let cartLink = null;
      for (let selector of cartSelectors) {
        try {
          cartLink = await this.driver.findElement(selector);
          if (await cartLink.isDisplayed()) {
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!cartLink) {
        throw new Error('Cart link not found');
      }
      
      // Use JavaScript click to ensure it works
      await this.driver.executeScript('arguments[0].click();', cartLink);
      
      // Wait for navigation to complete
      await this.driver.sleep(2000);
      
      // Verify we're on the cart page
      const currentUrl = await this.driver.getCurrentUrl();
      if (!currentUrl.includes('cart')) {
        throw new Error(`Navigation failed - still on: ${currentUrl}`);
      }
    } catch (error) {
      throw new Error(`Failed to navigate to cart: ${error.message}`);
    }
  }

  /**
   * Navigate to product details page
   * @param {string} productName - Name of the product
   */
  async navigateToProductDetails(productName) {
    try {
      await this.driver.wait(until.elementLocated(this.productItems), 10000);
      const products = await this.driver.findElements(this.productItems);
      
      for (let product of products) {
        const nameElement = await product.findElement(By.css('.inventory_item_name'));
        const name = await nameElement.getText();
        
        if (name === productName) {
          await nameElement.click();
          return;
        }
      }
      
      throw new Error(`Product "${productName}" not found`);
    } catch (error) {
      throw new Error(`Failed to navigate to product details: ${error.message}`);
    }
  }

  /**
   * Check if on product details page
   * @param {string} productName - Expected product name
   * @returns {Promise<boolean>}
   */
  async isOnProductDetailsPage(productName) {
    try {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes('inventory-item.html');
    } catch (error) {
      return false;
    }
  }

  /**
   * Get product description from details page
   * @returns {Promise<string>}
   */
  async getProductDescription() {
    try {
      const descElement = await this.driver.findElement(By.css('.inventory_details_desc'));
      return await descElement.getText();
    } catch (error) {
      return '';
    }
  }

  /**
   * Get product image from details page
   * @returns {Promise<WebElement>}
   */
  async getProductImage() {
    try {
      return await this.driver.findElement(By.css('.inventory_details_img'));
    } catch (error) {
      return null;
    }
  }

  /**
   * Get product price from details page
   * @returns {Promise<string>}
   */
  async getProductPrice() {
    try {
      const priceElement = await this.driver.findElement(By.css('.inventory_details_price'));
      return await priceElement.getText();
    } catch (error) {
      return '';
    }
  }

  /**
   * Go back to products page from details
   */
  async goBackToProductsPage() {
    try {
      const backButton = await this.driver.findElement(By.id('back-to-products'));
      await backButton.click();
    } catch (error) {
      throw new Error(`Failed to go back to products page: ${error.message}`);
    }
  }
}

module.exports = ProductPage;
