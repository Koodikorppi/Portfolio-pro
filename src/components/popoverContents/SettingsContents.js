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
import { v4 as uuidv4 } from 'uuid';

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

const baseUrl = "https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/preview/"

const SettingsContents = () => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const [publish, setPublish] = useState(false)
    const auth = useContext(AuthContext)
    const {formState, inputHandler, setFormData} = useForm({
        url: {
          value: '',
          isValid: false
        }
      })

    const handlePublicChange = () => {
        setPublish(!publish)
    }

    const handleUrlUpdate = async (e) => {
        e.preventDefault()
        const finalUrl = `${baseUrl + formState.Input.url.value}`
        auth.setUrl(finalUrl)
    }
    const empty = formState.inputs.url.value !== "";
    return (
      <div className="settingsContents">
        <h3>Site settings</h3>
        <div className="conentsContainer">
        <div className="publishDiv">
            <p>Publish Site</p>
        <SwitchUnstyled component={Root} checked={publish} onChange={handlePublicChange}/>
        <p>{publish ? "portfolio is currently public" : "portfolio isnt currently public"}</p>
        </div>
        <form onSubmit={handleUrlUpdate} className="addressDiv">
          <h3>Update portfolio name</h3>
          <Input
            element="input"
            id="url"
            type="text"
            label="portfolio name (max 50 characters)"
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
        <p>Current url: {auth.url}</p>
        </div>
      </div>
    );
}

export default SettingsContents;