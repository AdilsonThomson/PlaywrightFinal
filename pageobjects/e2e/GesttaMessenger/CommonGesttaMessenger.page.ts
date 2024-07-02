import { expect, BrowserContext, Browser, type Page } from '@playwright/test';


export class CommonGesttaMessenger {
    readonly page: Page;
    readonly menuContatos = "[data-qe-id='attendance-tab-contact']";
    readonly botaoContatos = "[class*='react-tabs__tab react-tabs__tab--selected']";
    readonly botaoGrupos = "[id='react-tabs-8']";
    readonly botaoListas = "[id='react-tabs-10']";
    readonly menuPendentes = "[data-qe-id='attendance-tab-pending']";
    readonly menuEmatendimento = "[data-qe-id='attendance-tab-ongoing']";
    readonly botaofiltro = "[class='sc-kmiJQj ikBVDQ']";
    readonly botaoBuscarAtendimentos = "[class='sc-isexnS kSVVoh']";
    readonly menuChat = "[data-qe-id='gestta_menu-chat']";
    readonly menuHabilitarclientes = "[data-qe-id='gestta_menu-habilitar-clientes']";
    readonly menuVisaogeral = "[data-qe-id='gestta_menu-visao-geral']";
    readonly menuEscritorio = "[data-qe-id='gestta_menu-escritorio']";
    readonly menuFuncionarios = "[data-qe-id='gestta_menu-funcionarios']";
    readonly menuClientes = "[data-qe-id='gestta_menu-clientes']";
    readonly menuHistoricodeAtendimentos = "[data-qe-id='gestta_menu-historico-de-atendimentos']";
    readonly menuConfiguracoes = "[data-qe-id='gestta_menu-configuracoes']";
    readonly botaoAjuda = "[data-qe-id='gestta_messenger-web-new-chat-support-iframe-button']";
    readonly menuHamburguer = "[data-testid='suite-button']";
    readonly centraldeNotificacao = "[class*='c-feMfxb c-feMfxb-igSFetb-css']";
    readonly textoSejaBemVindo = "[class*='sc-kpDqfm jnjGBj']";
    readonly textoOlaNomedoUsuario = "[class*='sc-dhKdcB iXgkvG']";

    constructor(page: Page) {
        this.page = page;
    }

    async clicarmenuContatos() {
        await this.page.waitForSelector(this.menuContatos);
        await this.page.click(this.menuContatos);
    }

    async clicarbotaoContatos() {
        await this.page.waitForSelector(this.botaoContatos);
        await this.page.click(this.botaoContatos);
    }

    async clicarmenuPendentes() {
        await this.page.waitForSelector(this.menuPendentes);
        await this.page.click(this.menuPendentes);
    }

    async clicarmenuConfiguracoes() {
        await this.page.waitForSelector(this.menuConfiguracoes);
        await this.page.click(this.menuConfiguracoes);
    }

    async validarSaudacaotextoSejaBemVindo() {
        await this.page.waitForSelector(this.textoSejaBemVindo);
        expect(this.page.getByText("Seja bem vindo(a) ao")).toBeVisible;
    }

}