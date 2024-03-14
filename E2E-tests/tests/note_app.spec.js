const { test, expect, describe } = require("@playwright/test");

describe("blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3002/api/testing/reset");
    await request.post("http://localhost:3002/api/users", {
      data: {
        name: "razvan",
        username: "root",
        password: "sekret",
      },
    });
    await page.goto("http://localhost:5173");
  });
  test("front end page can be opened", async ({ page }) => {
    const title = page.getByText("blogs");

    expect(await page.title()).toBe("Blog-fullstack");
    await expect(title).toBeVisible();
  });

  test("user can login", async ({ page }) => {
    await page.getByRole("textbox", { name: "username" }).fill("root");
    await page.getByRole("textbox", { name: "password" }).fill("sekret");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await expect(page.getByText("razvan is logged in")).toBeVisible();
  });

  describe("when user is logged in", async () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("textbox", { name: "username" }).fill("root");
      await page.getByRole("textbox", { name: "password" }).fill("sekret");

      await page.getByRole("button", { name: "Login" }).click();
    });

    test("a new blog is created", async ({ page }) => {
      await page.getByRole("button", { name: "New Blog" }).click();

      await page
        .getByRole("textbox", { name: "title" })
        .fill("You don't know js");
      await page.getByRole("textbox", { name: "author" }).fill("Kyle Sympson");
      await page
        .getByRole("textbox", { name: "url" })
        .fill("https://example.com");
      await page.getByRole("button", { name: "Submit" }).click();

      await expect(
        page.getByText("You don't know js", { exact: true })
      ).toBeVisible();
    });
  });
});
