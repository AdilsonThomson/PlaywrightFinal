import { APIRequestContext, request } from '@playwright/test';
import axios from 'axios';
import { pegarTokenOnvio, configurarTokenRequestOnvio } from '../AuthOnvio/auth'

/**
 * Função para enviar uma requisição tipo GET no Onvio
 * @param urlBase - Informar URL base - Ex: demo.onvio.com.br
 * @param endpoint - Informar o endpoint desejado
 * @param username - Informar o usuário para adquirirmos o token
 * @param password - Informar a senha para adquirirmos o token
 * @returns - Retorna a listagem desejada
 */

export async function GET_GESTTA(urlBase, endpoint) {
    try {        
        
        const response = await axios.get(`${urlBase}${endpoint}`);
        console.log(response.data);
        return response.data;

    } catch (error) {

        console.error("Não foi possível retornar a listagem " + error);
        throw error;
    }
}