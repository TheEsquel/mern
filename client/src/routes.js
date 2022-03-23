import React from "react";
import { Routes, Route  } from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailsPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {Navigate} from "react-router";

export const useRoutes = isAuthenticated => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
        return (
                <Routes>
                    <Route path="/links" element={<LinksPage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="//details/:id" element={<DetailsPage />} />
                    <Route exact path="/" element={<CreatePage  />} />
                </Routes>
        )
    }
    return (
        <Routes>
            <Route exact path="/" element={<AuthPage />} />
            <Route path="/" exact element={<Navigate to='/' />} />
        </Routes>
    )

}