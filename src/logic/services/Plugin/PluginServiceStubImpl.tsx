import {AuthenticationRequest, PluginClient, UserClient, UserRegistrationRequest} from "../../../api/generated";
import {PluginService} from "./PluginService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class PluginServiceStubImpl implements PluginService {
    authenticate(request: AuthenticationRequest): void {
        PluginClient.createPlugin()
    }

    register(request: UserRegistrationRequest): void {
        UserClient.register(request)
    }

    public userAuthenticated() {
        return false;
    };
}
