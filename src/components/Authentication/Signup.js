import React from "react";
import Input from "../common/Input"
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../utilities/validators";

const Signup = (props) => {
    const {onSubmitHandler, inputHandler, formState, isLoading} = props;
    console.log(formState);
    const isSame = formState.inputs.password.value === formState.inputs.password2.value;
    return(<div className="inputform">
        <form onSubmit={onSubmitHandler}>
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Enter a valid email address"
                    onInput={inputHandler}
                />
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
                <Input
                    element="input"
                    id="password2"
                    type="password"
                    label="Password again"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Enter a valid password, at least 8 characters"
                    onInput={inputHandler}
                />
            <ButtonUnstyled type="submit" disabled={!formState.isValid || !isSame || isLoading} data-cy="signup_submit_btn">
              SIGNUP
            </ButtonUnstyled>
                </form>
    </div>)
}

export default Signup