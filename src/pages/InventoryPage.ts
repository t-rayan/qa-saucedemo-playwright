import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page
    readonly cartBadge: Locator
    readonly productItems: Locator
    readonly cartButton: Locator

    constructor(page: Page) {
        this.page = page
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.productItems = page.locator('[data-test="inventory-item"]')
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
    }

    async addItemToCart(itemName: string): Promise<void> {
        const productContainer = this.page.locator('.inventory_item', { hasText: itemName });
        await productContainer.locator('button:has-text("Add to cart")').click();
    }

    async removeItem(itemName: string) {
        // Find the specific item container by its name
        const itemContainer = this.page.locator('.inventory_item', { hasText: itemName });

        // Find the 'Remove' button inside THAT specific container and click it
        const removeButton = itemContainer.locator('button:has-text("Remove")');
        await removeButton.click();
    }

    async getCartItemCount(): Promise<number> {
        const badgeText = await this.cartBadge.innerText();
        return parseInt(badgeText) || 0;
    }
    async navigateToCart(): Promise<void> {
        await this.cartButton.click();
    }
}