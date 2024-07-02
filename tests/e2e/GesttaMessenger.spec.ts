import { test, expect, chromium } from '@playwright/test'
import { LoginPage } from '/PlaywrightFinalTest/pageobjects/e2e/Onvio/loginOnvio.page';
import { OfficeManagementPage } from '/PlaywrightFinalTest/pageobjects/e2e/officeManagement.page';
import { CommonsOnvio } from '/PlaywrightFinalTest/pageobjects/e2e/Onvio/commonsOnvio.page';
import { Processos } from '/PlaywrightFinalTest/pageobjects/e2e/processos.page';
import { CommonGesttaMessenger } from '/PlaywrightFinalTest/pageobjects/e2e/GesttaMessenger/CommonGesttaMessenger.page';
import { GerenciarContatos } from '/PlaywrightFinalTest/pageobjects/e2e/GesttaMessenger/GerenciarContatos.page';
import { TelaConfiguracoesGestta } from '/PlaywrightFinalTest/pageobjects/e2e/GesttaMessenger/TelaConfiguracoesGestta';
import { stringify } from 'querystring';

const baseUrlDemoOnvio = "https://demo.onvio.com.br/";
const baseUrlGestta = "https://demo.onvio.com.br/br-messenger/";
const usernamegestta = "firm.management.e2e+escritorio0007@gmail.com";
const passwordgestta = "Teste!2021";
const username = "gestao.escritorio.e2e+demo.escritorio0001@gmail.com";
const password = "Teste!2021";
const endpoint = "/api/dominio/integration/v6/client";
const nome = "teste 01"
const area = "011"
const celular = "955445545"
let token: string;

test.only('Criação de um Novo Contato no Gestta Messenger', async ({ browser }) => {
    //Inicia nova página do Browser Chrome
    browser = await chromium.launch();
    const page = await browser.newPage();

    // **Validação de abertura do navegador:**
    if (browser) {
        console.log('Navegador aberto com sucesso!');
    } else {
        throw new Error('Falha ao abrir o navegador!');
    }

    //Inicialização de variáveis
    const loginPage = new LoginPage(page);
    const officeManagement = new OfficeManagementPage(page);
    const commonsOnvio = new CommonsOnvio(page);
    const processos = new Processos(page);
    const commonGesttaMessenger = new CommonGesttaMessenger(page);
    const gerenciarContatos = new GerenciarContatos(page);
    const telaConfiguracoesGestta = new TelaConfiguracoesGestta(page);

    // Acessar página e realiza o login
    await loginPage.goToPage(baseUrlDemoOnvio);
    await loginPage.login(usernamegestta, passwordgestta);
    await officeManagement.aguardarBotaoInicioEstarVisivel();

    // Abrir menu hamburguer e clicar em Messenger
    await commonsOnvio.clicarMenuHamburguer();
    await commonsOnvio.acessarMenuMessenger();

    await loginPage.goToPage(baseUrlGestta);
    await commonGesttaMessenger.validarSaudacaotextoSejaBemVindo();

    await commonGesttaMessenger.clicarmenuConfiguracoes();
    await telaConfiguracoesGestta.clicarbotaoGerenciarContatos();
    await gerenciarContatos.acessarbotaoCadastrar();
    await gerenciarContatos.cadastrarNovoContato(nome, area, celular);

});

test.only("Desativação/ativação de um Cliente existente no Onvio e validar no Gestta [3072200]", async ({browser}) => { 
    //Inicia nova página do Browser Chrome
    browser = await chromium.launch();
    const page = await browser.newPage();

    //Inicialização de variáveis
    const loginPage = new LoginPage(page);
    const officeManagement = new OfficeManagementPage(page);
    const commonsOnvio = new CommonsOnvio(page);
    const processos = new Processos(page);

    await loginPage.goToPage(baseUrlDemoOnvio);
    await loginPage.login(username, password);
    await officeManagement.aguardarBotaoInicioEstarVisivel();

    await commonsOnvio.clicarMenuHamburguer();
    await commonsOnvio.acessarMenuProcessos();
    await loginPage.goToPage("https://qa.gestta.com.br/dashboard-v2/#/dashboard-v2");
    await processos.validarSaudacao();


})

