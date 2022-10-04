import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../hooks/useHttpClient";

export const VerificationPage = () => {
    const {isLoading, error, sendRequest} = useHttpClient();
    const params = useParams();
    const [verified, setVerified] = useState(false)
    useEffect(() => {
        (async () => {      
        try {
          console.log(params)
            const response = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/users/${params.id}/verify/${params.hash}`
            )
            setVerified(response.data)
          } catch (err) {
            setVerified(false)
          }
        })()

    }, [params])

    return (
    <div>
      VerificationPage
    </div>)
}

export default VerificationPage;