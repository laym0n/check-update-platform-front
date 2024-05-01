import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {SearchPage} from "src/pages/search";
import SignInPage from "src/pages/signin/SignInPage";
import SignUpPage from "src/pages/signup/SignUpPage";
import {darkTheme} from "src/shared/theme";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import initialize from "src/logic/Config/Config";
import {PluginPage} from "src/pages/plugin";
import WebResourcePage from "src/pages/webresources/WebResourcePage";
import PluginCreatePage from "src/pages/plugin_create/PluginCreatePage";
import OwnPluginsPage from "src/pages/own_plugins/OwnPluginsPage";
import TaskCreatePage from "src/pages/task_create/TaskCreatePage";
import TasksPage from "src/pages/tasks/TasksPage";
import TaskOverviewPage from "src/pages/task_overview/TaskOverviewPage";

initialize();

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SearchPage/>}/>
                    <Route path="/tasks" element={<TasksPage/>}/>
                    <Route path="/task/:id/overview" element={<TaskOverviewPage/>}/>
                    <Route path="/plugin/:id" element={<PluginPage/>}/>
                    <Route path="/plugin" element={<PluginCreatePage/>}/>
                    <Route path="/plugin/own" element={<OwnPluginsPage/>}/>
                    <Route path="/plugin/own/:pluginId/task" element={<TaskCreatePage/>}/>
                    <Route path="/plugin/own/:pluginId/task/:taskId" element={<TaskCreatePage/>}/>
                    <Route path="/webresource" element={<WebResourcePage/>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="*" element={<h3>404</h3>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
