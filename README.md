# pytest-backend

## Requirements
- python
- conda

## Setup python environment
```
conda create -n backend_pytest python=3.9
conda activate backend_pytest
pip install -r requirements.txt
```

## Create .env file and fill out variables
```
URL={api_url}
USER_NAME={test_account_username}
PASS_WORD={test_account_password}
EMAIL={test_account_email}
```

## Run tests
*use -s option to get console prints working*
```
python -m pytest -s
```
