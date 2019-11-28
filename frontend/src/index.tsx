import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, StoreProvider, useStore} from "./stores/index";

import { connectReduxDevtools } from "mst-middlewares";

const rootStore = createStore();

connectReduxDevtools(require("remotedev"), rootStore);


const Root: React.FunctionComponent<{}> = () => (
  <StoreProvider value={rootStore}>
    <App />
  </StoreProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));