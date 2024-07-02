import { expect, type Page } from '@playwright/test';

export class Processos {
    readonly page: Page;
    readonly saudacoes = "[id='sublabel']"

    constructor(page: Page) {
        this.page = page;
    }

    async validarSaudacao() {
        await this.page.waitForSelector(this.saudacoes);
        expect(this.page.getByText("Seja bem-vindo(a) à sua dashboard.")).toBeVisible;
        expect(this.page.getByText("Aqui está o histórico de atividades do seu escritório.")).toBeVisible;
        expect(this.page.getByText("Você pode filtrar e visualizar as tarefas.")).toBeVisible;
    }
}