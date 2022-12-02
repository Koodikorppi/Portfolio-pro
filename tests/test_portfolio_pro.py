from dotenv import load_dotenv
import requests
load_dotenv() 
import os
import json 

URL = os.getenv("URL")
EMAIL = os.getenv("EMAIL")
USER_NAME = str(os.getenv("USER_NAME"))
PASS_WORD = str(os.getenv("PASS_WORD"))

assert URL, "URL is not set"
assert EMAIL, "EMAIL is not set"
assert USER_NAME, "USER_NAME is not set"
assert PASS_WORD, "PASS_WORD is not set"

user_token = ''

# API IS RUNNING
def test_get_api():
    r = requests.get(f'{URL}/')
    assert r.status_code == 401

# SIGNUP
def test_post_signup_missing_args_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"email": EMAIL, "password": PASS_WORD}
    r = requests.post(f'{URL}/signup', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert json_res["body"] == 'Missing arguments'

def test_post_signup_email_taken_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": "randomusername", "email": EMAIL, "password": PASS_WORD}
    r = requests.post(f'{URL}/signup', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert json_res["body"] == 'Email taken'

def test_post_signup_user_taken_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": USER_NAME, "email": "random.mail@email.fi", "password": PASS_WORD}
    r = requests.post(f'{URL}/signup', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert json_res["body"] == 'Username taken'

# LOGIN
def test_post_login_missing_args_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": USER_NAME}
    r = requests.post(f'{URL}/login', headers=headers, json=data)
    assert r.status_code == 401

    # AWS lambda: raise Exception(json.dumps(response))
    json_res = json.loads(r.json())
    assert json_res["body"] == 'Missing arguments'

def test_post_login_wrong_creds_fail():
    headers = {'Content-Type': 'application/json'}
    data = {"username": "wrong_user_name", "password": "wrong_password"}
    r = requests.post(f'{URL}/login', headers=headers, json=data)
    assert r.status_code == 401

    json_res = json.loads(r.json())
    assert 'Could not identify user' in json_res["body"]

def test_post_login_success():
    headers = {'Content-Type': 'application/json'}
    data = {"username": USER_NAME, "password": PASS_WORD}

    r = requests.post(f'{URL}/login', headers=headers, json=data)
    assert r.status_code == 200

    # AWS lambda: return {'statusCode': 201,'token': token,'userId': user[0][0] }
    json_res = r.json()
    user_token = json_res["token"]
    assert len(user_token) > 10
    assert len(json_res["userId"]) > 10

# SAVE
def test_post_save_success():
    headers = {'Content-Type': 'application/json'}
    data = {"token": user_token}

    r = requests.post(f'{URL}/user/save', headers=headers, json=data)
    assert r.status_code == 401