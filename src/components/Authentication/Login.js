import React from "react";
import Input from "../common/Input"
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { VALIDATOR_MINLENGTH } from "../../utilities/validators";

const Login = (props) => {
    const {onSubmitHandler, inputHandler, formState, isLoading} = props;

    return(<div className="inputform">
        <form onSubmit={onSubmitHandler}>
                <Input
                    element="input"
                    id="username"
                    type="text"
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
            <ButtonUnstyled type="submit" disabled={!formState.isValid || isLoading} data-cy="login_submit_btn">
              LOGIN
            </ButtonUnstyled>
                </form>
    </div>)
}

export default Login;