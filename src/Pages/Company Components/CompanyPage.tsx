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
import store from "../../Redux/store";
import CompanyLogin from "../AuthPages/CompanyLogin";
import {Button} from "@mui/material";

export default function CompanyPage() {
    const [displayedActionSelection, setdisplayedActionSelection] = useState<number>(-1);
    const [maxPrice, setmaxPrice] = useState<number>(0);
    const [currentCompany, setcurrentCompany] = useState<CompanyDTO>();
    const [popUpSelection, setpopUpSelection] = useState<number>(0);


    useEffect(() => {
        setData();
    }, [])

    async function setData() {

        setcurrentCompany(await companyService.getCompanyDetails());
    }


    const companyService: CompanyService = CompanyService.getInstance();

    async function handleCompanyActionSelection(action: CompanyActionTypes) {

        switch (action) {
            case CompanyActionTypes.Login:
                if (store.getState().authReducer.token?.length !== undefined && store.getState().authReducer.token?.length! > 10) {
                    setdisplayedActionSelection(0);

                }

                break;

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
                setpopUpSelection(0);
                break;

        }

    }


    ///COMPANY COUPONS LOGIC ///////////////////////////


    async function onSubmitFormCoupon(data: Coupon) {
        console.log(data);
        let c: Coupon = {
            amount: data.amount,
            category: data.category,
            description: data.description,
            endDate: data.endDate,
            image: data.image,
            price: data.price,
            startDate: data.startDate,
            title: data.title

        }
        console.log(c);
        const response = await companyService.addCoupon(c).then(value =>{
                handleChangeInPopupSelection(1);
                // handleCompanyActionSelection(CompanyActionTypes.GoBackToSelection);


            }
            );

    }

    function handleChangeInPopupSelection(id:number) {
        switch (id){
            case 1:{
                setpopUpSelection(id);
                break;
            }


            case 0:{
                setpopUpSelection(id);
                break;
            }
        }


    }

    ///COMPANY COUPONS LOGIC ///////////////////////////


    ////////////GET COMPANY COUPONS ///////////////////////////

    //TODO make the logged in company the one who actually gets called
    const [companyCoupons, setcompanyCoupons] = useState<Coupon[]>([]);


    async function getCompanyCoupons(filter: CouponFilterTypes, maxPrice?: number, category?: CategoryType) {

        switch (filter) {
            case CouponFilterTypes.None: {
                const coupons: Coupon[] = await companyService.getCompanyCoupons();
                setcompanyCoupons(coupons);
                break;
            }
            case CouponFilterTypes.ByMaxPrice: {
                const coupons: Coupon[] = await companyService.getCompanyCouponsByMaxPrice(maxPrice!);
                setcompanyCoupons(coupons);
                break;

            }
            case CouponFilterTypes.ByCategory: {
                const coupons: Coupon[] = await companyService.getCompanyCouponsByCategory(category!);
                setcompanyCoupons(coupons);
                break;

            }

        }


    }


    const categories = Object.values(CategoryType);

    async function handleChangeInSelectedCategory(categoryInString: string) {
        //TODO if redux already has the coupons pull from there

        setcompanyCoupons(await companyService.getCompanyCouponsByCategory(categoryInString))

    }

    async function handleChangeInMaxPrice(maxPrice: number) {
        //TODO if redux already has the coupons pull from there
        console.log("hi");
        setcompanyCoupons(await companyService.getCompanyCouponsByMaxPrice(maxPrice));

    }


    ////////////GET COMPANY COUPONS ///////////////////////////
    return (
        <>
            <CompanyLogin displayedActionSelection={displayedActionSelection}
                          handleActionSelection={handleCompanyActionSelection}
            />
            <div className="company-cont">
                <CompanyActionSelection displayedActionSelection={displayedActionSelection}
                                        handleCompanyActionSelection={handleCompanyActionSelection}/>
                <CompanyCouponActions onSubmitFormCompany={onSubmitFormCoupon} popUpSelection={popUpSelection} handleChangeInPopupSelection={handleChangeInPopupSelection}
                                      displayedActionSelection={displayedActionSelection}
                                      handleActionSelection={handleCompanyActionSelection}/>
                <CompanyCoupons coupons={companyCoupons} displayedActionSelection={displayedActionSelection}
                                handleActionSelection={handleCompanyActionSelection}
                                handleChangeInSelectedCategory={handleChangeInSelectedCategory}
                                categories={categories}
                                handleChangeInMaxPrice={handleChangeInMaxPrice}

                />
                {displayedActionSelection === 7 ?
                    <CompanyDetails displaySelection={displayedActionSelection} currentCompany={currentCompany!}/>
                :null}




                {displayedActionSelection !== 0 && displayedActionSelection !== -1 ?
                    <Button sx={{backgroundColor: 'black', color: 'white', position: 'absolute', bottom: '20vh'}}
                            onClick={() => handleCompanyActionSelection(CompanyActionTypes.GoBackToSelection)}>Back</Button>


                    : null}

            </div>

        </>
    )
}