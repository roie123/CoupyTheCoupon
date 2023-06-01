import axios, {AxiosError, AxiosResponse} from "axios";
import appConfig from "../Config/Config";
import jwt_decode from 'jwt-decode'

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

interface TokenResponse{
    token:string
}

export async function customerLogin(loginRequest: LoginRequestDTO): Promise<boolean> {
    try {
        const response: AxiosResponse<TokenResponse> = await axios.post<TokenResponse>(`${appConfig.authApiUrl}/login`, loginRequest);

        console.log("ssssss");
        let shittyToken :TokenResponse= response.data;

        const secretKey = '1234';

        let username:string=jwt_decode(shittyToken.token);
        // @ts-ignore
        localStorage.setItem('userName' ,username.userName.toString().substring(0,username.userName.toString().indexOf('@')) )

        localStorage.setItem('token', shittyToken.token);
        // localStorage.setItem('tokendecoded', token);

        return true
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            return error.response.status.toString();
        }
        throw error;
    }
}