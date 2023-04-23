import {Button} from "@mui/material";
import {CompanyDTO} from "../../../Models/Company";
import {AdminActionTypes} from "../AdminActionTypes";


interface ShowAllCompaniesProps{
    companyList:CompanyDTO[],
    displayedActionSelection:number
    handleActionSelection(action:AdminActionTypes):void;

}
export default function (props:ShowAllCompaniesProps){







    return(
            props.displayedActionSelection === 4 ?
                <>
                    <div className="item-list">

                        {props.companyList.map(item=>(
                            <div key={item.id} className="item-cont">
                                <p className="item-main-p">{item.id}</p>
                                <div className="bottom-item-cont">
                                    <p className="item-sec-p">{item.name}</p>
                                    <p className="item-third-p">{item.email}</p>

                                </div>
                            </div>
                        ))}


                    </div>
                    <Button sx={{backgroundColor: 'black', color: 'white',margin:'auto'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>
                </>

                : null



    )
}