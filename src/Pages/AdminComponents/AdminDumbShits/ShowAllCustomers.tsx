import {Button} from "@mui/material";
import {AdminActionTypes} from "../AdminActionTypes";
import {Customer} from "../../../Models/Customer";

interface ShowAllCustomersProps{

    customers:Customer[]
    handleActionSelection(action:AdminActionTypes):void;
    displayedActionSelection:number
}

export default function ShowAllCustomers(props:ShowAllCustomersProps){




    return(
        <>
            {props.displayedActionSelection === 9 ?
                <>
                    <div className="item-list">

                        {props.customers.map(item=>(
                            <div key={item.id} className="item-cont">
                                <p className="item-main-p">{item.id}</p>
                                <div className="bottom-item-cont">
                                    <p className="item-sec-p">{item.firstName}</p>
                                    <p className="item-third-p">{item.email}</p>

                                </div>
                            </div>
                        ))}


                    </div>
                    <Button sx={{backgroundColor: 'black', color: 'white', marginTop: '2vh'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>
                    <Button sx={{backgroundColor: 'black', color: 'white', marginTop: '2vh'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Next Page</Button>
                </>

                : null}




        </>
    )
}