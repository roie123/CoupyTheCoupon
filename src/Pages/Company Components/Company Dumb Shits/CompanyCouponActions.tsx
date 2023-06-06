import {Box, Button, MenuItem, Select, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {Coupon} from "../../../Models/Coupon";
import {CompanyActionTypes} from "../../../Models/Enums/CompanyActionTypes";
import {DatePicker} from '@mui/x-date-pickers';
import {useState} from "react";
import {CategoryType} from "../../../Models/Enums/CategoryType";

interface CompanyCouponActionsProps {
    onSubmitFormCompany(data: Coupon): void;

    displayedActionSelection: number;
    popUpSelection: number,

    handleActionSelection(action: CompanyActionTypes): void;
     handleChangeInPopupSelection(     id: number): void
}

export default function CompanyCouponActions(props: CompanyCouponActionsProps) {

    const {control, register, handleSubmit, watch, formState: {errors}} = useForm<Coupon>();
    const [startDate, setstartDate] = useState<Date>();
    const [endDate, setendDate] = useState<Date>();
    const [currentCategory,setcurrentCategory] =useState<CategoryType>(CategoryType.StupidFace);

function handleChangeCategory(category:CategoryType){
setcurrentCategory(category);
}

    return (
        props.displayedActionSelection === 1 || props.displayedActionSelection === 2 ?
            (<div className="company-coupon-cont">
                <form onSubmit={handleSubmit((e) => props.onSubmitFormCompany(e))} className={'add-new-company-form'}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '3vh', marginTop: '10vh'}}>
                        <TextField placeholder={'Coupon Title'} {...register("title")} required={true}/>
                        {props.displayedActionSelection === 2 ?
                            <TextField type={'number'} placeholder={'Coupon Id'} {...register("id")}
                                       required={true}/> : null}
                        <TextField placeholder={'Coupon description'} {...register("description")} required={true}/>
                        <TextField placeholder={'Coupon Image Link'} {...register("image")} required={false}/>
                        <Select
                            {...register('category')}
                                value={currentCategory}

                        >
                            <MenuItem onClick={()=>handleChangeCategory(CategoryType.StupidFace) } value={CategoryType.StupidFace}>{CategoryType.StupidFace}</MenuItem>
                            <MenuItem onClick={()=>handleChangeCategory(CategoryType.Shitty) } value={CategoryType.Shitty}>{CategoryType.Shitty}</MenuItem>
                            <MenuItem onClick={()=>handleChangeCategory(CategoryType.SuckAss) } value={CategoryType.SuckAss}>{CategoryType.SuckAss}</MenuItem>
                        </Select>
                        {/*<DatePicker label={'Start Date'}   />*/}
                        {/*<DatePicker  label={'End Date'}   />*/}
                        <Box sx={{display: 'flex'}}>
                            <TextField type={'number'} placeholder={'Coupon Amount'} {...register("amount")}
                                       required={true}/>
                            <TextField type={'number'} placeholder={'Coupon Price'} {...register("price")}
                                       required={true}/>
                        </Box>
                        <Box sx={{display: 'flex'}}>


                            <Controller
                                control={control}

                                name='startDate'
                                render={({field}) => (
                                    <DatePicker
                                        label={'Pick Start Date'}
                                        onChange={(date) => field.onChange(date)}
                                        minDate={Date.now()}
                                    />
                                )}
                            />
                            <Controller
                                control={control}

                                name='endDate'
                                render={({field}) => (
                                    <DatePicker
                                        label={'Pick End Date'}
                                        onChange={(date) => field.onChange(date)}
                                        minDate={Date.now()}
                                    />
                                )}
                            />


                        </Box>


                    </Box>

                    <Button type={'submit'} sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        position: 'absolute',
                        bottom: '20vh',
                        zIndex: '100'
                    }}>Save</Button>


                </form>


            </div>) :
            props.displayedActionSelection === 3 ?
                <form onSubmit={handleSubmit((e) => props.onSubmitFormCompany(e))} className={'add-new-company-form'}>
                    <input type={'number'} placeholder={'Coupon Id'} {...register("id")} required={true}/>
                    <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Delete</Button>

                    <Button sx={{backgroundColor: 'black', color: 'white', position: 'absolute', bottom: '20vh'}}
                            onClick={() => props.handleActionSelection(CompanyActionTypes.GoBackToSelection)}>Back</Button>


                </form> : null


    )
}