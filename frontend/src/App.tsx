import React from 'react';
import logo from './logo.svg';
// import './App.css';
import {useStore} from "./stores";
import LoginForm from "./LoginForm";
import Chat from "./Chat";
import {observer} from "mobx-react-lite";


const App: React.FC = observer( ()=> {
    const {user} = useStore();
  return (
    <div className="App">
        {user.isLogined?<Chat />:<LoginForm />}
    </div>
  );
});

export default App;
