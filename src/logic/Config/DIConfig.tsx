import {Container} from "inversify";
import "reflect-metadata";
import {TYPES} from "./Types";
import {AuthenticationService} from "src/logic/services/Authentication";
import {AuthenticationServiceImpl} from "src/logic/services/Authentication/AuthenticationServiceImpl";
import {PluginService} from "src/logic/services/Plugin";
import {TagService} from "src/logic/services/Tags";
import {TagServiceStubImpl} from "src/logic/services/Tags/TagServiceStubImpl";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import {PluginUsageServiceImpl} from "src/logic/services/PluginUsage/PluginUsageServiceImpl";
import {PluginServiceImpl} from "src/logic/services/Plugin/PluginServiceImpl";
import {WebResourceObservingService} from "src/logic/services/WebResourceObserving";
import {WebResourceObservingServiceImpl} from "src/logic/services/WebResourceObserving/WebResourceObservingServiceImpl";
import {TaskService} from "src/logic/services/Task";
import {TaskServiceImpl} from "src/logic/services/Task/TaskServiceImpl";

const diContainer = new Container();
diContainer.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationServiceImpl);
diContainer.bind<PluginService>(TYPES.PluginService).to(PluginServiceImpl);
diContainer.bind<TagService>(TYPES.TagService).to(TagServiceStubImpl);
diContainer.bind<PluginUsageService>(TYPES.PluginUsageService).to(PluginUsageServiceImpl);
diContainer.bind<WebResourceObservingService>(TYPES.WebResourceObservingService).to(WebResourceObservingServiceImpl);
diContainer.bind<TaskService>(TYPES.TaskService).to(TaskServiceImpl);

export {diContainer};
