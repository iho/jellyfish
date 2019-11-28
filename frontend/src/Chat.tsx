import { useStore } from "./stores";
import { ChatFeed, Message } from "react-chat-ui";
import { Button, Form } from "semantic-ui-react";
import React from "react";
import useForm from "react-hook-form";

import { observer } from "mobx-react-lite";

const Chat: React.FunctionComponent<{}> = observer(() => {
  const { user, messages } = useStore();

  async function handleMessageSubmit(message: string) {
    const rawResponse = await fetch("/api/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: user.username, body: message })
    });
    const content = await rawResponse.json();
  }
  const { register, handleSubmit, errors } = useForm();

  console.log(messages.all.slice());
  return (
    <div>
      <ChatFeed
        messages={messages.all} // Boolean: list of message objects
        isTyping={false} // Boolean: is the recipient typing
        hasInputField={false} // Boolean: use our input, or use your own
        showSenderName // show the name of the user who sent the message
        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
        // JSON: Custom bubble styles
        bubbleStyles={{
          text: {
            fontSize: 16
          },
          chatbubble: {
            borderRadius: 30,
            padding: 10
          }
        }}
      />
      <Form onSubmit={handleSubmit(data => handleMessageSubmit(data.message))}>
        <Form.Field>
          <input
            placeholder="message"
            name="message"
            ref={register({ required: true })}
          />
          {errors.message && "Message is required."}
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
});

export default Chat;
