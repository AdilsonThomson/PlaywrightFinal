import { BrowserContext, Browser, type Page } from '@playwright/test';


export class CommonsOnvio {
    readonly page: Page;
    readonly menuHamburguer = "[class='bento-icon-hamburger-menu']";
    readonly menuProcessos = "[title='Processos']";
    readonly menuMessenger = "[title='Messenger']";

    constructor(page: Page) {
        this.page = page;
    }

    async clicarMenuHamburguer() {
        await this.page.click(this.menuHamburguer);
    }

    async acessarMenuProcessos() {
        await this.page.waitForSelector(this.menuProcessos);
        await this.page.click(this.menuProcessos);
    }

    async acessarMenuMessenger() {
        await this.page.waitForSelector(this.menuMessenger);
        await this.page.click(this.menuMessenger);
    }

}