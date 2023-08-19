from flask import Flask, render_template, request, jsonify, redirect
import openai


app = Flask(__name__)

openai.api_key = "YOUR_OPENAI_API_KEY_HERE" 

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api", methods=["GET", "POST"])
def api():
    if request.method == "POST":
        
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
        {
        "role": "user",
        "content": request.json.get('question')
        }
        ],
    temperature=1,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
        )

        print(response)
        data = {"result":f"{response.choices[0].message.content}"}
        return jsonify(data)
    return redirect("/")

app.run(debug=True)