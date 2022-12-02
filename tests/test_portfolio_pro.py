from dotenv import load_dotenv
import requests
load_dotenv() 
import os

AWS_ID = os.getenv("AWS_ID")
URL = os.getenv("URL")
AWS_TOKEN = os.getenv("AWS_TOKEN")
USER_NAME = str(os.getenv("USER_NAME"))
PASS_WORD = str(os.getenv("PASS_WORD"))
assert AWS_ID, "AWS_ID is not set"
assert URL, "URL is not set"
assert AWS_TOKEN, "AWS_TOKEN is not set"
assert USER_NAME, "USER_NAME is not set"
assert PASS_WORD, "PASS_WORD is not set"

user_token = ''
def test_post_login():
    headers = {'Content-Type': 'application/json'}
    data = {"username": USER_NAME, "password": PASS_WORD}

    r = requests.post(f'{URL}/login', headers=headers, json=data)
    assert r.status_code == 200
    
    json_res = r.json()
    user_token = json_res["token"]
    assert len(user_token) > 10
    assert len(json_res["userId"]) > 10

def test_get_api():
    headers = {'Authorization': f'AWS {AWS_ID}:{AWS_TOKEN}'}
    r = requests.get(f'{URL}/', headers=headers)
    assert r.status_code == 401
