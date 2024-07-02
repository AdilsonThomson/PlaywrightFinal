import { type Page } from '@playwright/test';

export class OfficeManagementPage {
    readonly page: Page;
    readonly inicioBtn = "[data-qe-id='Bluemoon.Shell.Navigation.Home']"

    constructor(page: Page) {
        this.page = page;
    }


    async aguardarBotaoInicioEstarVisivel() {
        await this.page.waitForSelector(this.inicioBtn)
    }
}