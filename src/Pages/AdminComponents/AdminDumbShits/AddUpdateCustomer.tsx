import {useForm} from "react-hook-form";
import {Customer} from "../../../Models/Customer";
import {CompanyDTO} from "../../../Models/Company";
import {AdminService} from "../../../Services/AdminService";
import {Button} from "@mui/material";
import {AdminActionTypes} from "../AdminActionTypes";


interface AddUpdateCustomerProps{
    displayedActionSelection:number,
    adminService:AdminService,
    handleActionSelection(action:AdminActionTypes):void
}
export default function (props:AddUpdateCustomerProps){


    const {register, handleSubmit, watch, formState: {errors}} = useForm<Customer>();

    const onSubmitFormCustomer = async (data: Customer) => {

        switch (props.displayedActionSelection) {
            case 6: {
                await props.adminService.addCustomer(data);
                break;
            }
            case 7: {
                await props.adminService.updateCustomer(data, data.id);
                break;
            }
            case 8: {
                await props.adminService.deleteCustomer(data.id);
                break;
            }

        }

    };

    return(
        <>
            {props.displayedActionSelection===6 ?<form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>
                <input placeholder={'First Name'} {...register("firstName")} required={true}/>
                <input placeholder={'Last Name'} {...register("lastName")} required={true}/>
                <input placeholder={'Customer email'} {...register("email")} required={true}/>

                <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Add New </Button>
                <Button sx={{backgroundColor: 'black', color: 'white'}}
                        onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>

            </form> : null}
            {props.displayedActionSelection===7 ?<form onSubmit={handleSubmit(onSubmitFormCustomer)} className={'add-new-company-form'}>
                <input placeholder={'First Name'} {...register("firstName")} required={true}/>
                <input placeholder={'Last Name'} {...register("lastName")} required={true}/>
                <input placeholder={'Customer email'} {...register("email")} required={true}/>
                <input placeholder={'Customer id'} {...register("id")} required={true}/>

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

        </>
    )
}