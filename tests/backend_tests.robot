*** Settings ***
Library           SeleniumLibrary   run_on_failure=Nothing

*** Variables ***
${SERVER}         https://www.saucedemo.com/
${BROWSER}        Chrome
${DRIVER}         chromedriver.exe
${DELAY}          0.5

*** Test Cases ***
Test Checkout
    Prepare Browser
    Login       standard_user     secret_sauce
    Add item To Card    Jacket
    Go to shopping cart
    Continue shopping
    Add item To Card    Backpack
    Go to shopping cart
    Remove item from Cart   Jacket
    Checkout
    Fill form   standard    user    12345
    Finish
    Verify Solved
    
*** Keywords ***
Prepare Browser
    Open Browser    ${SERVER}    ${BROWSER}   executable_path=${DRIVER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
Login
    [Arguments]    ${user}=.    ${password}=
    input text  id=user-name    ${user}
    input text  id=password    ${password}
    Click Button    id=login-button
Add item To Card
    [Arguments]    ${item}=
    Wait Until Page Contains Element   xpath=//*[@id="inventory_container"]/div
    Click Button    xpath=//div[@class='inventory_item' and contains(.,'${item}')]//button[contains(.,'ADD')]
Go to shopping cart
    Wait Until Page Contains Element    xpath=//*[@id="shopping_cart_container"]/a
    Click Link       xpath=//*[@id="shopping_cart_container"]/a
Continue shopping
    Wait Until Page Contains Element    xpath=//*[@id="cart_contents_container"]/div/div[2]/a[1]
    Click Link       xpath=//*[@id="cart_contents_container"]/div/div[2]/a[1]
Remove item from Cart
    [Arguments]    ${item}=
    Wait Until Page Contains Element   xpath=//*[@id="cart_contents_container"]/div/div[1]/div[3]
    Click Button    xpath=//div[@class='cart_item_label' and contains(.,'${item}')]//button[contains(.,'REMOVE')]
Checkout
    Wait Until Page Contains Element    xpath=/html/body/div/div[2]/div[3]/div/div[2]/a[2]
    Click Link       xpath=/html/body/div/div[2]/div[3]/div/div[2]/a[2]
Fill form
    [Arguments]    ${fname}=.   ${sname}=.    ${pcode}=
    Wait Until Page Contains Element   id=checkout_info_container
    input text      id=first-name   ${fname}
    input text      id=last-name   ${sname}
    input text      id=postal-code  ${pcode}
    Wait Until Page Contains Element    xpath=//*[@id="checkout_info_container"]/div/form/div[2]/input
    Submit Form     
Finish
    Wait Until Page Contains Element    xpath=//*[@id="checkout_summary_container"]/div/div[2]/div[8]/a[2]
    Click Link      xpath=//*[@id="checkout_summary_container"]/div/div[2]/div[8]/a[2]
    
Verify Solved
    Wait Until Page Contains Element        xpath=//*[contains(text(), "THANK YOU FOR YOUR ORDER")]
    Close Window
