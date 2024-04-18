import {OpenAPI} from 'src/api/generated/core/OpenAPI';
import * as process from "process";
import {diContainer} from "src/logic/Config/DIConfig";
import {AuthenticationService} from "src/logic/services/Authentication";
import {TYPES} from "src/logic/Config/Types";

export default function initialize() {
    try {
        const authenticationService = diContainer.get<AuthenticationService>(TYPES.AuthenticationService);
        OpenAPI.BASE = process.env.REACT_APP_PLATFORM_BASE_URL as string;
        authenticationService.initialize();
    } catch (e) {
        console.error(e)
    }
};
