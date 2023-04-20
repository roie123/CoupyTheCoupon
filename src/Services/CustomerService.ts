import {Coupon} from "../Models/Coupon";
import axios from "axios";
import appConfig from "../Config/Config";
import {CategoryType} from "../Models/Enums/CategoryType";
import {Customer} from "../Models/Customer";

export class CustomerService{


    async purchaseCoupon(couponId:number,customerId:number):Promise<void>{
        const  response = await axios.put<void>(`${appConfig.customerApiUrl}/purchaseCoupon/${couponId}/${customerId}`);
        return response.data;


    }
    async getMyCoupons(customerId:number):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons/${customerId}`);
        return response.data;


    }
    async getMyCouponsByCategory(customerId:number,category:CategoryType):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons/byCat/${customerId}/${category}`);
        return response.data;


    }
    async getMyCouponsByMaxPrice(customerId:number,max:number):Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons/byCat/${customerId}/${max}`);
        return response.data;


    }

    async getMyDetails(customerId:number):Promise<Customer>{
        const  response = await axios.get<Customer>(`${appConfig.adminApiUrl}/customer/${customerId}`);
        return response.data;


    }

}