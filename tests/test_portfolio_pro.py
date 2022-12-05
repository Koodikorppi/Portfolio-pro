from dotenv import load_dotenv
import requests
load_dotenv() 
import os
import json 
import pytest

URL = os.getenv("URL")
EMAIL = os.getenv("EMAIL")
user_NAME = str(os.getenv("user_NAME"))
PASS_WORD = str(os.getenv("PASS_WORD"))

assert URL, "URL is not set"
assert EMAIL, "EMAIL is not set"
assert user_NAME, "user_NAME is not set"
assert PASS_WORD, "PASS_WORD is not set"


pytest.token = ''
pytest.userId = ''
pytest.userUrl = ''

# api is running
def test_get_api():
    r = requests.get(f'{URL}/')
    assert r.status_code == 401

# signup
def test_post_signup_missing_args_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"email": EMAIL, "password": PASS_WORD}
    r = requests.post(f'{URL}/signup', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert json_res["message"] == 'Missing arguments'

def test_post_signup_email_taken_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": "randomusername", "email": EMAIL, "password": PASS_WORD}
    r = requests.post(f'{URL}/signup', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert json_res["message"] == 'Email taken'

def test_post_signup_user_taken_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": user_NAME, "email": "random.mail@email.fi", "password": PASS_WORD}
    r = requests.post(f'{URL}/signup', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert json_res["message"].lower() == 'username taken'.lower()


# login
def test_post_login_missing_args_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": user_NAME}
    r = requests.post(f'{URL}/login', headers=headers, json=data)
    assert r.status_code == 401

    # AWS lambda: raise Exception(json.dumps(response))
    json_res = json.loads(r.json())
    assert json_res["message"] == 'Missing arguments'

def test_post_login_wrong_creds_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": "wrong_user_name", "password": "wrong_password"}
    r = requests.post(f'{URL}/login', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert 'Could not identify user' in json_res["message"]

def test_post_login_success():
    headers = {'Content-Type': 'application/json'}
    data = {"username": user_NAME, "password": PASS_WORD}

    r = requests.post(f'{URL}/login', headers=headers, json=data)
    assert r.status_code == 200

    # AWS lambda: return {'statusCode': 201,'token': pytest.token'userId': user[0][0] }
    json_res = r.json()

    pytest.token = json_res["token"]

    pytest.userId = json_res["userId"]
    pytest.userUrl = json_res["userUrl"]

    assert len(pytest.token) > 10
    assert len(pytest.userId) > 10



# user/deleteaccount
def test_post_deleteaccount_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"authorizationToken": f'{pytest.token},{pytest.userId}'}
    print('-------')
    print(data)
    print('-------')
    r = requests.post(f'{URL}/deleteaccount', headers=headers, json=data)
    assert r.status_code == 401

    json_res = r.json()

    errorMessage=json_res["message"]
    assert "Missing arguments" in errorMessage


# loadpreviewsections
def test_post_loadpreviewsections_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"token": pytest.token, "url": "some_url"}

    r = requests.post(f'{URL}/loadpreviewsections', headers=headers, json=data)
    assert r.status_code == 200

    json_res = r.json()
    errorMessage=json_res["errorMessage"]
    
    assert "error" in errorMessage
    assert "401" in errorMessage


# loadpreviewcomponents 
def test_post_loadpreviewcomponents_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"token": pytest.token}
    r = requests.post(f'{URL}/loadpreviewcomponents', headers=headers, json=data)
    assert r.status_code == 200

    json_res = r.json()
    errorMessage=json_res["errorMessage"]
    
    assert "error" in errorMessage
    assert "401" in errorMessage


# user/deletesection
def test_post_deletesection_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"not_token ": 'na'}

    r = requests.post(f'{URL}/deletesection', headers=headers, json=data)
    assert r.status_code == 401

    json_res = r.json()
    errorMessage=json_res["message"]
    assert "Missing Authentication Token" in errorMessage

# user/

# user/save
def test_post_save_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"token": pytest.token}

    r = requests.post(f'{URL}/user/save', headers=headers, json=data)
    assert r.status_code == 401


# user/updatepreviewstatus
def test_updatepreviewstatus_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"token": pytest.token, "is_public": True, "userId": "some_user_id"}

    r = requests.post(f'{URL}/user/updatepreviewstatus', headers=headers, json=data)
    
    json_res = r.json()

    assert r.status_code == 401
    assert "Unauthorized" in str(json_res)


# user/verify
def test_verify_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"token": pytest.token, "id": "some_user_id", "verification": "some_verification"}

    r = requests.post(f'{URL}/user/verify', headers=headers, json=data)
    
    json_res = r.json()

    assert "No user found" in json_res
    