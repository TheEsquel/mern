import React from "react";
import { Routes, BrowserRouter as Router, Route, Link,  } from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailsPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {Navigate} from "react-router";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
                <Routes>
                    <Route path="/links" exact>
                        <LinksPage />
                    </Route>
                    <Route path="/create" exact>
                        <CreatePage />
                    </Route>
                    <Route path="/details/:id" >
                        <DetailsPage />
                    </Route>
                    <Navigate to='/create' />
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