import {Box, Button} from "@mui/material";
import {CompanyDTO} from "../../../Models/Company";
import {AdminActionTypes} from "../AdminActionTypes";
import {useState} from "react";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
interface ShowAllCompaniesProps{
    companyList:CompanyDTO[],
    displayedActionSelection:number
    handleActionSelection(action:AdminActionTypes):void;
    changeAllCompaniesViewPage(page:number):void;
    currnetPage:number
}
export default function (props:ShowAllCompaniesProps){

const [currentPage,setcurrentPage] =useState<number>(props.currnetPage);



function movePages(forward:boolean){
if (forward){
    props.changeAllCompaniesViewPage(currentPage+1)
    setcurrentPage((prevState)=>prevState+1);

}else {
    if (currentPage<1){
        return;
    }
    props.changeAllCompaniesViewPage(currentPage-1)
    setcurrentPage((prevState)=>prevState-1);
}
    }


    return(
            props.displayedActionSelection === 4   ?
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
                    <Box sx={{display:'flex' , flexDirection:'row' , width:'100%' , justifyContent:'space-around'}} >
                        <ArrowBackIosNewIcon  onClick={()=> movePages(false)} />
                        <ArrowForwardIosIcon  onClick={()=> movePages(true)} />

                    </Box>
                    <Button sx={{backgroundColor: 'black', color: 'white',margin:'auto'}}
                            onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>
                </>

                : null



    )
}