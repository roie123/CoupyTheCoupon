import CouponCard from "../../../General Components/CouponCard";
import {Coupon} from "../../../Models/Coupon";

interface CouponListProps{
    coupons:Coupon[];
    onClick(coupn:Coupon):void;
}
    /**
     * Author - Roie Ivri
     * Created Date&Time - 05/06/2023 | 12:52
     */
export default function CouponList(props:CouponListProps){

return(
<>
    {props.coupons.map(coupon => (
        <CouponCard coupon={coupon} key={coupon.id} localId={coupon.id!} clickOnCoupon={() => props.onClick(coupon)}/>
    ))
    }
</>
)
}