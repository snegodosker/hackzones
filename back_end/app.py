from flask import Flask, render_template, jsonify, request
import json
import sqlite3 as sql

app = Flask(__name__)


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    con = sql.connect("problems.db")    
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute("select * from problems")
    allProblems = cur.fetchall()
    con.close()
    return jsonify(allProblems)

@app.route('/data', methods=["POST"])
def add_problem():
    con = sql.connect("problems.db")    
    cur = con.cursor()
    cur.execute('''INSERT INTO problems (room,priority,compactdesc,fulldesc) VALUES (?, ?, ?, ?);''', (request.json['room'], request.json['priority'], request.json['compactdesc'], request.json['fulldesc'],))
    con.commit()
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute("select * from problems")
    allProblems = cur.fetchall()
    con.close()
    return jsonify(allProblems)
    
@app.route("/data/<id>", methods=["DELETE"])
def problem_delete(id):
    con = sql.connect("problems.db")
    cur = con.cursor()
    cur.execute('DELETE FROM problems WHERE id=?', (id,))    
    con.commit()
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute("select * from problems")
    allProblems = cur.fetchall()
    con.close()
    return jsonify(allProblems)    




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')