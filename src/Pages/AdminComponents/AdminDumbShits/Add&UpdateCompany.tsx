import {Button, TextField} from "@mui/material";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {CompanyDTO} from "../../../Models/Company";
import {AdminActionTypes} from "../AdminActionTypes";

interface AddUpdateCompanyProps{
    displayedActionSelection:number,
    handleSubmit: (onValid: SubmitHandler<CompanyDTO>, onInvalid?: SubmitErrorHandler<CompanyDTO>) => (e?: React.BaseSyntheticEvent) => Promise<void>,
    onSubmitFormCompany(data: CompanyDTO): Promise<void>,
    handleActionSelection(action: AdminActionTypes):void
}
export default function (props:AddUpdateCompanyProps){
    const {register, handleSubmit, watch, formState: {errors}} = useForm<CompanyDTO>();







    return(
        <>
            {props.displayedActionSelection === 1 || props.displayedActionSelection === 2 ? <>
                <form onSubmit={handleSubmit((e) => props.onSubmitFormCompany(e))} className={'add-new-company-form'}>
                    <TextField label={'Company Name'} placeholder={'Company Name'}  {...register("name")} required={true}/>
                    <TextField   label={'Company Email'} {...register("email")} required={true}/>
                    <TextField   label={'Company Password'} {...register("password")} required={true}/>
                    {props.displayedActionSelection === 2 ?
                        <TextField type={'number'} placeholder={'Company id'} {...register("id")} required={true}/> : null}
                    <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Add New </Button>
                    <Button sx={{backgroundColor: 'black', color: 'white'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>


                </form>


            </> : null}{/*End of updating and creating new companies  */}
            {props.displayedActionSelection === 3 ? <div className="deleting-company-cont">
                <form onSubmit={handleSubmit((() => props.onSubmitFormCompany))}>
                    <input placeholder={'Company id'} {...register("id")} />
                    <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Add New </Button>
                    <Button sx={{backgroundColor: 'black', color: 'white'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>


                </form>
            </div> : null}
        </>
    )
}