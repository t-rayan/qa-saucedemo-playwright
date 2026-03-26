import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import * as testData from '../test-data/data.json' 

test.describe('Inventory  module', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage; 
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page); 
        await loginPage.navigate();
        await loginPage.login(testData.userCredentials.standardUser, testData.userCredentials.password); 
    });

    test('User can add a backpack to the cart', async () => {
        await inventoryPage.addItemToCart(testData.items.backpack); 
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe(1);
    });
    test('User can add multiple products to the cart', async () => {
        await inventoryPage.addItemToCart(testData.items.backpack); 
        await inventoryPage.addItemToCart(testData.items.bikeLight); 
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe(2);
    });
    test('User can remove a product from the cart', async () => {
        await inventoryPage.addItemToCart(testData.items.backpack);
        expect(await inventoryPage.getCartItemCount()).toBe(1);

        await inventoryPage.removeItem(testData.items.backpack);

        const isBadgeVisible = await inventoryPage.cartBadge.isVisible();
        expect(isBadgeVisible).toBe(false);
    });

    test('User can navigate to cart page', async ({page}) => {
        await inventoryPage.addItemToCart(testData.items.backpack);
        await inventoryPage.navigateToCart();
        await expect(page).toHaveURL(/cart/);
        await expect(page.locator('.title')).toHaveText('Your Cart');
    })
});