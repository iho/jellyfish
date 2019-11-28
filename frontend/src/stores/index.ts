import { types, Instance } from "mobx-state-tree"

import { useContext, createContext } from "react"

import {Messages, Message} from "./Messages";
import User from "./User"


export type RootStoreModel = Instance<typeof RootStore>

const RootStore = types.model("RootStore", {
  user: User, messages: Messages
});


export const createStore = (): RootStoreModel => {
  const user = User.create({
      loading: false,
      isLogined: false,
      username: ""
  });
  const messages = Messages.create({all:[]});
    var socket = new WebSocket("ws://" + window.location.host + "/api/ws");
    socket.onmessage = function(event) {
        console.log(event);
        const data = JSON.parse(event.data)
        const  message = {
        senderName: data.username,
        message: data.body,
        id: data._id
       };
       messages.addNewMessage(message);
    };

  return RootStore.create({user, messages})
};

// context to pass in compenents
const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;