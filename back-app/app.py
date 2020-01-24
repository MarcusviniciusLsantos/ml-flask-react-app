from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import numpy as np
import sys

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Credit Data Classification", 
		  description = "Predict whether the person will earn credit or not")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'salary': fields.Float(required = True, 
				  							   description="salary", 
    					  				 	   help="salary cannot be blank"),
				  'age': fields.Float(required = True, 
				  							   description="age", 
    					  				 	   help="age cannot be blank"),
				  'loan': fields.Float(required = True, 
				  							description="loan", 
    					  				 	help="loan cannot be blank")})
                  
modelSpotify= app.model('Prediction Spotify params', 
				  {'energy': fields.Float(required = True, 
				  							   description="energy", 
    					  				 	   help="energy cannot be blank"),
				  'danceability': fields.Float(required = True, 
				  							   description="danceability", 
    					  				 	   help="danceability cannot be blank"),
				  'liveness': fields.Float(required = True, 
				  							description="liveness", 
    					  				 	help="liveness cannot be blank"),
                   'acousticness': fields.Float(required = True, 
				  							description="acousticness", 
    					  				 	help="acousticness cannot be blank")})


classifier = joblib.load('classifier.joblib')
classifierSpotify = joblib.load('classifier_spotify01.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(np.array(data).reshape(1, -1))
			types = { 0: "Yes", 1: "No"}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "Credit Release Response: " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})
    
@name_space.route("/spotify/")
class MainClassTwo(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(modelSpotify)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifierSpotify.predict(np.array(data).reshape(1, -1))
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "Gender Release Response: " + prediction[0]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})