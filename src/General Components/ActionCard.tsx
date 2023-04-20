import AddIcon from "@mui/icons-material/Add";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";


interface ActionCardProps{
name:string,
    onClick():void;
    SvgIcon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}
export default  function ActionCard(props:ActionCardProps){





    return(
        <>
            <div className="action-card" onClick={props.onClick}>
                <h5 className="action-name">{props.name}</h5>
                <div className="action-icon">
                    {<props.SvgIcon/>}
                </div>
            </div>{/*END OF CARD  */}
        </>
    )
}