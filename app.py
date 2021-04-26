import flask
from flask import Flask, render_template, request

# For random tests
import random

app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def home():
    # return "Hello, World!"
    if request.method == 'POST':
        print('Something')
        if request.form['submit_button'] == 'Change Results':
            return render_template('home.html', arg_1=dynamic_page(), arg_2=dynamic_page())
        else:
            pass # unknown
    elif request.method == 'GET':
        return render_template('home.html', arg_1=dynamic_page(), arg_2=dynamic_page())

def dynamic_page():
    seed = random.seed()
    rand_num = random.randrange(0,10)
    return rand_num



if __name__ == '__main__':
    # For debugging
    app.run(host='127.0.0.1', port=8080, debug=True)


# [System.Environment]::SetEnvironmentVariable("PATH", $Env:Path + ";C:\Users\avile\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Python 3.8", "Machine")
