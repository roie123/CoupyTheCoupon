import {CompanyDTO} from "../Models/Company";
import appConfig from "../Config/Config";
import {Coupon} from "../Models/Coupon";
import {CategoryType} from "../Models/Enums/CategoryType";
import axios from "axios";
import store from "../Redux/store";
import {ErrorMessage} from "../Models/ErrorMessage";
import {sendResponseAsErrorMessage} from "./AdminService";

export class CompanyService {
    private static instance: CompanyService;

    public static getInstance(): CompanyService {
        if (!CompanyService.instance) {
            CompanyService.instance = new CompanyService();
        }

        return CompanyService.instance;
    }

    async doSomethi() {

    }

    async addCoupon(couponToAdd: Coupon): Promise<number | ErrorMessage> {
        try {
            const response = await axios.post<number>(`${appConfig.companyApiUrl}/coupon`, couponToAdd,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return response.data;
        } catch (error) {
            return sendResponseAsErrorMessage(error)
        }


    }

    async updateCoupon(couponToUpdate: Coupon, couponId: number): Promise<ErrorMessage> {
        try {
            const response = await axios.put<ErrorMessage>(`${appConfig.companyApiUrl}/coupon/${couponId}`,
                couponToUpdate,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return new ErrorMessage();

        }catch (error){
            return sendResponseAsErrorMessage(error)

        }


    }

    async deleteCoupon(couponId: number): Promise<ErrorMessage> {
        try {
            const response = await axios.delete<ErrorMessage>(`${appConfig.companyApiUrl}/coupon/${couponId}`,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
            return response.data;
        }catch (error){
            return sendResponseAsErrorMessage(error)

        }



    }

    async getCompanyCoupons(): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getCompanyCouponsByCategory(category: CategoryType | string): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons/byCat/${category}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getCompanyCouponsByMaxPrice(maxPrice: number): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`${appConfig.companyApiUrl}/getCoupons/byMaxPrice/${maxPrice}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getCompanyDetails(): Promise<CompanyDTO> {
        const response = await axios.get<CompanyDTO>(`${appConfig.companyApiUrl}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }


}