import React, { useState, useEffect } from "react";
import { Grid, Header, Button, Segment } from "semantic-ui-react";
import { emailValidator, passwordValidator } from "../../core/utils";
import { loginUser } from "../../api/auth";
import Input from "../reusable/Input";
import { createBrowserHistory } from "history";
import { setStorage, getStorage } from "../../core/coldStore";

const history = createBrowserHistory({
  basename: window.location.pathname,
});
const Login = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (getStorage("email") && getStorage("password")) {
      setEmail({ value: getStorage("email"), error: "" });
      setPassword({ value: getStorage("password"), error: "" });
    }
  }, []);

  const handleLogin = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    }

    setLoading(true);

    const response = await loginUser({
      email: email.value,
      password: password.value,
    });

    if (response.error) {
      setError(response.error);
      setLoading(false);
    } else {
      setStorage("email", email.value);
      setStorage("password", password.value);
      history.push("/");
    }
  };

  const clearInputs = () => {
    setEmail({ value: "", error: "" });
    setPassword({ value: "", error: "" });
    setTimeout(() => setError(null), 500);
  };

  if (error && email.value !== "" && password.value !== "") {
    clearInputs();
  }

  return (
    <Segment>
      <Header as="h2" content="Login" />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {error && <p>{error}</p>}
            <Input
              type="email"
              value={email.value}
              placeholder="Email"
              onChange={(e, { value }) => setEmail({ value: value, error: "" })}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Input
              type="password"
              value={password.value}
              placeholder="Password"
              onChange={(e, { value }) =>
                setPassword({ value: value, error: "" })
              }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button
              loading={loading}
              mode="contained"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Login;
