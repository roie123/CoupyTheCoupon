import {AuthClientTypes} from "../Services/AuthService";
import jwtDecode from "jwt-decode";
import {CompanyDTO} from "../Models/Company";
import { Customer } from "../Models/Customer";

export class AdminState {
  companies:CompanyDTO[] =[];
  customers:Customer[] = []





}


export enum AdminActionType {
   SetAdminState="SetAdminState",
    ClearAdminState="ClearAdminState"
}

export interface AdminAction {
    type: AdminActionType;
    payload?:AdminState|any
}

export function setAdminState(state:AdminState): AdminAction {
    return { type: AdminActionType.SetAdminState, payload:state };
}


export function clearAdminState(state:AdminState): AdminAction {
    return { type: AdminActionType.ClearAdminState , payload:state };
}



export function adminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {

  const newState  = {...currentState};



    switch (action.type) {
        case AdminActionType.SetAdminState:
            newState.companies = action.payload?.companies!;
            newState.customers = action.payload?.customers!;
            return newState;



        case AdminActionType.ClearAdminState:
            newState.companies=[];
            newState.customers=[];
            return newState;



    }

    return newState;

}