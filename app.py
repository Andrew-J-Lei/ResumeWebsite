import flask
from flask import Flask, render_template, request
import urllib

# My page library
import pages

# For random tests
import random

app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def home():
    content = pages.home
    return render_template('basic_page.html', title='Home | AndrewLei4Hire' , content=content)

def dynamic_page():
    seed = random.seed()
    rand_num = random.randrange(0,10)
    return rand_num



if __name__ == '__main__':
    # For debugging
    app.run(host='127.0.0.1', port=8080, debug=True)


# [System.Environment]::SetEnvironmentVariable("PATH", $Env:Path + ";C:\Users\avile\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Python 3.8", "Machine")
