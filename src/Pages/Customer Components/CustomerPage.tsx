import './CustomerPage.css'
import {ChangeEvent, useState} from "react";
import {CustomerActionTypes} from "../../Models/Enums/CustomerActionTypes";
import CustomerActionSelection from "./CustomerLittleThings/CustomerActionSelection";
import PurchaseCoupon from "./CustomerLittleThings/PurchaseCoupon";
import {Coupon} from "../../Models/Coupon";
import {CouponSearchFilterTypes} from "../../Models/Enums/CouponSearchFilterTypes";
import {CustomerService} from "../../Services/CustomerService";
import {Button, Snackbar} from "@mui/material";
import CustomerCoupons from "./CustomerLittleThings/CustomerCoupons";
import GetCouponsByAttribute from "./CustomerLittleThings/GetCouponsBy";
import {CategoryType} from "../../Models/Enums/CategoryType";

export default function CustomerPage() {

    const [displayedAction, setdisplayedAction] = useState<number>(0);
    const [availableCoupons, setavailableCoupons] = useState<Coupon[]>([]);
    const [displayedCoupons, setdisplayedCoupons] = useState<Coupon[]>([]);
    const [searchQuery, setsearchQuery] = useState<string>('');
    const [snackBarSelection, setsnackBarSelection] = useState<number>(0);
    const [customerCoupons, setcustomerCoupons] = useState<Coupon[]>([]);
    const [popUpSelection, setpopUpSelection] = useState<number>(0);
    const [advanceSearchParameter, setadvanceSearchParameter] = useState<number>(0);


    const customerService: CustomerService = CustomerService.getInstance();


    /**
     * This Method Will change the advanceSearchSelection
     * author : Roie Ivri
     * Created At 07/05/2023 13:33
     */
    function changeAdvanceSearchSelection(selection: number) {
        setadvanceSearchParameter(selection);
    }


    /**
     * This Method changes the search query by a ChangeEvent
     * author : Roie Ivri
     * Created At 06/05/2023 17:18
     */
    function handleChangeInSearchQuery(event: ChangeEvent) {

        // @ts-ignore
        setsearchQuery(event.target.value)
    }

    /**
     * This Method Will change the availableCoupons dynamically
     * @author : Roie Ivri
     * @Created At 06/05/2023 11:45
     *
     */
    function handleChangeInDisplayedCoupons(couponsToDisplay: Coupon[]) {
        setavailableCoupons(couponsToDisplay);
    }

    /**
     * This Method Will clear the displayed coupons
     * author : Roie Ivri
     * Created At 06/05/2023 11:46
     */
    function clearDisplayedCoupons() {
        setavailableCoupons([]);

    }

    /**
     * This Method Will change the search filter type and change the style with it
     * author : Roie Ivri
     * Created At 06/05/2023 12:43
     */
    function handleChangeInFilterType(filter: CouponSearchFilterTypes) {
        if (filter !== CouponSearchFilterTypes.byTitle) {
            const currentFilterElement: HTMLElement = document.getElementById(filter)!;
            if (document.getElementsByClassName('filter-clicked').item(0) !== null) {
                const prevElement = document.getElementsByClassName('filter-clicked').item(0)!;
                prevElement.className = 'filter';
            }
            currentFilterElement.className = 'filter-clicked';
        }
        switch (filter) {
            case CouponSearchFilterTypes.byId:
                setdisplayedCoupons(customerService.sortCoupons(displayedCoupons, CouponSearchFilterTypes.byId))
                break;
            case CouponSearchFilterTypes.byPrice:
                setdisplayedCoupons(customerService.sortCoupons(displayedCoupons, CouponSearchFilterTypes.byPrice))

                break;
            case CouponSearchFilterTypes.byCategory:
                setdisplayedCoupons(customerService.sortCoupons(displayedCoupons, CouponSearchFilterTypes.byCategory))

                break;
            case CouponSearchFilterTypes.byTitle:
                setdisplayedCoupons([...availableCoupons.filter(value => value.title.includes(searchQuery))])
                break;


        }
    }

    async function handleChangeInDisplayedAction(action: CustomerActionTypes) {
        switch (action) {
            case CustomerActionTypes.PurchaseCoupon:
                if (availableCoupons.length === 0) {
                    await populateAvailableCoupons()
                }
                setdisplayedAction(1);
                break;
            case CustomerActionTypes.GetMyCoupons:
                await populateCustomerCoupons();
                setdisplayedAction(2);
                break;
            case CustomerActionTypes.GetCouponsByCategory:
                handleChangeInPopUpSelection(1);
                setdisplayedAction(3);
                break;
            case CustomerActionTypes.GetCouponsByPrice:
                setdisplayedAction(4);
                break;
            case CustomerActionTypes.GetMyDetails:
                setdisplayedAction(5);
                break;
            case CustomerActionTypes.GoToSelection:
                setdisplayedAction(0);
                break;

        }
    }


    /**
     * This Method Will populate the customers coupons
     * author : Roie Ivri
     * Created At 06/05/2023 20:30
     */
    async function populateCustomerCoupons() {
        setcustomerCoupons(await customerService.getMyCoupons(204))
    }

    /**
     * This Method Will populate the availble Coupons
     * author : Roie Ivri
     * Created At 06/05/2023 13:12
     */
    async function populateAvailableCoupons() {
        const coupons: Coupon[] = await customerService.getMyAvailableCoupons();
        setavailableCoupons(coupons);
        setdisplayedCoupons(coupons);

    }


    /**
     * This Method Will handle The purchasing of the coupon
     * author : Roie Ivri
     * Created At 06/05/2023 17:53
     */
    function purchaseCoupon(coupon: Coupon) {
        customerService.purchaseCoupon(coupon.id, 204).then(() => {
            const purchasedCoupon = document.getElementById(coupon.id.toString())!;
            purchasedCoupon.style.animationName = 'purchase'
            purchasedCoupon.style.zIndex = '10'
            purchasedCoupon.style.animationIterationCount = '1';
            purchasedCoupon.style.animationDelay = '0';
            purchasedCoupon.style.animationDuration = '3s';
            purchasedCoupon.style.animationFillMode = 'forwards';

            setTimeout(() => {
                setdisplayedCoupons([...displayedCoupons.filter(value => value.id !== coupon.id)])

            }, 1000)

            setsnackBarSelection(1);

        }).catch((reason) => {

            setsnackBarSelection(2);
        });
        setTimeout(() => {
            setsnackBarSelection(0)
        }, 1000)


    }

    /**
     * This Method Will change the state of the popups
     * author : Roie Ivri
     * Created At 06/05/2023 20:47
     */
    function handleChangeInPopUpSelection(selection: number) {
        setpopUpSelection(selection);

    }


    /**
     * This Method Will search by the selected attribute
     * author : Roie Ivri
     * Created At 07/05/2023 13:43
     */
    async function advanceSearch(category?: CategoryType, price?: number) {
        if (category !== undefined) {
            setdisplayedCoupons(await customerService.getMyCouponsByCategory(204, category))

        } else if (price !== undefined) {
            setdisplayedCoupons(await customerService.getMyCouponsByMaxPrice(204, price!))
        }


        setpopUpSelection(0);
    }


    return (

        <>
            <CustomerActionSelection displayedAction={displayedAction}
                                     handleChangeInDisplayedAction={handleChangeInDisplayedAction}/>
            <PurchaseCoupon handleChangeInFilterType={handleChangeInFilterType} displayedAction={displayedAction}
                            handleChangeInSearchQuery={handleChangeInSearchQuery}
                            coupons={displayedCoupons}
                            purchaseCoupon={purchaseCoupon}
                            advanceSearchParameter={advanceSearchParameter}
                            popUpSelection={popUpSelection}
                            handleChangeInPopUpSelection={handleChangeInPopUpSelection}
                            changeAdvanceSearchSelection={changeAdvanceSearchSelection}
                            advanceSearch={advanceSearch}
            />


            <CustomerCoupons coupons={customerCoupons} displayedAction={displayedAction}

            />

            <GetCouponsByAttribute displayedAction={displayedAction}
                                   handleChangeInPopUpSelection={handleChangeInPopUpSelection}
                                   popUpSelection={popUpSelection}/>
            {displayedAction !== 0 ?
                <div className="go-back-cont">
                    <Button variant={'contained'} sx={{backgroundColor: 'black', width: '13vh', height: '7vh'}}
                            onClick={() => handleChangeInDisplayedAction(CustomerActionTypes.GoToSelection)}>Back</Button>
                </div> : null}


            <Snackbar
                open={snackBarSelection === 1}
                autoHideDuration={1}
                message="Coupon Purchased"
            />
            <Snackbar
                open={snackBarSelection === 2}
                autoHideDuration={2}
                color={'red'}
                message="Coupon Cannot be Purchased"
            />
        </>
    )
}