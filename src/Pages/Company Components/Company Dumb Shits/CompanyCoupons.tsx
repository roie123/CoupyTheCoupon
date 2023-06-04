import {Coupon} from "../../../Models/Coupon";
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {CompanyActionTypes} from "../../../Models/Enums/CompanyActionTypes";
import {CategoryType} from "../../../Models/Enums/CategoryType";
import {useState} from "react";
import {CompanyService} from "../../../Services/CompanyService";
import {useForm} from "react-hook-form";

interface CompanyCouponProps {
    displayedActionSelection: number;
    coupons: Coupon[];

    handleActionSelection(action: CompanyActionTypes): void;

    handleChangeInSelectedCategory(category: string | undefined): void;

    categories: (string | CategoryType)[];

    handleChangeInMaxPrice(max: number): void;
}
interface MaxPriceForm {
    max:number
}
export default function CompanyCoupons(props: CompanyCouponProps) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<MaxPriceForm>();

    return (

        <>
            {props.displayedActionSelection === 4 || props.displayedActionSelection === 5 || props.displayedActionSelection === 6 ?
                <div className="filter-cont">

                </div>

                : null

            }
            {props.displayedActionSelection === 4 ?
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

            {props.displayedActionSelection === 5 ?
                <>
                    <div className="filter-selection-cont">

                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={''}
                            label="Category"
                            // onChange={handleChange}
                            sx={{width: '100%'}}
                        >
                            {props.categories.map(category => (
                                <MenuItem key={category}
                                          onClick={() => props.handleChangeInSelectedCategory(category as string)}
                                          value={category.toString()}>{category}</MenuItem>


                            ))}

                        </Select>


                    </div>
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
                </>

                : null}

            {props.displayedActionSelection === 6 ?
                <>
                    <div className="filter-selection-cont">
                        <form onSubmit={handleSubmit((e) => props.handleChangeInMaxPrice(e.max))} >

                            <Input
                                {...register('max')}
                                sx={{width: '80%', margin: 'auto'}}
                                color="primary"
                                disabled={false}
                                placeholder="Max Price"
                                type={'number'}

                                slotProps={{
                                    input: {
                                        min: 1,
                                        max: 16000,
                                        step: 0.1,
                                    },
                                }}
                                endAdornment={
                                    <Button
                                        variant={'outlined'}

                                        type="submit"
                                        sx={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                            backgroundColor: 'black',
                                            color: 'white'
                                        }}

                                    >
                                        Find
                                    </Button>
                                }

                            />

                        </form>


                    </div>
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
                </>

                : null}

     </>
    )

}