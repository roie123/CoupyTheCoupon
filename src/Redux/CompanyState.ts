import {AuthClientTypes} from "../Services/AuthService";
import jwtDecode from "jwt-decode";
import {CompanyDTO} from "../Models/Company";
import { Customer } from "../Models/Customer";
import {Coupon} from "../Models/Coupon";

export class CompanyState {
    coupons:Coupon[] =[];






}


export enum CompanyActionType {
    SetCompanyCoupons="SetCompanyCoupons",
    ClearCompanyCoupons="ClearCompanyCoupons"
}

export interface CompanyAction {
    type: CompanyActionType;
    payload?:CompanyState|any
}

export function setCompanyCoupons(state:CompanyState): CompanyAction {
    return { type: CompanyActionType.SetCompanyCoupons, payload:state };
}


export function ClearCoupons(state:CompanyState): CompanyAction {
    return { type: CompanyActionType.ClearCompanyCoupons , payload:state };
}



export function companyReducer(currentState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState {

    const newState  = {...currentState};



    switch (action.type) {
        case CompanyActionType.SetCompanyCoupons:
            newState.coupons = {...action.payload}
            return newState;
            break;
        case CompanyActionType.ClearCompanyCoupons:
            newState.coupons = []
            return newState;

            break;


    }

    return newState;

}