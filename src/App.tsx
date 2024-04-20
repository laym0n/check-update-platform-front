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

initialize();

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SearchPage/>}/>
                    <Route path="/plugin/:id" element={<PluginPage/>}/>
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
