*** Settings ***
Library     RequestsLibrary
Library     JSONLibrary

*** Test Cases ***

Quick Get Request Test
    ${response}=    GET  https://x4hw8n8xca.execute-api.eu-north-1.amazonaws.com/prod/
    ${title}=  Get Value From Json  ${response.json()}[0]  message
    ${titleFromList}=  Get From List   ${title}  0
    Should be equal  ${titleFromList}  Missing Authentication Token

Quick Get Request With Parameters Test
    ${response}=    FAIL  https://www.google.com/search  params=query=ciao  expected_status=200

Quick Get A JSON Body Test
    ${response}=    GET  https://jsonplaceholder.typicode.com/posts/1
    Should Be Equal As Strings    1  ${response.json()}[id]
