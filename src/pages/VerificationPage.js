import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../hooks/useHttpClient";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import '../styles/VerificationPage.css';

export const VerificationPage = () => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const params = useParams();

    const urls = {
      "verify-1": {
        "path": "https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/verify",
        "body": {
          "id": `${params.id}`,
          "verification": `${params.hash}`
        }

      },
      "verify-2": {
        "path": "https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/verifyemail",
        "body":{
          "userId": `${params.id}`,
          "updateHash": `${params.hash}`
        }
      }
    }

    const [verified, setVerified] = useState(false)
    useEffect(() => {
        (async () => {
        try {
            const response = await sendRequest(
              urls[params.verify].path,
              'POST',
              JSON.stringify(urls[params.verify].body),
              {
                'Content-Type': 'application/json'
              }
            );
            setVerified(response.data)
          } catch (err) {
            setVerified(false)
          }
        })()

    }, [params])

    const message = () => {
      switch(params.verify){
        case "verify-1":
          return <p>Your account has now been verified.<br></br>You can now {<Link to={'/'}>Login</Link>}</p>
          break;
        case "verify-2":
          return <p>Your new email has now been verified.</p>
          break;
        default:
          return <p>Something went wrong</p>
      }
    }

    return (
    <div className="verification">
      {isLoading ? <div>Verifying</div> :
      <Container text>
      <Header as={'h2'}>Verification success!</Header>
      {message()}
      </Container>}
    </div>)
}

export default VerificationPage;