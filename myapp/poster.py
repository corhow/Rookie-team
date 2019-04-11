import requests;

data = {
    'action': 'register',
    'username': '范宇豪',
    'password':'123',
    'r_username': '我叫永远的王',
    'r_password': '123'
}

r = requests.get('http://localhost:8080/index', params=data)

print(r.text)
