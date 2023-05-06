import {Coupon} from "../Models/Coupon";
import axios, {AxiosResponse} from "axios";
import appConfig from "../Config/Config";
import {CategoryType} from "../Models/Enums/CategoryType";
import {Customer} from "../Models/Customer";
import {CouponSearchFilterTypes} from "../Models/Enums/CouponSearchFilterTypes";

export class CustomerService{

    private static instance: CustomerService;

    public static getInstance(): CustomerService {
        if (!CustomerService.instance) {
            CustomerService.instance = new CustomerService();
        }

        return CustomerService.instance;
    }
    async  purchaseCoupon(couponId: number, customerId: number): Promise<Coupon> {
        try {
            const response: AxiosResponse<Coupon> = await axios.put(
                `${appConfig.customerApiUrl}/purchaseCoupon/${couponId}/${customerId}`
            );
            return response.data as Coupon;
        } catch (error: unknown) {
            console.error(`Failed to purchase coupon ${couponId} for customer ${customerId}:`, error);
            throw error;
        }
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

//    /coupons/available

    async getMyAvailableCoupons():Promise<Coupon[]>{
        const  response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons/available`);
        console.log(response);
        return response.data;


    }


    public sortCoupons(coupons:Coupon[], filter:CouponSearchFilterTypes ){
        switch (filter){
            case CouponSearchFilterTypes.byId:
                return [...coupons.sort((a, b) => a.id - b.id)];
                break;
            case CouponSearchFilterTypes.byPrice:
                return [...coupons.sort((a, b) => a.price - b.price)];


                break;
            case CouponSearchFilterTypes.byCategory:
                return [...coupons.sort((a, b) => a.category.length - b.category.length)];

                break;


        }
        return []
    }
}