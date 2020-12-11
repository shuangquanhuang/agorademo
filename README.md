# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick start

**Start Token Server**

Execute blow scripts in AgoraTokenServer
```
    pip install virtualenv
    virtualenv -p python3 venv
    source venv/bin/activate or env\Scripts\activate
    pip install -r requirements.txt
    gunicorn --bind 127.0.0.1:5000 app:app
```

**Start App**

```
npm install
npm run start
```
