import {IconButton, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import './PurchaseCoupon.css'
import {Coupon} from "../../../Models/Coupon";
import CouponCard from "../../../General Components/CouponCard";
import {CouponSearchFilterTypes} from "../../../Models/Enums/CouponSearchFilterTypes";
import {ChangeEvent} from "react";

interface PurchaseCouponProps{
displayedAction:number;
coupons:Coupon[];
    handleChangeInFilterType(filter:CouponSearchFilterTypes):void;
    handleChangeInSearchQuery(event:ChangeEvent):void;
    purchaseCoupon(coupon:Coupon):void;
}
    /**
     * Author - Roie Ivri 
     * Created Date&Time - 06/05/2023 | 11:14
     */
export default function PurchaseCoupon(props:PurchaseCouponProps){

return(
<>
    {props.displayedAction===1 ?

        <>
            <div className="purchase-coupon-cont">


                <div className={'search-cont'}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        onChange={(e)=>props.handleChangeInSearchQuery(e)}
                    />
                    <IconButton aria-label="Search" onClick={()=>props.handleChangeInFilterType(CouponSearchFilterTypes.byTitle)} >
                        <Search />
                    </IconButton>

                </div>
                <div className="filter-by-selection-cont">
                    <div className="filter" id={CouponSearchFilterTypes.byId} onClick={()=> props.handleChangeInFilterType(CouponSearchFilterTypes.byId)}>
                        <p>ID</p>
                    </div>
                    <div className="filter" id={CouponSearchFilterTypes.byPrice} onClick={()=> props.handleChangeInFilterType(CouponSearchFilterTypes.byPrice)}>
                        <p>Price</p>
                    </div>
                    <div className="filter" id={CouponSearchFilterTypes.byCategory} onClick={()=> props.handleChangeInFilterType(CouponSearchFilterTypes.byCategory)}>
                        <p>Category</p>
                    </div>
                </div>


                <div className="coupon-list-cont">
                    {props.coupons.map(coupon => (
                       <CouponCard coupon={coupon} clickOnCoupon={()=>props.purchaseCoupon(coupon)} />
                    ))
                    }
                </div>

            </div>
        </>




        : null}
</>
)
}