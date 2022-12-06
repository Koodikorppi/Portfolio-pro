import React, {useContext, useState, useEffect} from "react";
import './SettingsContents.css'
import Input from "../common/Input";
import { useForm } from "../../hooks/useForm";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { VALIDATOR_MAXLENGTH, VALIDATOR_URL } from "../../utilities/validators";
import { useHttpClient } from "../../hooks/useHttpClient";
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { AuthContext } from "../../contexts/AuthContext";
import { MessageBox } from "../common/MessageBox";

const orange = {
    500: '#ffa500'
}

const dark = {
    500: '#1a1a1a'
}

const grey = {
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
};
const Root = styled('span')(
    ({ theme }) => `
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
    margin: 10px;
    cursor: pointer;

    &.${switchUnstyledClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }

    & .${switchUnstyledClasses.track} {
      background: ${dark[500]};
      border-radius: 16px;
      border: solid ${grey[500]} 2px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
    }

    & .${switchUnstyledClasses.thumb} {
      display: block;
      width: 16px;
      height: 16px;
      top: 4px;
      left: 4px;
      border-radius: 16px;
      background-color: ${grey[500]};
      position: relative;

      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    }

    &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
      background-color: ${grey[500]};
      box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
    }

    &.${switchUnstyledClasses.checked} {
      .${switchUnstyledClasses.thumb} {
        left: 20px;
        top: 4px;
        background-color: ${orange[500]};
      }

      .${switchUnstyledClasses.track} {
        background: ${dark[500]};
        border: solid ${orange[500]} 2px;
      }
    }

    & .${switchUnstyledClasses.input} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
    `,
  );

const baseUrl = "http://localhost:3000/preview/"

const SettingsContents = () => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const auth = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const {formState, inputHandler, setFormData} = useForm({
        url: {
          value: '',
          isValid: false
        }
      })

    const handlePublicChange = async () => {
      try {
        console.log(auth.userId)
        await sendRequest(
                    `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/updatepreviewstatus`,
                    'POST',
                    JSON.stringify({
                      userId: auth.userId,
                      is_public: !auth.publish
                    }),
                    {
                      'Content-Type': 'application/json',
                      'authorizationToken': `${auth.token},${auth.userId}`
                    }
                  );
        const storedData = JSON.parse(localStorage.getItem('userData'));
        localStorage.setItem('userData', JSON.stringify({...storedData, publish: !auth.publish}))
        auth.setPublish(!auth.publish)
      } catch (error) {
        setMessage(error.message)
      }
    };

    const handleUrlUpdate = async (e) => {
        e.preventDefault()
        const finalUrl = `${baseUrl + formState.inputs.url.value}`
        try {
          await sendRequest(
                      `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/updatepreviewstatus`,
                      'POST',
                      JSON.stringify({
                        userId: auth.userId,
                        url: finalUrl
                      }),
                      {
                        'Content-Type': 'application/json',
                        'authorizationToken': `${auth.token},${auth.userId}`
                      }
                    );
          const storedData = JSON.parse(localStorage.getItem('userData'));
          localStorage.setItem('userData', JSON.stringify({...storedData, url: finalUrl}))
          auth.setUrl(finalUrl)
        } catch (error) {
          setMessage(error.message)
        }
    };

    const empty = formState.inputs.url.value !== "";
    return (
      <div className="settingsContents">
        <h3>Site settings</h3>
        <div className="conentsContainer">
        <div className="publishDiv">
            <p>Publish Site</p>
        <SwitchUnstyled component={Root} disabled={auth.url === ""} checked={auth.publish} onChange={handlePublicChange}/>
        <i><span>&#9432;</span> {auth.publish ? "Portfolio is currently public" : "Portfolio isn't currently public"}</i>
        </div>
        <form onSubmit={handleUrlUpdate} className="addressDiv">
          <h3>Update portfolio name</h3>
          <Input
            element="input"
            id="url"
            type="text"
            label="Portfolio name (max 50 characters)"
            validators={[VALIDATOR_MAXLENGTH(50), VALIDATOR_URL(baseUrl)]}
            errorText="name contains invalid characters or is too long (max 50 characters)"
            onInput={inputHandler}
          />
            <ButtonUnstyled
              type="submit"
              disabled={!formState.isValid || isLoading || !empty}
              data-cy="url_submit_btn"
            >
              Update
            </ButtonUnstyled>
        </form>
        {auth.url !== "" ? <p>Your portfolio <a href={auth.url}>link</a></p> : <p>Portfolio needs name to be public</p>}
        {message !== "" && <MessageBox message={message} setter={setMessage} alert={error}/>}
        </div>
      </div>
    );
}

export default SettingsContents;