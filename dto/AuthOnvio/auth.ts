import { APIRequestContext, request } from '@playwright/test';
import axios from 'axios';


export async function pegarTokenOnvio(baseUrlDemoOnvio: string, username: string, password: string): Promise<string> {
        try {
            const response = await axios.post(`${baseUrlDemoOnvio}/api/security/v1/sessions`, {
                username,
                password
            });
            return response.data.LongToken;

          } catch (error) {
            throw new Error(`Falha de autenticação: ${error}`);
          }
}

export async function pegarTokenJWT(baseUrlDemoOnvio: string, udsLongToken: string): Promise<string> {
    try {
        const response = await axios.post(`${baseUrlDemoOnvio}/api/security/v1/jwt/sessions`, {
            udsLongToken
        });
        return response.data.token;

      } catch (error) {
        throw new Error(`Falha de autenticação: ${error}`);
      }
}

//Pendente acertar essa parte
export async function pegarTokenGestta(jwt: string ): Promise<string> {
    axios.defaults.headers.common['accept'] = 'application/json, text/plain, */*';
    axios.defaults.headers.common['accept'] = 'application/json';
    axios.defaults.headers.common['accept'] = `application/json, text/plain, */*`;

    try {
        const response = await axios.post(`https://api.qa.gestta.com.br/messenger-dominio/auth`, {
            jwt
        });
        return "JWT" + response.data.token;

      } catch (error) {
        throw new Error(`Falha de autenticação: ${error}`);
      }
}

export async function configurarTokenRequestOnvio(token) {
    axios.defaults.headers.common['Authorization'] = `UDSLongToken ${token}`;
}

export async function configurarTokenRequestGestta(token) {
    axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
}
