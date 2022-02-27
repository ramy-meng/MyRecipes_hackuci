from flask import Flask
from flask import request
import requests
import json
from flask_cors import CORS

url = 'https://api.edamam.com/api/recipes/v2' 
appid = "13d3ef3c"
appkey = "c877e6b981dfe35b55518b76f6af9001"

query = {
    'type' :'public'
}
#?type=public&q=chicken&app_id=13d3ef3c&app_key=c877e6b981dfe35b55518b76f6af9001'


app = Flask(__name__)
CORS(app)

@app.route("/search/<userInput>", methods = ["GET"])
def searchRequest(userInput):
    query['q'] = userInput
    query['app_id'] = appid
    query['app_key'] = appkey
    #query['health'] = health
    print(query)
    response = requests.get(url, params = query)
    # relist = {i['recipe']['label'] : 1 for i in response.json()['hits']}
    # print(relist)
    print(response.json())
    return response.json()







if __name__ == '__main__':
    app.run(debug=True) 
                        