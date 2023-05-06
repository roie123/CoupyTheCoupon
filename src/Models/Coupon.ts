import {CategoryType} from "./Enums/CategoryType";


export class Coupon{
    id:number=0;
    title:string='';
    description:string='';
    startDate:Date=Date.prototype;
    endDate:Date=Date.prototype;
    amount:number=0;
    price :number =0;
    image:string='';
    category:CategoryType=CategoryType.StupidFace;
    /*
     private Long id;

    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private int amount;
    private double price;
    private String image;
     */

}