import {Coupon} from "../Models/Coupon";
import {Button} from "@mui/material";

interface CouponCardProps {
    coupon: Coupon

    clickOnCoupon?(coupon: Coupon): void;

    localId: number;
}

/**
 * Author - Roie Ivri
 * Created Date&Time - 06/05/2023 | 11:42
 */
export default function CouponCard(props: CouponCardProps) {

    return (
        <>

            <div key={props.coupon.id} id={props.localId.toString()} className="coupon-cont">
                <div className="img-cont">
                    <img className={'img-of-coupon'} src={props.coupon.image!==null  ? "https://static.wixstatic.com/media/311930_6c3bd7faebf3450483a59c746487ac81~mv2.png" : props.coupon.image } />
                </div>
                <div className="upper-coupon-cont">

                    <p className={'c-title'}>{props.coupon.title}</p>
                    <p className={'c-desc'}>{props.coupon.description} <span>id :{props.coupon.id}</span></p>
                    <p className={'c-amount'}>Category
                        : {props.coupon.category}</p>
                </div>

                <div className="bottom-coupon-cont">
                    <p className={'c-amount'}>Amount Left : <span>{props.coupon.amount}</span></p>
                    <p className={'c-price'}>Price
                        : <span>{props.coupon.price}<span>&#8362;</span></span></p>
                    <p className={'c-exp'}>EXP
                        : {props.coupon.startDate.toString()} until {props.coupon.endDate.toString()}</p>


                </div>
                {props.clickOnCoupon !== undefined ?
                    <div className="buy-cont">
                        <Button sx={{}} variant={'contained'}
                                onClick={() => props.clickOnCoupon!(props.coupon)}>Buy</Button>
                    </div>
                    : null
                }

            </div>

        </>
    )
}