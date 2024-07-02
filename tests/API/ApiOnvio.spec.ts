import { test, expect } from '@playwright/test'
import { configurarTokenRequestOnvio, pegarTokenOnvio, configurarTokenRequestGestta } from '/PlaywrightFinalTest/dto/AuthOnvio/auth';
import axios from 'axios'
import { GET, POST } from '/PlaywrightFinalTest/dto/Customer/customer';
import { GET_GESTTA } from '/PlaywrightFinalTest/dto/Customer/customerGestta';
let jsonCustomer = require('/PlaywrightFinalTest/JSON/customer.json');

const endpointBuscClientesOnvio = "/api/dominio/integration/v2/client?itemsPerPage=1000";
const endpointCriacaoUsuario = "/api/dominio/integration/v6/client";
const endpointBuscaClientesGestta = "/admin/customer?active=true&limit=15&page=1&search=Teste+Ana";
const urlBaseApiGestta = "https://api.qa.gestta.com.br"

let tokenGestta = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMWMxODAwMmYyYzAwMDc5ZDBhY2UiLCJuYW1lIjoiRXNjcml0b3JpbyAxIEdlc3RhbyBFc2NyaXRvcmlvIiwiY29tcGFueV9kZXBhcnRtZW50cyI6WyI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOTAiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOTEiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGUiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGYiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGMiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGQiXSwicm9sZSI6IlJPTEVfQURNSU4iLCJhY3RpdmUiOnRydWUsImVtYWlsIjoiZ2VzdGFvLmVzY3JpdG9yaW8uZTJlK2RlbW8uZXNjcml0b3JpbzAwMDFAZ21haWwuY29tIiwidmlld2VyIjpmYWxzZSwiY29tcGFueSI6eyJfaWQiOiI2NjNlMWMxNjAwMmYyYzAwMDc5ZDAzNWQiLCJuYW1lIjoiRVNDUklUT1JJTyAxIEdFU1RBTyBFU0NSSVRPUklPIiwic3RhdHVzIjoiSU1QTEFOVEFUSU9OIiwibGFuZ3VhZ2UiOiJwdC1CUiIsImNucGoiOiI5MTUwODk2ODAwMDE4OSJ9LCJpYXQiOjE3MTg5MTA3NTksImV4cCI6MTcxODk5NTM1OX0.OEK32gz-3hFwXDTKP6ZLNQvVM9ZNwMtqpIIIuHAX-go"

test('GET - Buscar a lista de clientes no Onvio', async () => {
    const url_onvio_demo = "https://demo.onvio.com.br";
    const username = "gestao.escritorio.e2e+demo.escritorio0001@gmail.com";
    const password = "Teste!2021";

    // Obtém o token antes de fazer a requisição
    const udsLongToken = await pegarTokenOnvio(url_onvio_demo, username, password);

    // Atualiza o cabeçalho de autorização com o token obtido
    axios.defaults.headers.common['Authorization'] = `UDSLongToken ${udsLongToken}`;

    try {
        // Enviar a requisição GET para o endpoint de lista de clientes
        const response = await axios.get(`${url_onvio_demo}${endpointBuscClientesOnvio}`);

        // Verificar se a requisição foi bem-sucedida
        const emailExists = response.data.items.some(client => client.email === username);
        console.log(response.data);
        expect(emailExists).toBe(true); // Verifica se o email existe

    } catch (error) {
        console.error("Ocorreu um erro: " + error); // Mostra o erro no console se ocorrer
    }
});

test('GET - Buscar a lista de clientes no Gestta', async () => {
    // Atualiza o cabeçalho de autorização com o token obtido
    let tokenGestta = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMWMxODAwMmYyYzAwMDc5ZDBhY2UiLCJuYW1lIjoiRXNjcml0b3JpbyAxIEdlc3RhbyBFc2NyaXRvcmlvIiwiY29tcGFueV9kZXBhcnRtZW50cyI6WyI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOTAiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOTEiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGUiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGYiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGMiLCI2NjNlMWMxNzAwMmYyYzAwMDc5ZDAzOGQiXSwicm9sZSI6IlJPTEVfQURNSU4iLCJhY3RpdmUiOnRydWUsImVtYWlsIjoiZ2VzdGFvLmVzY3JpdG9yaW8uZTJlK2RlbW8uZXNjcml0b3JpbzAwMDFAZ21haWwuY29tIiwidmlld2VyIjpmYWxzZSwiY29tcGFueSI6eyJfaWQiOiI2NjNlMWMxNjAwMmYyYzAwMDc5ZDAzNWQiLCJuYW1lIjoiRVNDUklUT1JJTyAxIEdFU1RBTyBFU0NSSVRPUklPIiwic3RhdHVzIjoiSU1QTEFOVEFUSU9OIiwibGFuZ3VhZ2UiOiJwdC1CUiIsImNucGoiOiI5MTUwODk2ODAwMDE4OSJ9LCJpYXQiOjE3MTg5MTA3NTksImV4cCI6MTcxODk5NTM1OX0.OEK32gz-3hFwXDTKP6ZLNQvVM9ZNwMtqpIIIuHAX-go"
    axios.defaults.headers.common['Authorization'] = tokenGestta;

    try {
        // Enviar a requisição GET para o endpoint de lista de clientes
        const response = await axios.get("https://api.qa.gestta.com.br/admin/customer?active=true&limit=15&page=1&search=");

        // Verificar se a requisição foi bem-sucedida
        console.log(response.data);

    } catch (error) {
        console.error("Ocorreu um erro: " + error); // Mostra o erro no console se ocorrer
    }
});

test('POST - Cadastrar um novo Customer no Onvio e validar no Onvio Processos', async () => {
    const url_onvio_demo = "https://demo.onvio.com.br";
    const username = "gestao.escritorio.e2e+demo.escritorio0001@gmail.com";
    const password = "Teste!2021";

    //INFORMAÇÕES DE AUTORIZAÇÃO DE REQUISIÇÃO
    // Obtém o token antes de fazer a requisição
    const udsLongToken = await pegarTokenOnvio(url_onvio_demo, username, password);
    // Atualiza o cabeçalho de autorização com o token obtido
    await configurarTokenRequestOnvio(udsLongToken);

    //PREPARA O JSON COM AS INFORMAÇÕES DESEJADAS
    jsonCustomer.codigo = "100";
    jsonCustomer.razaoSocial = "Teste Ana";
    jsonCustomer.nomeFantasia = "Teste Ana";
    jsonCustomer.apelido = "Teste Ana";
    jsonCustomer.email = "gestao.escritorio.e2e+demo.testeAna@gmail.com";
    jsonCustomer.inscricaoFederal = "11.677.350/0001-03";

    //REALIZA A CRIAÇÃO DO USUÁRIO NO ONVIO
    await POST(url_onvio_demo, endpointCriacaoUsuario, jsonCustomer)

    //BUSCA LISTA DE USUÁRIO NO ONVIO
    let response = await GET(url_onvio_demo, endpointBuscClientesOnvio);
    //VALIDAÇÃO SE O USUÁRIO EXISTE
    const emailExists = response.items.some(client => client.email === jsonCustomer.email);
    expect(emailExists).toBe(true); // Verifica se o email existe

    //AQUI PRECISAMOS INFORMAR O TOKEN DA GESTTA
    await configurarTokenRequestGestta(tokenGestta);

    //ESSA PARTE VERIFICA NO PROCESSO SE O CLIENTE EXISTE E ESTÁ ATIVO
    response = await GET_GESTTA(urlBaseApiGestta, endpointBuscaClientesGestta);
    const clientExists = response.docs.some(client => client.name === response.docs[0].name);
    expect(clientExists).toBe(true); // Verifica se o usuário existe

})


