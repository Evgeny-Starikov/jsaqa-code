const { test, expect } = require("@playwright/test");
const {
  invalidName,
  invalidPassword,
  validName,
  validPassword
} = require("../auth");

test("Failed authorization", async () => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.fill('[placeholder="Email"]', invalidName);
  await page.fill('[placeholder="Пароль"]', invalidPassword);
  await page.click('[data-testid="login-submit-btn"]');
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
});

test("validUser", async ({ page }) => {
  await page.goto("https://netology.ru//?modal=sign_in");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(validName);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(validPassword);
  await page.getByTestId("login-submit-btn").click();
  await expect(
    page.getByRole("heading", { name: "Моё обучение" })
  ).toBeVisible();
});
