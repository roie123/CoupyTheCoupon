import {Coupon} from "../Models/Coupon";
import axios, {AxiosResponse} from "axios";
import appConfig from "../Config/Config";
import {CategoryType} from "../Models/Enums/CategoryType";
import {Customer} from "../Models/Customer";
import {CouponSearchFilterTypes} from "../Models/Enums/CouponSearchFilterTypes";
import store from "../Redux/store";

export class CustomerService {

    private static instance: CustomerService;

    public static getInstance(): CustomerService {
        if (!CustomerService.instance) {
            CustomerService.instance = new CustomerService();
        }

        return CustomerService.instance;
    }

    async purchaseCoupon(couponId: number): Promise<number> {
        console.log(couponId);
        try {
            const response: AxiosResponse<number> = await axios.put(
                `http://localhost:8080/api/customer/purchaseCoupon/${couponId}`,null,
                {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}}
            );
            return response.data as number ;
        } catch (error: unknown) {
            console.error(error);
            throw error;
        }
    }
    //    @PutMapping("/purchaseCoupon/{couponId}")
    async getMyCoupons(): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getMyCouponsByCategory( category: CategoryType): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons/byCat/${category}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getMyCouponsByMaxPrice(max: number): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons/byMax/${max}`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

    async getMyDetails(): Promise<Customer> {
        const response = await axios.get<Customer>(`${appConfig.adminApiUrl}/customer`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        return response.data;


    }

//    /coupons/available

    async getMyAvailableCoupons(): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`${appConfig.customerApiUrl}/coupons/available`,
            {headers: {"Authorization": "Bearer " + store.getState().authReducer.token}});
        console.log(response);
        return response.data;


    }


    public sortCoupons(coupons: Coupon[], filter: CouponSearchFilterTypes) {
        switch (filter) {
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