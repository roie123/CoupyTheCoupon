import jwtDecode from "jwt-decode";
import {AuthClientTypes} from "../Services/AuthService";

export interface UserModel {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}
export class AuthState {

    user: UserModel | null = null;
    token: string | null = null;
    clientType:AuthClientTypes=AuthClientTypes.Customer

    constructor() {
        const token: string | null = localStorage.getItem("token");
        if (token) {
            const container: { user: UserModel } = jwtDecode(token);
            this.user = container.user;
        }
    }

}


export enum AuthActionType {
    Register,
    Login,
    Logout,
}

export interface Action {
    type: AuthActionType;
    payload?: any;
}

export function registerAction(token: string): Action {
    return { type: AuthActionType.Register, payload: token };
}

export function loginAction(token: string): Action {
    return { type: AuthActionType.Login, payload: token };
}

export function logoutAction(): Action {
    return { type: AuthActionType.Logout }
}

export function authReducer(currentState: AuthState = new AuthState(), action: Action): AuthState {

    const newState: AuthState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token!);
            newState.user = container.user;
            localStorage.setItem("token", newState.token!);
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newState;

}

// export const authStore = createStore(authReducer);