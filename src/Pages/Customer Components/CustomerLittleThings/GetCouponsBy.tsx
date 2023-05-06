import {Dialog, Input, Typography} from "@mui/material";

interface GetCouponsByAttributeProps{
displayedAction:number;
    handleChangeInPopUpSelection(selection:number):void;
    popUpSelection:number;
}
    /**
     * Author - Roie Ivri 
     * Created Date&Time - 06/05/2023 | 20:42
     */
export default function GetCouponsByAttribute(props:GetCouponsByAttributeProps){

return(
<>
    {props.displayedAction===3 ?
        (
<>
<Dialog open={props.popUpSelection===1} >
<Typography>Please Select The Max Price</Typography>
    <Input type={'number'}  />


</Dialog>


</>



        )

        :null}
    {props.displayedAction===4 ?null:null}
</>
)
}