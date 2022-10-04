import React from "react";
import Input from "../Input"
import { Button } from "semantic-ui-react";
import { VALIDATOR_MINLENGTH } from "../../utilities/validators";

const Login = (props) => {
    const {onSubmitHandler, inputHandler, formState} = props;

    return(<div className="inputform">
        <form onSubmit={onSubmitHandler}>
                <Input
                    element="input"
                    id="username"
                    type="submit"
                    label="Username"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Enter a valid username, at least 6 characters"
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Enter a valid password, at least 8 characters"
                    onInput={inputHandler}
                />
            <Button type="submit" disabled={!formState.isValid}>
              LOGIN
            </Button>
                </form>
    </div>)
}

export default Login;