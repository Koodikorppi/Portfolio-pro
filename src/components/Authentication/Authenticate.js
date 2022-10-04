import React, {useContext, useState} from 'react'
import { Button } from 'semantic-ui-react'
import Signup from './Signup';
import Login from './Login';
import '../../styles/Authentication.css';
import { AuthContext } from '../../contexts/AuthContext';
import {useHttpClient} from '../../hooks/useHttpClient';
import { useForm } from '../../hooks/useForm';


const AuthMode = {
  signup: 'signup',
  login: 'login'
}

const Authenticate = () => {
    const auth = useContext(AuthContext);
    const [loginMode, setLoginMode] = useState(AuthMode.login);
    const {isLoading, error, sendRequest} = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
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

      if (loginMode) {
        try {
          const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/login`,
            'POST',
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          auth.login(response.userId, response.token);
        } catch (err) {}
      } else {
        try {
          const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
            'POST',
            JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          auth.login(response.userId, response.token);
        } catch (err) {}
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
    }

    const mode = loginMode === AuthMode.login ?
      <Login
      onSubmitHandler={onSubmitHandler}
      inputHandler={inputHandler}
      formState={formState}
      /> :
      <Signup
      onSubmitHandler={onSubmitHandler}
      inputHandler={inputHandler}
      formState={formState}
      />

    return (
        <div className='authentication'>
            <div>
                <Button disabled={loginMode == AuthMode.login} onClick={() => switchModeHandler(AuthMode.login)} data-cy="switch_to_login_btn">Log in</Button>
                <Button disabled={loginMode == AuthMode.signup} onClick={() => switchModeHandler(AuthMode.signup)} data-cy="switch_to_signup_btn">Sign up</Button>
            </div>
            {mode}
        </div>)
}
export default Authenticate;