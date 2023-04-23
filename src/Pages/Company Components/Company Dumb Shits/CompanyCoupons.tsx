import {Coupon} from "../../../Models/Coupon";
import {Button} from "@mui/material";
import {CompanyActionTypes} from "../../../Models/Enums/CompanyActionTypes";

interface CompanyCouponProps{
    displayedActionSelection:number;
    coupons:Coupon[];
    handleActionSelection(action:CompanyActionTypes):void;
}
export default function CompanyCoupons(props:CompanyCouponProps){





    return(

        <>
            {props.displayedActionSelection === 4 || props.displayedActionSelection === 5 ||props.displayedActionSelection === 6 ?
            <div className="filter-cont">

            </div>

                :null

            }
            {props.displayedActionSelection===4 ?
                <div className="coupon-list-cont">
                    {props.coupons.map(coupon => (
                        <div key={coupon.id} className="coupon-cont">
                            <div className="upper-coupon-cont">
                                <p className={'c-title'}>{coupon.title}</p>
                                <p className={'c-desc'}>{coupon.description}</p>
                            </div>

                            <div className="bottom-coupon-cont">
                                <p className={'c-amount'}>Amount Left : <span>{coupon.amount}</span></p>
                                <p className={'c-price'}>Price
                                    : <span>{coupon.price}<span>&#8362;</span></span></p>
                                <p className={'c-exp'}>EXP
                                    : {coupon.startDate.toString()} until {coupon.endDate.toString()}</p>

                            </div>
                        </div>
                    ))
                    }
                </div>
                : null}

            <Button sx={{backgroundColor: 'black', color: 'white'}}
                    onClick={() => props.handleActionSelection(CompanyActionTypes.GoBackToSelection)}>Back</Button>
        </>
    )

}