import flask
from flask import Flask, render_template, request
import urllib
import os

# For random tests
import random

app = Flask(__name__)

# ------------------------------------------- Pages -----------------------------------------------
@app.route("/", methods=['GET','POST'])
def home():
    return render_template('home.html', title='Home | AndrewLei4Hire')

@app.route("/projects", methods=['GET','POST'])
def projects():
    return render_template('projects.html', title='Projects | AndrewLei4Hire')

@app.route("/matrix", methods=['GET','POST'])
def matrix():
    return render_template('matrix.html', title='Matrix | AndrewLei4Hire')

# --------------------------------------- Homepage AJAX -------------------------------------------

@app.route("/ints/<num>", methods=['GET','POST'])
def interests(num):
    return render_template('ajax/ints_'+num+'.html')

@app.route("/phils/<num>", methods=['GET','POST'])
def philosophies(num):
    return render_template('ajax/phils_'+num+'.html')


# --------------------------------------- Projects AJAX -------------------------------------------

@app.route("/lit_show/<num>", methods=['GET','POST'])
def lit_show(num):
    return render_template('ajax/lit_show_'+num+'.html')

@app.route("/anal_bot/<num>", methods=['GET','POST'])
def anal_bot(num):
    return render_template('ajax/anal_bot_'+num+'.html')

@app.route("/ResumeWebsite/<num>", methods=['GET','POST'])
def ResumeWebsite(num):
    return render_template('ajax/ResumeWebsite_'+num+'.html')

@app.route("/SDP/<num>", methods=['GET','POST'])
def SDP(num):
    return render_template('ajax/SDP_'+num+'.html')

@app.route("/ECE118/<num>", methods=['GET','POST'])
def ECE118(num):
    return render_template('ajax/ECE118_'+num+'.html')


if __name__ == '__main__':
    # For debugging
    app.run(host='127.0.0.1', port=8080, debug=True)


# [System.Environment]::SetEnvironmentVariable("PATH", $Env:Path + ";C:\Users\avile\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Python 3.8", "Machine")
