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

    async addCoupon(couponToAdd:Coupon):Promise<Coupon>{
        const  response = await axios.post<Coupon>(`${appConfig.companyApiUrl}/coupon`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async updateCoupon(couponToUpdate:Coupon,couponId:number):Promise<Coupon>{
        const  response = await axios.put<Coupon>(`${appConfig.companyApiUrl}/coupon/${couponId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async deleteCoupon(couponId:number):Promise<Coupon>{
        const  response = await axios.put<Coupon>(`${appConfig.companyApiUrl}/coupon/${couponId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async getCompanyCoupons():Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async getCompanyCouponsByCategory(category:CategoryType|string):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons/byCat/${category}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }
    async getCompanyCouponsByMaxPrice(maxPrice:number):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons/byMaxPrice/${maxPrice}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getCompanyDetails(companyId:number):Promise<CompanyDTO>{
        const  response = await axios.get<CompanyDTO>(`${appConfig.adminApiUrl}/getCompanyById/${companyId}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }



}