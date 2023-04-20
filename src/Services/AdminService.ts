import {CompanyDTO} from "../Models/Company";
import axios from "axios";
import appConfig from "../Config/Config";
import {Customer} from "../Models/Customer";

export class AdminService {
    private static instance: AdminService;

    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }

        return AdminService.instance;
    }


    async addCompany(companyToAdd:CompanyDTO):Promise<CompanyDTO>{
        const  response = await axios.post<CompanyDTO>(appConfig.adminApiUrl,companyToAdd);

        return response.data;


    }
    async updateCompany(companyToAdd:CompanyDTO,id:number):Promise<void>{
        const  response = await axios.put<CompanyDTO>(`${appConfig.adminApiUrl}/${id}`);



    }
    async deleteCompany(id:number):Promise<void>{
        const  response = await axios.delete<CompanyDTO>(`${appConfig.adminApiUrl}/deleteCompany/${id}`);



    }

    async getAllCompanies():Promise<CompanyDTO[]>{
        const  response = await axios.get<CompanyDTO[]>(`${appConfig.adminApiUrl}/companies`);
        return response.data;


    }
    async getSingleCompany(id:number):Promise<CompanyDTO>{
        const  response = await axios.get<CompanyDTO>(`${appConfig.adminApiUrl}/getCompanyById/${id}`);
        return response.data;


    }

    async addCustomer(customerToAdd:Customer):Promise<Customer>{
        const  response = await axios.post<Customer>(`${appConfig.adminApiUrl}/customer`);
        return response.data;

    }

    async updateCustomer(customerToAdd:Customer,id:number):Promise<Customer>{
        const  response = await axios.put<Customer>(`${appConfig.adminApiUrl}/customer/${id}`);
        return response.data;

    }

    async deleteCustomer(id:number):Promise<Customer>{
        const  response = await axios.delete<Customer>(`${appConfig.adminApiUrl}/customer/${id}`);
        return response.data;

    }

    async getAllCustomers():Promise<Customer[]>{
        const  response = await axios.get<Customer[]>(`${appConfig.adminApiUrl}/customer`);
        return response.data;

    }
    async getSingleCustomer(id:number):Promise<Customer[]>{
        const  response = await axios.get<Customer[]>(`${appConfig.adminApiUrl}/customer${id}`);
        return response.data;

    }



}