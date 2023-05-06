import './CompanyPage.css'
import {CompanyActionTypes} from "../../Models/Enums/CompanyActionTypes";
import CompanyActionSelection from "./Company Dumb Shits/CompanyActionSelection";
import {Coupon} from "../../Models/Coupon";
import {useEffect, useState} from "react";
import CompanyCouponActions from "./Company Dumb Shits/CompanyCouponActions";
import CompanyCoupons from "./Company Dumb Shits/CompanyCoupons";
import {CompanyService} from "../../Services/CompanyService";
import {CouponFilterTypes} from "../../Models/Enums/CouponFilterTypes";
import {CategoryType} from "../../Models/Enums/CategoryType";
import CompanyDetails from "./Company Dumb Shits/CompanyDetails";
import {CompanyDTO} from "../../Models/Company";

export default function CompanyPage() {
    const [displayedActionSelection, setdisplayedActionSelection] = useState<number>(0);
    const [maxPrice,setmaxPrice] =useState<number>(0);
    const [currentCompany,setcurrentCompany] =useState<CompanyDTO>();
    useEffect(()=> {
    setData();
    }, [])
    
    async function setData(){
        setcurrentCompany(await companyService.getCompanyDetails(330));
    }
    console.log(currentCompany);
    const companyService: CompanyService = CompanyService.getInstance();

    async function handleCompanyActionSelection(action: CompanyActionTypes) {

        switch (action) {
            case CompanyActionTypes.AddCoupon:
                setdisplayedActionSelection(1);
                console.log("Hi");

                break;
            case CompanyActionTypes.UpdateCoupon:
                setdisplayedActionSelection(2);

                break;
            case CompanyActionTypes.DeleteCoupon:
                setdisplayedActionSelection(3);

                break;
            case CompanyActionTypes.GetCoupons:
                await getCompanyCoupons(CouponFilterTypes.None);
                setdisplayedActionSelection(4);
                break;
            case CompanyActionTypes.GetCouponsByCategory:
                setdisplayedActionSelection(5);
                break;
            case CompanyActionTypes.GetCouponsByPrice:
                setdisplayedActionSelection(6);
                break;
            case CompanyActionTypes.GetCompanyDetails:
                setdisplayedActionSelection(7);

                break;
            case CompanyActionTypes.GoBackToSelection:
                setdisplayedActionSelection(0);
                break;

        }

    }


    ///COMPANY COUPONS LOGIC ///////////////////////////


    function onSubmitFormCoupon(data: Coupon) {

    }

    ///COMPANY COUPONS LOGIC ///////////////////////////


    ////////////GET COMPANY COUPONS ///////////////////////////

    //TODO make the logged in company the one who actually gets called
    const [companyCoupons, setcompanyCoupons] = useState<Coupon[]>([]);


    async function getCompanyCoupons(filter: CouponFilterTypes, maxPrice?: number, category?: CategoryType) {

        switch (filter) {
            case CouponFilterTypes.None: {
                const coupons: Coupon[] = await companyService.getCompanyCoupons(330);
                setcompanyCoupons(coupons);
                break;
            }
            case CouponFilterTypes.ByMaxPrice: {
                const coupons: Coupon[] = await companyService.getCompanyCouponsByMaxPrice(330, maxPrice!);
                setcompanyCoupons(coupons);
                break;

            }
            case CouponFilterTypes.ByCategory: {
                const coupons: Coupon[] = await companyService.getCompanyCouponsByCategory(330, category!);
                setcompanyCoupons(coupons);
                break;

            }

        }


    }




    const categories = Object.values(CategoryType);

    async  function handleChangeInSelectedCategory(categoryInString:string){
        //TODO if redux already has the coupons pull from there

     setcompanyCoupons(await  companyService.getCompanyCouponsByCategory(330,categoryInString))

    }
    async  function handleChangeInMaxPrice(maxPrice:number){
        //TODO if redux already has the coupons pull from there
    console.log("hi");
      setcompanyCoupons( await companyService.getCompanyCouponsByMaxPrice(330,maxPrice));

    }











    ////////////GET COMPANY COUPONS ///////////////////////////
    return (
        <>
            <div className="company-cont">
                <CompanyActionSelection displayedActionSelection={displayedActionSelection}
                                        handleCompanyActionSelection={handleCompanyActionSelection}/>
                <CompanyCouponActions onSubmitFormCompany={onSubmitFormCoupon}
                                      displayedActionSelection={displayedActionSelection}
                                      handleActionSelection={handleCompanyActionSelection}/>
                <CompanyCoupons coupons={companyCoupons} displayedActionSelection={displayedActionSelection}
                                handleActionSelection={handleCompanyActionSelection}
                                    handleChangeInSelectedCategory={handleChangeInSelectedCategory}
                                categories={categories}
                                handleChangeInMaxPrice={handleChangeInMaxPrice}

                />
                <CompanyDetails   displaySelection={displayedActionSelection} currentCompany={currentCompany}  />


            </div>

        </>
    )
}