import {useForm} from "react-hook-form";
import {Customer} from "../../../Models/Customer";
import {CompanyDTO} from "../../../Models/Company";
import {AdminService} from "../../../Services/AdminService";
import {Button, Snackbar, TextField} from "@mui/material";
import {AdminActionTypes} from "../AdminActionTypes";
import {useEffect, useState} from "react";
import {ErrorMessage, isErrorMessageFromCustomer} from "../../../Models/ErrorMessage";
import {isNumberObject} from "util/types";


interface AddUpdateCustomerProps {
    displayedActionSelection: number,
    adminService: AdminService,

    handleActionSelection(action: AdminActionTypes): void
}

export default function (props: AddUpdateCustomerProps) {


    const {register, handleSubmit, watch, formState: {errors}} = useForm<Customer>();
    const [userMessage, setuserMessage] = useState<string>('');
    const [showUserMessage, setshowUserMessage] = useState<boolean>(false);

    const onSubmitFormCustomer = async (data: Customer) => {

        switch (props.displayedActionSelection) {
            case 6: {
                const response = await props.adminService.addCustomer(data);
                console.log(typeof response === 'number');
                if (typeof response === 'number') {
                    setuserMessage("Customer Has Been Added Successfully");
                    setshowUserMessage(true);
                } else {
                    setuserMessage(response.message);
                    setshowUserMessage(true);

                }
                break
            }
            case 7: {
                const response = await props.adminService.updateCustomer(data, data.id);
                if (typeof response === 'object') {
                    setuserMessage(response.message);
                    setshowUserMessage(true);
                } else {
                    setuserMessage("Customer Has been updated");
                    setshowUserMessage(true);
                }
                break;
            }
            case 8: {
                const response = await props.adminService.deleteCustomer(data.id);
                if (typeof response === 'object') {
                    setuserMessage(response.message);
                    setshowUserMessage(true);
                } else {
                    setuserMessage("Customer Has been Deleted");
                    setshowUserMessage(true);
                }
                break;
            }

        }

    };

    useEffect(() => {
        setTimeout(() => {
            setshowUserMessage(false);
        }, 3000)
    }, [showUserMessage])


    return (
        <>
            {props.displayedActionSelection === 6 ?
                <form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>
                    <TextField placeholder={'First Name'} {...register("firstName")} required={true}/>
                    <TextField placeholder={'Last Name'} {...register("lastName")} required={true}/>
                    <TextField placeholder={'Customer email'} {...register("email")} required={true}/>
                    <TextField placeholder={'Customer Password'} {...register("password")} required={true}/>

                    <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Add New </Button>
                    <Button sx={{backgroundColor: 'black', color: 'white'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>

                </form> : null}
            {props.displayedActionSelection === 7 ?
                <form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>
                    <TextField placeholder={'First Name'} {...register("firstName")} required={true}/>
                    <TextField placeholder={'Last Name'} {...register("lastName")} required={true}/>
                    <TextField placeholder={'Customer email'} {...register("email")} required={true}/>
                    <TextField type={"number"} placeholder={'Customer id'} {...register("id")} required={true}/>

                    <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Update Customer</Button>
                    <Button sx={{backgroundColor: 'black', color: 'white'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>

                </form> : null}

            {props.displayedActionSelection === 8 ?
                <form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>

                    <input placeholder={'Customer id'} {...register("id")} required={true}/>

                    <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Delete </Button>
                    <Button sx={{backgroundColor: 'black', color: 'white'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>

                </form> : null}

            <Snackbar open={showUserMessage} message={userMessage}/>
        </>
    )
}