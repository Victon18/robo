from flask import Flask, request, jsonify, render_template
from flask import url_for,make_response

app = Flask(__name__)

# # NLP processing: simple rule-based intent classification
def classify_command(command):
    command = command.lower()
    if "walk" in command:
        return "walk_forward"
    elif "hello" in command:
        return "say_hello"
    elif "stop" in command:
        return "stop"
    return "unknown"
@app.route('/process-command/', methods=['POST', 'GET'])
def process_command():
     # if request.method == 'POST':
     #     return "error"
    req = request.get_json()
    print(req)
    command = req
    action = classify_command(command)
    res = make_response(jsonify({"action":action}),200)
    return res

@app.route('/')
def home():
   return render_template('home.html')

@app.route("/favicon.ico")
def favicon():
    return url_for('static', filename='data:,')

if __name__ == "__main__":
    app.run(debug=True)
