import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {SearchPage} from "src/pages/search";
import {Layout} from "src/pages/layout";
import SignInPage from "src/pages/signin/SignInPage";
import SignUpPage from "src/pages/signup/SignUpPage";
import {darkTheme} from "src/components/styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SearchPage/>}/>
                    <Route path="/test" element={<Layout><h1>test</h1></Layout>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="*" element={<h3>404</h3>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
