import { flow, types } from "mobx-state-tree";

const User = types
  .model("User", {
    username: types.optional(types.string, ""),
    isLogined: types.optional(types.boolean, false),
    isTyping: types.optional(types.boolean, false),
    loading: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setUsername: function(newUsername: string) {
      self.username = newUsername;
      self.loading = true;
      self.isLogined = true;
    }
  }));

export default User;
