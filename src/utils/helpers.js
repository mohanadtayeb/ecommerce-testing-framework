/**
 * Helper utility functions for tests
 */
class TestHelpers {
  /**
   * Sleep for specified milliseconds
   * @param {number} ms - Milliseconds to sleep
   */
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate random string
   * @param {number} length - Length of string
   * @returns {string} Random string
   */
  static randomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @returns {string} Random email
   */
  static randomEmail() {
    return `test_${this.randomString(8)}@example.com`;
  }

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency
   */
  static formatCurrency(amount) {
    return `${amount.toFixed(2)}`;
  }

  /**
   * Get current timestamp
   * @returns {string} Timestamp string
   */
  static getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Validate email format
   * @param {string} email 
   * @returns {boolean}
   */
  static isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Parse price string to number
   * @param {string} priceString - Price as string (e.g., "$29.99")
   * @returns {number} Price as number
   */
  static parsePrice(priceString) {
    return parseFloat(priceString.replace(/,/g, ''));
  }
}

module.exports = TestHelpers;