import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import routes from "./Components/routes";
import store from "./redux/store";

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(<Provider store={store}>{routes}</Provider>,
        document.getElementById('app')
    );
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);