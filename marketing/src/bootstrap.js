import { createBrowserHistory, createMemoryHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
const mount = (el, { onNavigate, defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory();
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(<App history={history} />, el);

    return {
        onParentNavigate: ({ pathname: nextPathname }) => {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        },
    };
};

if (process.env.NODE_ENV === "development") {
    const el = document.querySelector("#_dev_marketing_root");
    if (el) {
        const history = createBrowserHistory();
        mount(el, { defaultHistory: history });
    }
}

export { mount };
