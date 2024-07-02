import { test, expect, APIRequestContext } from '@playwright/test'
import { configurarTokenRequestOnvio, pegarTokenOnvio, configurarTokenRequestGestta } from '/PlaywrightFinalTest/dto/AuthOnvio/auth';
import axios from 'axios'
import { GET, POST } from '/PlaywrightFinalTest/dto/Customer/customer';
import { GET_GESTTA } from '/PlaywrightFinalTest/dto/Customer/customerGestta';
let jsonCustomer = require('/PlaywrightFinalTest/JSON/customer.json');

import { validate } from 'jsonschema';

// Definir a URL da API e o payload
const urlpost = 'https://api.qa.gestta.com.br/messenger-admin/company/contact';
const urlget = 'https://api.qa.gestta.com.br/messenger-admin/company/contact?sort=name&page=1&limit=10&search=';
const urldelete = 'https://api.qa.gestta.com.br/messenger-admin/company/contact/66749395709d8dd87d2bb501';

const payload = {
    name: "teste5",
    phone_number: 55121231231238
};

const schema = {
    type: 'Object',
    properties: {
        // Defina as propriedades e seus tipos de dados aqui
        _id: { type: 'string' },
        name: { type: 'string' },
        phone_number: { type: 'number' },
        company: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
    },
    required: ['_id', 'name','phone_number', 'company','created_at', 'updated_at'], // Propriedades obrigatórias
    additionalProperties: true // Proibir propriedades não definidas no esquema
};

const { chromium } = require('playwright');

let tokenGestta = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ0ZGU5M2RmNTM5ODAwMGE1NjEwNzkiLCJuYW1lIjoiRVNDUklUT1JJTyA3IEZJUk0gTUFOQUdFTUVOVCIsImVtYWlsIjoiZmlybS5tYW5hZ2VtZW50LmUyZStlc2NyaXRvcmlvMDAwN0BnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsInBhcnRuZXJfY29uZmlnIjp7InBlcm1pc3Npb25zIjp7InNldHVwIjp0cnVlfX0sImNvbXBhbnkiOnsiX2lkIjoiNjFkNGRlOTNkZjUzOTgwMDBhNTYxMDczIiwibmFtZSI6IkVTQ1JJVE9SSU8gNyBGSVJNIE1BTkFHRU1FTlQiLCJjbnBqIjoiNDU4NTUwNzEwMDAxMDQiLCJleHRlcm5hbF9pZCI6IjAwNEJEMEZDN0MyQjQ0OTBBQzhDMjU0RUNEMkY4MkQwIn0sImlhdCI6MTcxOTk2MjA3NCwiZXhwIjoxNzIwMDQ4NDc0fQ.zuGxyJHOk2WqfazEmNUR8UwaIdZ6p7hWWIXRh7rJhS4"
axios.defaults.headers.common['Authorization'] = `${tokenGestta}`;

test('GET - Buscar a lista de Contatos no Gestta', async ({ context }) => {
    
    // Fazer uma requisição GET
    const response = await axios.get(urlget)
        .then(response => {
            const dadosJSON = response.data;

    // Validar o status code da resposta
    switch (response.status) {
        case 200:
            // Sucesso: Processar os dados da resposta
            console.log('Requisição bem-sucedida!');
            console.log(response.data);
            break;
        case 400:
            // Requisição mal formada: Tratar o erro
            console.error('Erro na requisição: ', response.data.message);
            break;
        case 401:
            // Não autorizado: Tratar o erro
            console.error('Não autorizado: ', response.data.message);
            break;
        case 403:
            // Proibido: Tratar o erro
            console.error('Proibido: ', response.data.message);
            break;
        default:
            // Status code inesperado: Tratar o erro
            console.error('Status code inesperado: ', response.status);
        }
        // Validação do JSON contra o esquema
        const validationResult = validate(dadosJSON, schema);

        if (validationResult.valid) {
            console.log('JSON válido!');
            // Processar os dados JSON validados
            console.log(dadosJSON);
        } else {
            console.error('JSON inválido!');
            console.error(validationResult.errors); // Exibir os erros de validação
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
});

test('Teste de API: POST com payload e validação de status', async ({ context: BrowserContext }) => {

    // Fazer a requisição POST com payload
    const response = await axios.post(urlpost, payload);

    // Validar o status code da resposta
    switch (response.status) {
        case 200:
            // Sucesso: Processar os dados da resposta
            console.log('Requisição bem-sucedida!');
            console.log(response.data);
            break;
        case 400:
            // Requisição mal formada: Tratar o erro
            console.error('Erro na requisição: ', response.data.message);
            break;
        case 401:
            // Não autorizado: Tratar o erro
            console.error('Não autorizado: ', response.data.message);
            break;
        case 403:
            // Proibido: Tratar o erro
            console.error('Proibido: ', response.data.message);
            break;
        default:
            // Status code inesperado: Tratar o erro
            console.error('Status code inesperado: ', response.status);
    }
});

test('Teste de API: DELETE', async ({ context }) => {

    // Fazer uma requisição delete
    const response = await axios.delete(urldelete);

    // Validar o status code da resposta
    switch (response.status) {
        case 200:
            // Sucesso: Processar os dados da resposta
            console.log('Requisição bem-sucedida!');
            console.log(response.data);
            break;
        case 400:
            // Requisição mal formada: Tratar o erro
            console.error('Erro na requisição: ', response.data.message);
            break;
        case 401:
            // Não autorizado: Tratar o erro
            console.error('Não autorizado: ', response.data.message);
            break;
        case 403:
            // Proibido: Tratar o erro
            console.error('Proibido: ', response.data.message);
            break;
        default:
            // Status code inesperado: Tratar o erro
            console.error('Status code inesperado: ', response.status);
    }

});