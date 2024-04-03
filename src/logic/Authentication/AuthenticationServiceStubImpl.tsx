import {AuthenticationService} from "./AuthenticationService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class AuthenticationServiceStubImpl implements AuthenticationService{
    public userAuthenticated () {
        return false;
    };
}
