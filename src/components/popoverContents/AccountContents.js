import React, {useContext, useState} from "react";
import './AccountContents.css'
import Input from "../common/Input";
import { useForm } from "../../hooks/useForm";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../utilities/validators";
import { useHttpClient } from "../../hooks/useHttpClient";
import { AuthContext } from "../../contexts/AuthContext";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { MessageBox } from "../common/MessageBox";
import { Message } from "semantic-ui-react";
import { LoadingNotif } from "../common/LoadingNotif";



// this component handles user settings like changing username, email or password. User can also delete account and decide if current portfolio has public viewing on.
const AccountContents = () => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const auth = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const emailForm = useForm({
        email: {
          value: '',
          isValid: false
        }
      })

    const confirmForm = useForm({
        confPass: {
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

      const [open, setOpen] = useState(false)

      const handleYes = async (e) => {
        try {
          console.log(auth.userId)
          await sendRequest(
                      `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/deleteaccount`,
                      'POST',
                      JSON.stringify({
                        userId: auth.userId,
                        password: confirmForm.formState.inputs.confPass.value
                      }),
                      {
                        'Content-Type': 'application/json',
                        'authorizationToken': `${auth.token},${auth.userId}`
                      }
                    );
          auth.logout()
          setOpen(false);
        } catch (error) {
          setMessage(error.message)
        }
      };
    const handleEmailChange = async (e) => {
        e.preventDefault()
        try {
          await sendRequest(
                      `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/updateemail`,
                      'PATCH',
                      JSON.stringify({
                        userId: auth.userId,
                        newEmail: emailForm.formState.inputs.email.value,
                      }),
                      {
                        'Content-Type': 'application/json',
                        'authorizationToken': `${auth.token},${auth.userId}`
                      }
                    );
          setMessage("verification link sent to new email!")
        } catch (error) {
          setMessage(error.message)
        }
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        try {
          await sendRequest(
                      `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/updatepassword`,
                      'POST',
                      JSON.stringify({
                        userId: auth.userId,
                        oldpassword: passwordForm.formState.inputs.oldPass.value,
                        newpassword: passwordForm.formState.inputs.newPass1.value
                      }),
                      {
                        'Content-Type': 'application/json',
                        'authorizationToken': `${auth.token},${auth.userId}`
                      }
                    );
          setMessage("password changed!")
          setOpen(false);
        } catch (error) {
          setMessage(error.message)
        }
    }

    const isSame = passwordForm.formState.inputs.newPass1.value === passwordForm.formState.inputs.newPass2.value;
    return (
      <div className="accountContents">
        <ButtonUnstyled
              data-cy="logout_btn"
              onClick={() => auth.logout()}
            >
              Logout
        </ButtonUnstyled>
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
          onClick={() => setOpen(true)}
        >
          Delete Account
        </ButtonUnstyled>
        {message !== "" && <MessageBox message={message} setter={setMessage} alert={error}/>}
        <ModalUnstyled
        id={"popoverwarn"}
        className="modal"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="delete-box">
        <h2 id="child-modal-title">Account loss alert</h2>
          <p id="child-modal-description">
            Input your password and press yes to delete account.
          </p>
          <Input
            element="input"
            id="confPass"
            type="password"
            label="current password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Enter a valid password, at least 8 characters"
            onInput={confirmForm.inputHandler}
          />
          <div className="delete-button-row">
            <ButtonUnstyled onClick={handleYes} disabled={!confirmForm.formState.isValid || isLoading}>Yes</ButtonUnstyled>
            <ButtonUnstyled onClick={() => setOpen(false)}>No</ButtonUnstyled>
          </div>
          {message !== "" && <MessageBox message={message} setter={setMessage} alert={error}/>}
        </div>
      </ModalUnstyled>
      <LoadingNotif state={isLoading}/>
      </div>
    );
}

export default AccountContents;