import { BrowserContext, Browser, type Page } from '@playwright/test';


export class GerenciarContatos {
    readonly page: Page;
    readonly botaoVoltar = "[class='c-xabGh c-xabGh-cCgOCA-theme-ONVIO c-xabGh-gHSfTu-size-small c-xabGh-gCTusx-onlyIcon-true c-xabGh-hNvnHY-cv c-xabGh-dadETR-cv c-xabGh-ijQKqXo-css']";
    readonly botaoCadastrar = "[class='sc-iYRRFf fdqfvW']";
    readonly contagemdosContatos = "[class='sc-heNFcO fmBgPz']";
    readonly campodeBusca = "[class='sc-QKHsU jmrDsq']";
    readonly colunaNome = "[class='sc-hfAwGc jqALIl']";
    readonly colunaTelefone = "[class='sc-hfAwGc jqALIl']";
    readonly colunaCriadoEm = "[class='sc-hfAwGc jqALIl']";
    readonly camponome = "[name='name']";
    readonly campoarea = "[name='area_code']";
    readonly campocelular = "[name='phone_number']";
    readonly botaoConfirmar = "[class='c-xabGh c-xabGh-cCgOCA-theme-ONVIO c-xabGh-cwKLDw-size-large c-xabGh-hRnWDr-cv c-xabGh-ijQKqXo-css']";
    readonly botaoCancelar = "[class='c-xabGh c-xabGh-cCgOCA-theme-ONVIO c-xabGh-cwKLDw-size-large c-xabGh-fZFTZH-cv c-xabGh-ijQKqXo-css']";
    readonly textocriadoem = "[class='sc-jLTGeu YnWvB']";


    constructor(page: Page) {
        this.page = page;
    }

    async clicarbotaoVoltar() {
        await this.page.waitForSelector(this.botaoVoltar);
        await this.page.click(this.botaoVoltar);
    }

    async acessarbotaoCadastrar() {
        await this.page.waitForSelector(this.botaoCadastrar);
        await this.page.click(this.botaoCadastrar);
    }

    async cadastrarNovoContato(nome: string, area: string, celular: string) {
        await this.page.fill(this.camponome, nome);
        await this.page.fill(this.campoarea, area);
        await this.page.fill(this.campocelular, celular);
        await this.page.click(this.botaoConfirmar);
    }


}