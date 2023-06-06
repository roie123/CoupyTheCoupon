import {useEffect, useState} from "react";
import {Coupon} from "../Models/Coupon";
import CouponCard from "../General Components/CouponCard";
import {AdminService} from "../Services/AdminService";
import './Welcome.css'
interface WelcomPageProps {

}

/**
 * Author - Roie Ivri
 * Created Date&Time - 03/06/2023 | 14:05
 */
export default function WelcomPage(props: WelcomPageProps) {

    const [displayedCoupons, setdisplayedCoupons] = useState<Coupon[]>([]);
    const adminService: AdminService = AdminService.getInstance();
    const [currentPage, setcurrentPage] = useState<number>(1);


    useEffect(() => {
        getNewCouponsShit()

    }, [])


    async function getNewCouponsShit() {
        setdisplayedCoupons(await adminService.getNewCoupons(currentPage));

    }


return (
    <>
        <div className="welcome-cont">
            <div className="title-cont">
                <h4>Welcome To Coupy The Coupon</h4>
                <h5>Our New Coupons !</h5>
            </div>
            <div className="displayed-coupon-list">
                {displayedCoupons.length > 0 ? displayedCoupons.map(coupon => (
                    <>
                        <CouponCard coupon={coupon} localId={coupon.id!}/>
                    </>
                )) : null}
            </div>

        </div>


    </>
)
}