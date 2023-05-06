import CouponCard from "../../../General Components/CouponCard";
import {Coupon} from "../../../Models/Coupon";

interface CustomerCouponsProps {
    coupons: Coupon[];
    displayedAction: number;

}

/**
 * Author - Roie Ivri
 * Created Date&Time - 06/05/2023 | 20:27
 */
export default function CustomerCoupons(props: CustomerCouponsProps) {

    return (
            props.displayedAction === 2 ? <> <h4>My Coupons</h4>


                <div className="coupon-list-cont">
                    {props.coupons.map(coupon => (
                        <CouponCard coupon={coupon}/>
                    ))
                    }
                </div>
            </> :null


    )
}