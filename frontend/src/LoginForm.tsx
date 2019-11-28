import { useStore } from "./stores";

import { Button, Form } from "semantic-ui-react";
import React from "react";
import useForm from "react-hook-form";

import { observer } from "mobx-react-lite";

const LoginForm: React.FunctionComponent<{}> = observer(() => {
  const { user } = useStore();
  const { register, handleSubmit, errors } = useForm();

  return (
    <Form onSubmit={handleSubmit(data => user.setUsername(data.username))}>
      <Form.Field>
        <label>Username</label>
        <input
          placeholder="Username"
          name="username"
          ref={register({ required: true })}
        />
        {errors.username && "Username is required."}
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
});
export default LoginForm;
