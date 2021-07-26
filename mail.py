import json
import urllib.request
import asyncio

URL = "https://api.sendgrid.com/v3/mail/send"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "Bearer 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"
}

MAIL = "emmanuelzakaryan@gmail.com"
NAME = "John Doe"
MESSAGE = "some texte"

DATA = {
    "personalizations":[
        {
            "to":[
                {
                    "email": MAIL,
                    "name": NAME
                }
            ],
        "subject":"Informations"}
    ],
    "content": [
        {
            "type": "text/plain", 
            "value": MESSAGE
        }
    ],
    "from":
        {"email":"selraismes@gmail.com","name":"Troc D'Heures Raismois"},
    "reply_to":
        {"email":"selraismes@gmail.com","name":"Troc D'Heures Raismois"}
}

req = urllib.request.Request(
    URL, 
    data=json.dumps(DATA).encode("utf-8"), 
    headers=HEADERS
)

async def send():
    
    response = await urllib.request.urlopen(req)

    print(response.read().decode('utf8'))
