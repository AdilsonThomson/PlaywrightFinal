import { test, expect, chromium } from '@playwright/test'
import { LoginPage } from '/PlaywrightFinalTest/pageobjects/e2e/Onvio/loginOnvio.page';
import { OfficeManagementPage } from '/PlaywrightFinalTest/pageobjects/e2e/officeManagement.page';
import { CommonsOnvio } from '/PlaywrightFinalTest/pageobjects/e2e/Onvio/commonsOnvio.page';
import { Processos } from '/PlaywrightFinalTest/pageobjects/e2e/processos.page';

const baseUrlDemoOnvio = "https://demo.onvio.com.br/";
const username = "gestao.escritorio.e2e+demo.escritorio0001@gmail.com";
const password = "Teste!2021";
const endpoint = "/api/dominio/integration/v6/client";
let token: string;


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