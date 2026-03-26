import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import * as testData from '../test-data/data.json'

test.describe('Login module', () => {

  test('valid login redirects to inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(testData.userCredentials.standardUser, testData.userCredentials.password)
    await expect(page).toHaveURL(/inventory/)
    await expect(page.locator('.title')).toHaveText('Products')
  })

  test('wrong password shows invalid credentials error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(testData.userCredentials.standardUser, testData.userCredentials.wrongPassword)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username and password do not match')
  })

  test('wrong username shows invalid credentials error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(testData.userCredentials.wrongUsername, testData.userCredentials.password)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username and password do not match')
  })

  test('locked out user sees locked out error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(testData.userCredentials.lockedOutUser, testData.userCredentials.password)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('locked out')
  })

  test('empty username shows required field error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('', testData.userCredentials.password)
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username is required')
  })

  test('empty password shows required field error', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(testData.userCredentials.standardUser, '')
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Password is required')
  })

  test('error message is dismissible', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(testData.userCredentials.problemUser, testData.userCredentials.wrongPassword)
    await expect(loginPage.errorMessage).toBeVisible()
    await page.locator('[data-test="error-button"]').click()
    await expect(loginPage.errorMessage).not.toBeVisible()
  })

  test('valid login after failed attempt succeeds', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(testData.userCredentials.problemUser, testData.userCredentials.wrongPassword)
    await expect(loginPage.errorMessage).toBeVisible()
    await loginPage.login(testData.userCredentials.standardUser, testData.userCredentials.password)
    await expect(page).toHaveURL(/inventory/)
  })

})