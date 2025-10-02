# Test Strategy for SauceDemo E-commerce Testing

## Overview
This project tests core e-commerce functionalities of SauceDemo, focusing on user flows, reliability, and performance.

## Scope
- In Scope: Login, product browsing, cart, checkout.
- Out of Scope: Mobile responsiveness, advanced security.

## Tools
- Manual: Browser dev tools, screenshots.
- Automation: Selenium WebDriver, Jest.
- Reporting: Jest HTML reporter, custom logs.

## Risks & Mitigations
- Browser inconsistencies: Test on Chrome/Firefox.
- Flaky tests: Use explicit waits.

## Timeline
- Week 1: Setup & Manual Testing.
- Week 2: Automation.
- Week 3: Reporting & Polish.