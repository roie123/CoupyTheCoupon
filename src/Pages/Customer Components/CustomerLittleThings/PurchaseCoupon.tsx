import {Button, Dialog, IconButton, Input, MenuItem, Select, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import './PurchaseCoupon.css'
import {Coupon} from "../../../Models/Coupon";
import CouponCard from "../../../General Components/CouponCard";
import {CouponSearchFilterTypes} from "../../../Models/Enums/CouponSearchFilterTypes";
import {ChangeEvent, useState} from "react";
import {CategoryType} from "../../../Models/Enums/CategoryType";

interface PurchaseCouponProps {
    displayedAction: number;
    coupons: Coupon[];

    handleChangeInFilterType(filter: CouponSearchFilterTypes): void;

    handleChangeInSearchQuery(event: ChangeEvent): void;

    purchaseCoupon(coupon: Coupon): void;

    advanceSearchParameter: number;
    popUpSelection: number;

    changeAdvanceSearchSelection(selection: number): void;

    handleChangeInPopUpSelection(selection: number): void;
    advanceSearch(category? : CategoryType , price?:number ):void;
}

/**
 * Author - Roie Ivri
 * Created Date&Time - 06/05/2023 | 11:14
 */
export default function PurchaseCoupon(props: PurchaseCouponProps) {
const [selectedCategory,setselectedCategory] =useState<CategoryType>(CategoryType.StupidFace);
const [maxPrice,setmaxPrice] =useState<number>(0);



    return (
        <>
            {props.displayedAction === 1 ?

                <>
                    <div className="purchase-coupon-cont">


                        <div className={'search-cont'}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                onChange={(e) => props.handleChangeInSearchQuery(e)}
                            />
                            <IconButton aria-label="Search"
                                        onClick={() => props.handleChangeInFilterType(CouponSearchFilterTypes.byTitle)}>
                                <Search/>
                            </IconButton>
                        </div>
                        <Button sx={{width: '90%', margin: '1vh auto ', backgroundColor: 'black', color: 'white'}}
                                onClick={() => props.handleChangeInPopUpSelection(2)}> Advance Search</Button>

                        <div className="filter-by-selection-cont">
                            <div className="filter" id={CouponSearchFilterTypes.byId}
                                 onClick={() => props.handleChangeInFilterType(CouponSearchFilterTypes.byId)}>
                                <p>ID</p>
                            </div>
                            <div className="filter" id={CouponSearchFilterTypes.byPrice}
                                 onClick={() => props.handleChangeInFilterType(CouponSearchFilterTypes.byPrice)}>
                                <p>Price</p>
                            </div>
                            <div className="filter" id={CouponSearchFilterTypes.byCategory}
                                 onClick={() => props.handleChangeInFilterType(CouponSearchFilterTypes.byCategory)}>
                                <p>Category</p>
                            </div>
                        </div>


                        <div className="coupon-list-cont">
                            {props.coupons.map(coupon => (
                                <CouponCard coupon={coupon} key={coupon.id} localId={coupon.id} clickOnCoupon={() => props.purchaseCoupon(coupon)}/>
                            ))
                            }
                        </div>

                    </div>


                    <Dialog open={props.popUpSelection === 2} sx={{textAlign: 'center'}}>
                        <h4>Select Your search type</h4>
                        <div className="advance-search-cont">
                            <div className="options-cont">
                                <div className="search-option-cont"
                                     onClick={() => props.changeAdvanceSearchSelection(1)} id={'price-adv'}>
                                    <p>Price</p>
                                </div>
                                <div className="search-option-cont"
                                     onClick={() => props.changeAdvanceSearchSelection(2)} id={'category-adv'}>
                                    <p>Category</p>
                                </div>
                            </div>

                            {props.advanceSearchParameter === 1 ?
                                (
                                    <>
                                        <Input type={'number'} placeholder={'Max Price'} onChange={(e)=>setmaxPrice(Number.parseInt(e.currentTarget.value!))}/>
                                        <Button sx={{
                                            width: '90%',
                                            margin: '1vh auto ',
                                            backgroundColor: 'black',
                                            color: 'white'
                                        }} onClick={() => props.handleChangeInPopUpSelection(2)}> Search</Button>
                                    </>

                                )
                                : null}
                            {props.advanceSearchParameter === 2 ?
                                (
                                    <>

                                        <Select onChange={(e)=> setselectedCategory(e.target.value as CategoryType)} defaultValue={CategoryType.StupidFace} aria-placeholder={'sa'}>
                                            <MenuItem  value={CategoryType.StupidFace}>StupidFace</MenuItem>
                                            <MenuItem value={CategoryType.Shitty}>Shitty</MenuItem>
                                            <MenuItem value={CategoryType.SuckAss}>SuckAss</MenuItem>


                                        </Select>
                                        <Button sx={{
                                            width: '90%',
                                            margin: '1vh auto ',
                                            backgroundColor: 'black',
                                            color: 'white'
                                        }} onClick={() => props.advanceSearchParameter===1 ? props.advanceSearch(undefined,maxPrice): props.advanceSearch(selectedCategory) }> Search</Button>
                                    </>

                                )
                                : null}


                        </div>

                    </Dialog>
                </>


                : null}
        </>
    )
}