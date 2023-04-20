import {Coupon} from "./Coupon";


export class Customer{
id:number=0;
    firstName:string='';
    lastName:string='';
    email:string='';


    coupons:Coupon[]=[];
}

/*
  private Long id;

   private String firstName;

   private String lastName;

   private String email;
   private boolean isActive=true;

   private String password;
 */