import {CompanyDTO} from "./Company";
import {Customer} from "./Customer";
import {Coupon} from "./Coupon";

export class ErrorMessage {
    error: number=1;
    message: string='';


}
export  function isErrorMessage(obj: CompanyDTO | ErrorMessage): obj is ErrorMessage {
    return 'error' in obj;
}

export  function isErrorMessageFromCustomer(obj: Customer | ErrorMessage): obj is ErrorMessage {
    return 'error' in obj;
}
export  function isErrorMessageFromCoupon(obj: Coupon | ErrorMessage): obj is ErrorMessage {
    return 'error' in obj;
}