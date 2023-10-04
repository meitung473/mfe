import { StylesProvider, createGenerateClassName } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
    productionPrefix: "co",
});

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

const history = createBrowserHistory();

export default () => {
    const [isSignIn, setIsSignIn] = useState(false);

    useEffect(() => {
        if (isSignIn) {
            history.push("/dashboard");
        }
    }, [isSignIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Header
                    isSignIn={isSignIn}
                    onSignOut={() => {
                        setIsSignIn(false);
                    }}
                />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/dashboard">
                            {!isSignIn && <Redirect to="/" />}
                            <DashboardApp />
                        </Route>
                        <Route path="/auth">
                            <AuthApp onSignIn={() => setIsSignIn(true)} />
                        </Route>
                        <Route path="/" component={MarketingApp} />
                    </Switch>
                </Suspense>
            </StylesProvider>
        </Router>
    );
};
