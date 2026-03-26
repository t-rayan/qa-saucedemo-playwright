import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage'; 
import * as testData from '../test-data/data.json';

test.describe('Cart Module', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page); 
    
    await loginPage.navigate();
    await loginPage.login(testData.userCredentials.standardUser, testData.userCredentials.password);
  });

  test('Verify added item details in the cart', async () => {
    // Add item and go to cart
    await inventoryPage.addItemToCart(testData.items.backpack);
    await inventoryPage.navigateToCart();

    // 3. Verify the item name is correct in the cart
    const item = await cartPage.getCartItemByName(testData.items.backpack);
    await expect(item).toBeVisible();
    
    // 4. Verify the quantity is '1'
    const qty = item.locator('.cart_quantity');
    await expect(qty).toHaveText('1');
  });

  test('Continue Shopping button returns to inventory', async () => {
    await inventoryPage.navigateToCart();
    await cartPage.continueShopping();
    await expect(inventoryPage.page).toHaveURL(/.*inventory.html/);
  });
});