import {useForm} from "react-hook-form";
import {Customer} from "../../../Models/Customer";
import {CompanyDTO} from "../../../Models/Company";
import {AdminService} from "../../../Services/AdminService";
import {Button, Snackbar, TextField} from "@mui/material";
import {AdminActionTypes} from "../AdminActionTypes";
import {useEffect, useState} from "react";


interface AddUpdateCustomerProps{
    displayedActionSelection:number,
    adminService:AdminService,
    handleActionSelection(action:AdminActionTypes):void
}
export default function (props:AddUpdateCustomerProps){


    const {register, handleSubmit, watch, formState: {errors}} = useForm<Customer>();
    const [userMessage,setuserMessage] =useState<string>('');
    const [showUserMessage,setshowUserMessage] =useState<boolean>(false);

    const onSubmitFormCustomer = async (data: Customer) => {

        switch (props.displayedActionSelection) {
            case 6: {
                await props.adminService.addCustomer(data).then(value => {
                    setuserMessage("Customer Has Been Added Successfully");
                    setshowUserMessage(true);
                }).catch(error=>{
                    setuserMessage("Cannot Add Customer, Email already Exists");
                    setshowUserMessage(true);
                });
                break;
            }
            case 7: {
                await props.adminService.updateCustomer(data, data.id).then(value => {
                    setuserMessage("Customer Has Been Updated Successfully");
                    setshowUserMessage(true);
                }).catch(error=>{
                    setuserMessage("Cannot update Customer, Email already Exists");
                    setshowUserMessage(true);
                });;
                break;
            }
            case 8: {
                await props.adminService.deleteCustomer(data.id);
                break;
            }

        }

    };

    useEffect(()=>{
        setTimeout(()=>{
            setshowUserMessage(false);
        },3000)
    },[showUserMessage])


    return(
        <>
            {props.displayedActionSelection===6 ?<form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>
                <TextField placeholder={'First Name'} {...register("firstName")} required={true}/>
                <TextField placeholder={'Last Name'} {...register("lastName")} required={true}/>
                <TextField placeholder={'Customer email'} {...register("email")} required={true}/>
                <TextField placeholder={'Customer Password'} {...register("password")} required={true}/>

                <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Add New </Button>
                <Button sx={{backgroundColor: 'black', color: 'white'}}
                        onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>

            </form> : null}
            {props.displayedActionSelection===7 ?<form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>
                <TextField placeholder={'First Name'} {...register("firstName")} required={true}/>
                <TextField placeholder={'Last Name'} {...register("lastName")} required={true}/>
                <TextField placeholder={'Customer email'} {...register("email")} required={true}/>
                <TextField type={"number"} placeholder={'Customer id'} {...register("id")} required={true}/>

                <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Update Customer</Button>
                <Button sx={{backgroundColor: 'black', color: 'white'}}
                        onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>

            </form> : null}

            {props.displayedActionSelection===8 ?<form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>

                <input placeholder={'Customer id'} {...register("id")} required={true}/>

                <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Add New </Button>
                <Button sx={{backgroundColor: 'black', color: 'white'}}
                        onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>

            </form> : null}

            <Snackbar open={showUserMessage} message={userMessage}    />
        </>
    )
}