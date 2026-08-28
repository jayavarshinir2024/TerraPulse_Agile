from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import base64
import os
import traceback

from orchestrator import lambda_handler 

app = Flask(__name__)
# Increase max request body size to 16MB to prevent payload rejections
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

@app.route('/process', methods=['POST', 'OPTIONS'])
@app.route('/process/', methods=['POST', 'OPTIONS'])
def process_document():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        if request.is_json:
            payload = request.get_json() or {}
        elif 'file' in request.files:
            file = request.files['file']
            doc_type = request.form.get('doc_type', 'kcc_form')
            target_language = request.form.get('target_language', 'English')
            
            file_bytes = file.read()
            base64_data = base64.b64encode(file_bytes).decode('utf-8')
            _, ext = os.path.splitext(file.filename)
            
            payload = {
                "image_base64": base64_data,
                "doc_type": doc_type,
                "target_language": target_language,
                "extension": ext.lower() if ext else '.jpg'
            }
        else:
            payload = request.form.to_dict()

        query_params = request.args.to_dict()

        aws_event = {
            "body": json.dumps(payload),
            "queryStringParameters": query_params
        }

        lambda_response = lambda_handler(aws_event, None)
        
        response_body = json.loads(lambda_response.get("body", "{}"))
        status_code = lambda_response.get("statusCode", 200)

        return jsonify(response_body), status_code

    except Exception as e:
        error_details = traceback.format_exc()
        print(f"❌ Route Execution Error Traceback:\n{error_details}")
        return jsonify({
            "status": "ERROR", 
            "error": str(e),
            "traceback": error_details
        }), 500

if __name__ == '__main__':
    print("Starting TerraPulse Local Backend Server on port 5000...")
    app.run(port=5000, debug=True)