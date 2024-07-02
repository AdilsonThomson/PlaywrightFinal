import { BrowserContext, Browser, type Page } from '@playwright/test';


export class TelaConfiguracoesGestta {
    readonly page: Page;
    readonly botaoGerenciarContatos = "[title='Gerenciar contatos']";
    readonly botaoGerenciarFuncionarios = "[title='Gerenciar funcionários']";
    readonly botaoAssistenteVirtual = "[title='Assistente Virtual']";
    readonly botaoAgendamentodeMensagens = "[title='Agendamento de mensagens']";
    readonly botaoDistribuicao = "[title='Distribuição']";
    readonly botaoRespostasPadrao = "[title='Respostas padrão']";
    readonly botaoPesquideSatisfacao = "[title='Pesquisa de satisfação']";
    readonly botaoIdentificacaodoFuncionario = "[title='Identificação do funcionário']";
    readonly botaoRestricaodeMensagens = "[title='Restrição de mensagens']";
    readonly botaoConfiguracaodoCelular = "[title='Configuração do celular']";
    readonly menuConfiguracoes = "[data-qe-id='gestta_menu-configuracoes']";

    constructor(page: Page) {
        this.page = page;
    }

    async clicarbotaoGerenciarContatos() {
        await this.page.waitForSelector(this.botaoGerenciarContatos);
        await this.page.click(this.botaoGerenciarContatos);
    }

    async acessarbotaoGerenciarFuncionarios() {
        await this.page.waitForSelector(this.botaoGerenciarFuncionarios);
        await this.page.click(this.botaoGerenciarFuncionarios);
    }

}