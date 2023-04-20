import {Coupon} from "./Coupon";


export class  CompanyDTO{
    id: number =0;
    name:string='';
    email:string='';


    couponList:Coupon[]=[];
}