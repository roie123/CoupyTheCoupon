import axios, {AxiosError, AxiosResponse} from "axios";
import appConfig from "../Config/Config";
import jwt_decode from 'jwt-decode'
import store from "../Redux/store";
import {registerAction} from "../Redux/AuthState";

export enum AuthClientTypes {
    Admin = 'Admin',
    Company = 'Company',
    Customer = 'Customer'
}

export interface LoginRequestDTO {
    userName: string,
    password: string,
    clientType: AuthClientTypes
}

interface TokenResponse {
    token: string
}

export async function customerLogin(loginRequest: LoginRequestDTO): Promise<string> {
    try {
        const response: AxiosResponse<TokenResponse> = await axios.post<TokenResponse>(`${appConfig.authApiUrl}/login`, loginRequest);

        let shittyToken: TokenResponse = response.data;


        let username: string = jwt_decode(shittyToken.token);
        // @ts-ignore
        if (username.role === 'Customer') {
            // @ts-ignore
            localStorage.setItem('userName', username.userName.toString().substring(0, username.userName.toString().indexOf('@')))
            localStorage.setItem('token', shittyToken.token);
            store.dispatch(registerAction(shittyToken.token));
            return 'nice';
        }

        return 'Wrong Client Type';

    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            return error.response.status.toString();
        }
        throw error;
    }
}





