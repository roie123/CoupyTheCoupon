import {CompanyDTO} from "../Models/Company";
import axios from "axios";
import appConfig from "../Config/Config";
import {Customer} from "../Models/Customer";
import store from "../Redux/store";

export class AdminService {
    private static instance: AdminService;

    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }

        return AdminService.instance;
    }


    async addCompany(companyToAdd: CompanyDTO): Promise<CompanyDTO> {
        const response = await axios.post<CompanyDTO>(appConfig.adminApiUrl, companyToAdd,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});

        return response.data;


    }

    async updateCompany(companyToAdd: CompanyDTO, id: number): Promise<void> {
        const response = await axios.put<CompanyDTO>(`${appConfig.adminApiUrl}/${id}`,
            companyToAdd, {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});


    }

    async deleteCompany(id: number): Promise<void> {
        const response = await axios.delete<CompanyDTO>(`${appConfig.adminApiUrl}/deleteCompany/${id}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});


    }

    async getAllCompanies(): Promise<CompanyDTO[]> {
        const response = await axios.get<CompanyDTO[]>(`${appConfig.adminApiUrl}/companies`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getSingleCompany(id: number): Promise<CompanyDTO> {
        const response = await axios.get<CompanyDTO>(`${appConfig.adminApiUrl}/getCompanyById/${id}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async addCustomer(customerToAdd: Customer): Promise<Customer> {
        const response = await axios.post<Customer>(`${appConfig.adminApiUrl}/customer`, customerToAdd,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;

    }

    async updateCustomer(customerToAdd: Customer, id: number): Promise<Customer> {
        const response = await axios.put<Customer>(`${appConfig.adminApiUrl}/customer/${id}`, customerToAdd,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;

    }

    async deleteCustomer(id: number): Promise<Customer> {
        const response = await axios.delete<Customer>(`${appConfig.adminApiUrl}/customer/${id}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;

    }

    async getAllCustomers(): Promise<Customer[]> {
        const response = await axios.get<Customer[]>(`${appConfig.adminApiUrl}/customer`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;

    }

    async getSingleCustomer(id: number): Promise<Customer> {
        const response = await axios.get<Customer>(`${appConfig.adminApiUrl}/customer/${id}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;

    }


}