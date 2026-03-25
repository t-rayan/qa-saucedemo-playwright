import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { users } from '../test-data/users'

test.describe('Login module', () => {

  test('TC_001 valid login redirects to inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.valid.username, users.valid.password)
    await expect(page).toHaveURL(/inventory/)
    await expect(page.locator('.title')).toHaveText('Products')
  })

  test('TC_002 wrong password shows invalid credentials error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.valid.username, users.invalid.password)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username and password do not match')
  })

  test('TC_003 wrong username shows invalid credentials error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.invalid.username, users.valid.password)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username and password do not match')
  })

  test('TC_004 locked out user sees locked out error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.locked.username, users.locked.password)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('locked out')
  })

  test('TC_005 empty username shows required field error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('', users.valid.password)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username is required')
  })

  test('TC_006 empty password shows required field error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.valid.username, '')
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Password is required')
  })

  test('TC_007 error message is dismissible', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.invalid.username, users.invalid.password)
    await expect(loginPage.errorMessage).toBeVisible()
    await page.locator('[data-test="error-button"]').click()
    await expect(loginPage.errorMessage).not.toBeVisible()
  })

  test('TC_008 valid login after failed attempt succeeds', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.invalid.username, users.invalid.password)
    await expect(loginPage.errorMessage).toBeVisible()
    await loginPage.login(users.valid.username, users.valid.password)
    await expect(page).toHaveURL(/inventory/)
  })

})