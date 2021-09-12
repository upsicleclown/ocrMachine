from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
  return render_template("canvas_page.html")

@app.route("/process_image", methods = ["POST"])
def process_image():
  image_b64 = request.values['imageBase64'];
  return jsonify(image_b64)



if __name__ == '__main__':
	app.run(debug=True)
  