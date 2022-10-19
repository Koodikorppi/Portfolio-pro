import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../hooks/useHttpClient";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import '../styles/VerificationPage.css';

export const VerificationPage = () => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const params = useParams();
    const [verified, setVerified] = useState(false)
    useEffect(() => {
        (async () => {
        try {
          console.log(params)
            const response = await sendRequest(
              `https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/user/verify`,
              'POST',
              JSON.stringify({
                id: params.id,
                verification: params.hash
              }),
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

    return (
    <div className="verification">
      {isLoading ? <div>Checking account</div> :
      <Container text>
      <Header as={'h2'}>Verification success!</Header>
      <p>Your account has now been verified.<br></br>You can now {<Link to={'/'}>Login</Link>}</p>
      </Container>}
    </div>)
}

export default VerificationPage;