import React, {useContext, useState} from "react";
import './AccountContents.css'
import Input from "../common/Input";
import { useForm } from "../../hooks/useForm";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../utilities/validators";
import { useHttpClient } from "../../hooks/useHttpClient";



// this component handles user settings like changing username, email or password. User can also delete account and decide if current portfolio has public viewing on.
const AccountContents = () => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const emailForm = useForm({
        email: {
          value: '',
          isValid: false
        }
      })

    const passwordForm = useForm(
        {
          oldPass: {
            value: '',
            isValid: false
          },
          newPass1: {
            value: '',
            isValid: false
          },
          newPass2: {
            value: '',
            isValid: false
          }
        }
      );

    const handleEmailChange = (e) => {
        e.preventDefault()
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()
    }

    const isSame = passwordForm.formState.inputs.newPass1.value === passwordForm.formState.inputs.newPass2.value;
    return (
      <div className="accountContents">
        <h3>Account Settings</h3>
        <form onSubmit={handlePasswordChange}>
          <h3>Change Password</h3>
          <Input
            element="input"
            id="oldPass"
            type="password"
            label="Previous password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Enter a valid password, at least 8 characters"
            onInput={passwordForm.inputHandler}
          />
          <div>
            <Input
              element="input"
              id="newPass1"
              type="password"
              label="New password"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="Enter a valid password, at least 8 characters"
              onInput={passwordForm.inputHandler}
            />
            <Input
              element="input"
              id="newPass2"
              type="password"
              label="New password again"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="Enter a valid password, at least 8 characters"
              onInput={passwordForm.inputHandler}
            />

            <ButtonUnstyled
              type="submit"
              disabled={!passwordForm.formState.isValid || isLoading || !isSame}
              data-cy="password_submit_btn"
            >
              Update
            </ButtonUnstyled>
          </div>
        </form>
        
        <form onSubmit={handleEmailChange}>
          
          <h3>Change Email</h3>
          <Input
            element="input"
            id="email"
            type="email"
            label="Change Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Enter a valid password, at least 8 characters"
            onInput={emailForm.inputHandler}
          />
          <ButtonUnstyled
            type="submit"
            disabled={!emailForm.formState.isValid || isLoading}
            data-cy="email_submit_btn"
          >
            Update
          </ButtonUnstyled>
        </form>
        <h3>Danger Zone</h3>
        <ButtonUnstyled
          type="submit"
          data-cy="delete_submit_btn"
          className="delete_btn"
        >
          Delete Account
        </ButtonUnstyled>
      </div>
    );
}

export default AccountContents;