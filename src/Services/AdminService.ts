import {CompanyDTO} from "../Models/Company";
import axios, {AxiosError} from "axios";
import appConfig from "../Config/Config";
import {Customer} from "../Models/Customer";
import store from "../Redux/store";
import {Simulate} from "react-dom/test-utils";
import {ErrorMessage} from "../Models/ErrorMessage";
import {AdminActionType, AdminState} from "../Redux/AdminState";
import {Coupon} from "../Models/Coupon";

export class AdminService {
    private static instance: AdminService;

    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }

        return AdminService.instance;
    }


    async addCompany(companyToAdd: CompanyDTO): Promise<ErrorMessage> {
        try {
            const response = await axios.post<CompanyDTO>(
                appConfig.adminApiUrl,
                companyToAdd,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}}
            );
            let adminFromStore:AdminState = {...store.getState().adminReducer};
            adminFromStore.companies = [...adminFromStore.companies , companyToAdd];
            store.dispatch({type : AdminActionType.SetAdminState , payload:adminFromStore})
            return new ErrorMessage();
        } catch (error) {
            return sendResponseAsErrorMessage(error);
        }

    }

    sendResponseAsErrorMessage(error: unknown): ErrorMessage {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorMessage>;

            if (axiosError.response) {
                return axiosError.response.data;
            }
        }

        return new ErrorMessage();
    }

    async updateCompany(companyToAdd: CompanyDTO, id: number): Promise<ErrorMessage> {
        try {
            const response = await axios.put<CompanyDTO>(`${appConfig.adminApiUrl}/${id}`,
                companyToAdd, {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return new ErrorMessage();

        } catch (error) {
            return this.sendResponseAsErrorMessage(error);

        }


    }

    async deleteCompany(id: number): Promise<ErrorMessage> {
        try {
            const response = await axios.delete<CompanyDTO>(`${appConfig.adminApiUrl}/deleteCompany/${id}`,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return new ErrorMessage();


        } catch (error) {
            return this.sendResponseAsErrorMessage(error);

        }

    }

    async getAllCompanies(page: number, size: number): Promise<CompanyDTO[]> {


        const response = await axios.get<CompanyDTO[]>(`${appConfig.adminApiUrl}/companies/${page}/${size}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}})
            .catch(error => {
                throw  error;
            });
        // @ts-ignore
        return response.data.content;


    }

    async getSingleCompany(id: number): Promise<CompanyDTO|ErrorMessage> {
        try{
            const response = await axios.get<CompanyDTO>(`${appConfig.adminApiUrl}/getCompanyById/${id}`,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return response.data;
        }catch (error){
            return this.sendResponseAsErrorMessage(error);

        }



    }

    async addCustomer(customerToAdd: Customer): Promise<number|ErrorMessage> {
        try {
            const response = await axios.post<number>(`${appConfig.adminApiUrl}/customer`, customerToAdd,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}})
                .catch(error => {
                    throw error;
                });

            return response.data;
        }catch (error){
            return this.sendResponseAsErrorMessage(error);

        }


    }

    async updateCustomer(customerToAdd: Customer, id: number): Promise<ErrorMessage|void
        > {
        try {
            const response = await axios.put<Customer>(`${appConfig.adminApiUrl}/customer/${id}`, customerToAdd,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        }catch (error){
            return this.sendResponseAsErrorMessage(error);

        }


    }

    async deleteCustomer(id: number): Promise<void|ErrorMessage> {
        try {
            const response = await axios.delete<Customer>(`${appConfig.adminApiUrl}/customer/${id}`,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        }catch (error){
            return this.sendResponseAsErrorMessage(error);

        }


    }

    async getAllCustomers(): Promise<Customer[]> {
        const response = await axios.get<Customer[]>(`${appConfig.adminApiUrl}/customer`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;

    }

    async getSingleCustomer(id: number): Promise<Customer|ErrorMessage> {
        try {
            const response = await axios.get<Customer>(`${appConfig.adminApiUrl}/customer/${id}`,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return response.data;
        }catch (error){
            return this.sendResponseAsErrorMessage(error);

        }



    }
    async getCustomers(page:number): Promise<Customer[]> {
        try {
            const response = await axios.get<Customer[]>(`${appConfig.adminApiUrl}/customer/byPage/${page}`,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return response.data;
        } catch (error) {
            return [];

        }
    }
    async getNewCoupons(page:number): Promise<Coupon[]> {
        try {
            const response = await axios.get<Coupon[]>(`http://localhost:8080/welcome/coupons/${page}/10`);
            return response.data;
        }catch (error){
       return [];
        }


    }

}
export function  sendResponseAsErrorMessage(error: unknown): ErrorMessage {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorMessage>;

        if (axiosError.response) {
            return axiosError.response.data;
        }
    }

    return new ErrorMessage();
}