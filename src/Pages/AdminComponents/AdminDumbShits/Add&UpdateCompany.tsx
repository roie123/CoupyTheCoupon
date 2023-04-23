import {Button} from "@mui/material";
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
                    <input placeholder={'Company Name'} {...register("name")} required={true}/>
                    <input placeholder={'Company email'} {...register("email")} required={true}/>
                    {props.displayedActionSelection === 2 ?
                        <input placeholder={'Company id'} {...register("id")} required={true}/> : null}
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