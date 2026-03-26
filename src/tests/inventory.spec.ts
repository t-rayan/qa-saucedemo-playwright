import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import * as testData from '../test-data/data.json' // 1. Import the new page

test.describe('Inventory page module', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage; // 2. Declare the variable

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page); // 3. Initialize it

        await loginPage.goto();
        await loginPage.login(testData.userCredentials.standardUser, testData.userCredentials.password); // 4. Login automatically
    });

    test('User can add a backpack to the cart', async () => {
        await inventoryPage.addItemToCart(testData.items.backpack); // 5. Use the new page object to add item
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe(1);
    });
    test('User can add multiple products to the cart', async () => {
        await inventoryPage.addItemToCart(testData.items.backpack); // 5. Use the new page object to add item
        await inventoryPage.addItemToCart(testData.items.bikeLight); // 5. Use the new page object to add item
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