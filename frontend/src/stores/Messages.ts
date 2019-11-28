import {
  flow,
  types,
  Instance,
  applySnapshot,
  getSnapshot
} from "mobx-state-tree";

export const Message = types.model("Message", {
  senderName: types.optional(types.string, ""),
  id: types.optional(types.string, ""),
  message: types.optional(types.string, "")
});
type MessageType = Instance<typeof Message>;
type MessagesType = Instance<typeof Messages>;

export const Messages = types
  .model("Messages", {
    all: types.array(Message)
  })
  .actions(self => ({
    addNewMessage: function(message: MessageType) {
      console.log("received");
      self.all.push(message);
    }
  }));
