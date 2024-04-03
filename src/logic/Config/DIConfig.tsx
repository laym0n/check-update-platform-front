import { Container } from "inversify";
import "reflect-metadata";
import {TYPES} from "./Types";
import {AuthenticationService} from "src/logic/Authentication";
import {AuthenticationServiceStubImpl} from "src/logic/Authentication/AuthenticationServiceStubImpl";

const diContainer = new Container();
diContainer.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationServiceStubImpl);

export {diContainer};
