import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
const generateClassName = createGenerateClassName({
    productionPrefix: "au",
});

export default ({ history, onSignIn }) => {
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route path="/auth/signin">
                        <Signin onSignIn={onSignIn} />
                    </Route>
                    <Route path="/auth/signup">
                        <Signup onSignIn={onSignIn} />
                    </Route>
                </Switch>
            </StylesProvider>
        </Router>
    );
};
