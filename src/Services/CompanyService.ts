import {CompanyDTO} from "../Models/Company";
import appConfig from "../Config/Config";
import {Coupon} from "../Models/Coupon";
import {CategoryType} from "../Models/Enums/CategoryType";
import axios from "axios";
import store from "../Redux/store";

export class CompanyService {
    private static instance: CompanyService;

    public static getInstance(): CompanyService {
        if (!CompanyService.instance) {
            CompanyService.instance = new CompanyService();
        }

        return CompanyService.instance;
    }

async doSomethi(){

}

    async addCoupon(couponToAdd:Coupon,companyId:number):Promise<Coupon>{
        const  response = await axios.post<Coupon>(`${appConfig.companyApiUrl}/coupon/${companyId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async updateCoupon(couponToUpdate:Coupon,couponId:number,companyId:number):Promise<Coupon>{
        const  response = await axios.put<Coupon>(`${appConfig.companyApiUrl}/coupon/${couponId}/${companyId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async deleteCoupon(couponId:number,companyId:number):Promise<Coupon>{
        const  response = await axios.put<Coupon>(`${appConfig.companyApiUrl}/coupon/${couponId}/${companyId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async getCompanyCoupons(companyId:number):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons/${companyId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async getCompanyCouponsByCategory(companyId:number,category:CategoryType|string):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons/byCat/${companyId}/${category}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async getCompanyCouponsByMaxPrice(companyId:number,maxPrice:number):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons/byMaxPrice/${companyId}/${maxPrice}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getCompanyDetails(companyId:number):Promise<CompanyDTO>{
        const  response = await axios.get<CompanyDTO>(`${appConfig.adminApiUrl}/getCompanyById/${companyId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }



}