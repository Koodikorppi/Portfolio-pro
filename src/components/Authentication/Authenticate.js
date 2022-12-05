import React, {useContext, useState, useEffect} from 'react'
import { Button } from 'semantic-ui-react'
import Signup from './Signup';
import Login from './Login';
import '../../styles/Authentication.css';
import { AuthContext } from '../../contexts/AuthContext';
import {useHttpClient} from '../../hooks/useHttpClient';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router';
import { MessageBox } from '../common/MessageBox';


const AuthMode = {
  signup: 'signup',
  login: 'login'
}

const Authenticate = () => {
    const auth = useContext(AuthContext);
    const [loginMode, setLoginMode] = useState(AuthMode.login);
    const {isLoading, error, sendRequest} = useHttpClient();
    const [message, setMessage] = useState("")
    const navigate = useNavigate();


    const {formState, inputHandler, setFormData} = useForm(
      {
        username: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false
        }
      }
    );

    const onSubmitHandler = async event => {
      event.preventDefault();
      if (loginMode == AuthMode.login) {
        try {
          console.log(formState)
          const response = await sendRequest(
            `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/login`,
            'POST',
            JSON.stringify({
              username: formState.inputs.username.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          auth.login(response.userId, response.token, response.userUrl, response.public);
          navigate("/user")
        } catch (err) {
          setMessage(err.message)
        }
      } else {
        try {
          await sendRequest(
            `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/signup`,
            'POST',
            JSON.stringify({
              username: formState.inputs.username.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          setMessage("Verification link has been sent to your email. Please click it to verify account.")
        } catch (err) {
          setMessage(err.message)
        }
      }
    };

    const switchModeHandler = (mode) => {
      if (mode == AuthMode.login) {
        setFormData(
          {
            username: {
              value: '',
              isValid: false,
            },
            password: {
              value: '',
              isValid: false,
            }
          },
          formState.inputs.email.isValid && formState.inputs.password.isValid);
      } else {
        setFormData(
          {
            email: {
              value: '',
              isValid: false,
            },
            username: {
              value: '',
              isValid: false,
            },
            password: {
              value: '',
              isValid: false,
            },
            password2: {
              value: '',
              isValid: false,
            }
          }, false);
      }
      setLoginMode(mode);
      setMessage("")
    }

    const mode = loginMode === AuthMode.login ?
      <Login
      onSubmitHandler={onSubmitHandler}
      inputHandler={inputHandler}
      formState={formState}
      isLoading={isLoading}
      /> :
      <Signup
      onSubmitHandler={onSubmitHandler}
      inputHandler={inputHandler}
      formState={formState}
      isLoading={isLoading}
      />

      return (
        <div className='authentication'>
          <div className='login_wrapper'>
            <div className='switch_login'>
                <Button disabled={loginMode == AuthMode.login} onClick={() => switchModeHandler(AuthMode.login)} data-cy="switch_to_login_btn">Log in</Button>
                <Button disabled={loginMode == AuthMode.signup} onClick={() => switchModeHandler(AuthMode.signup)} data-cy="switch_to_signup_btn">Sign up</Button>
          </div>
            {mode}
        </div>
        {message !== "" && <MessageBox message={message} setter={setMessage} alert={error}/>}
        </div>)
}
export default Authenticate;