const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        
        // Locators
        this.cartBadge = By.css('.shopping_cart_badge');
        this.cartItems = By.css('.cart_item');
        this.cartContainer = By.css('.cart_contents_container');
        this.checkoutButton = By.id('checkout');
    }

    async navigate() {
        await this.driver.get('https://www.saucedemo.com/cart.html');
    }

    async waitForPageLoad() {
        try {
            await this.driver.wait(until.elementLocated(this.cartContainer), 15000);
            await this.driver.sleep(1000); // Brief wait for content to stabilize
        } catch (error) {
            // Cart might be empty, which is valid
            await this.driver.sleep(2000);
        }
    }

    async getCartBadge() {
        try {
            const cartBadge = await this.driver.findElement(this.cartBadge);
            const text = await cartBadge.getText();
            return parseInt(text, 10) || 0;
        } catch (error) {
            return 0; // No badge means empty cart
        }
    }

    async getCartItems() {
        try {
            const cartItems = await this.driver.findElements(By.css('.inventory_item_name'));
            const items = await Promise.all(cartItems.map(item => item.getText()));
            return items;
        } catch (error) {
            return []; // Empty cart
        }
    }

    async getCartItemCount() {
        try {
            const cartItems = await this.driver.findElements(this.cartItems);
            return cartItems.length;
        } catch (error) {
            return 0; // Empty cart
        }
    }

    async getCartItemNameAt(index) {
        try {
            const cartItems = await this.driver.findElements(By.css('.inventory_item_name'));
            if (index < cartItems.length) {
                return await cartItems[index].getText();
            }
            throw new Error(`Index ${index} out of bounds for cart items`);
        } catch (error) {
            throw new Error(`Failed to get cart item name at index ${index}: ${error.message}`);
        }
    }

    async removeItemFromCart(name) {
        try {
            const cartItems = await this.driver.findElements(this.cartItems);
            
            for (let item of cartItems) {
                const nameElement = await item.findElement(By.css('.inventory_item_name'));
                const itemName = await nameElement.getText();
                
                if (itemName === name) {
                    const removeButton = await item.findElement(By.css('button[id^="remove"]'));
                    await removeButton.click();
                    return;
                }
            }
            
            throw new Error(`Item "${name}" not found in cart`);
        } catch (error) {
            throw new Error(`Failed to remove item from cart: ${error.message}`);
        }
    }

    async proceedToCheckout() {
        try {
            const checkoutBtn = await this.driver.findElement(this.checkoutButton);
            await checkoutBtn.click();
        } catch (error) {
            throw new Error(`Failed to proceed to checkout: ${error.message}`);
        }
    }
}

module.exports = CartPage;
