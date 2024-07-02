import { type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly firstSignInBtn = "[id='trauth-continue-signin-btn']";
    readonly secondSignInBtn = "[type='submit']";
    readonly userInput = "[id='username']";
    readonly passwordInput = "[id='password']";

    constructor(page: Page) {
        this.page = page;
    }

    async goToPage(url: string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.page.waitForSelector(this.firstSignInBtn);
        await this.page.click(this.firstSignInBtn);
        await this.page.fill(this.userInput, username);
        await this.page.click(this.secondSignInBtn);
        await this.page.waitForSelector(this.passwordInput);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.secondSignInBtn);
    }
}