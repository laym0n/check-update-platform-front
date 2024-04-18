import {Container} from "inversify";
import "reflect-metadata";
import {TYPES} from "./Types";
import {AuthenticationService} from "src/logic/services/Authentication";
import {AuthenticationServiceStubImpl} from "src/logic/services/Authentication/AuthenticationServiceStubImpl";
import {PluginServiceStubImpl} from "src/logic/services/Plugin/PluginServiceStubImpl";
import {PluginService} from "src/logic/services/Plugin";
import {TagService} from "src/logic/services/Tags";
import {TagServiceStubImpl} from "src/logic/services/Tags/TagServiceStubImpl";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {PluginUsageServiceStubImpl} from "src/logic/services/PluginUsage/PluginUsageServiceStubImpl";

const diContainer = new Container();
diContainer.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationServiceStubImpl);
diContainer.bind<PluginService>(TYPES.PluginService).to(PluginServiceStubImpl);
diContainer.bind<TagService>(TYPES.TagService).to(TagServiceStubImpl);
diContainer.bind<PluginUsageService>(TYPES.PluginUsageService).to(PluginUsageServiceStubImpl);

export {diContainer};
