import flask
from flask import Flask, render_template, request
import urllib
import os

# My page library

# For random tests
import random

app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def home():
    return render_template('home.html', title='Home | AndrewLei4Hire')

def dynamic_page():
    seed = random.seed()
    rand_num = random.randrange(0,10)
    return rand_num


@app.route("/ints_1.html", methods=['GET','POST'])
def interests_1():
    return render_template('ajax/ints_1.html')

@app.route("/ints_2.html", methods=['GET','POST'])
def interests_2():
    return "sucka2"
    # return render_template('ajax/interests_1.html')

@app.route("/ints_3.html", methods=['GET','POST'])
def interests_3():
    return "sucka3"
    # return render_template('ajax/interests_1.html')

@app.route('/bubbles/<num>')
def get_bubble(num):
    return (os.getcwd())
    # return send_file(filename, mimetype='image/gif')


if __name__ == '__main__':
    # For debugging
    app.run(host='127.0.0.1', port=8080, debug=True)


# [System.Environment]::SetEnvironmentVariable("PATH", $Env:Path + ";C:\Users\avile\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Python 3.8", "Machine")
