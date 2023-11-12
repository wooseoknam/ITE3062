from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pymysql
import numpy as np
from scipy.optimize import fsolve
from datetime import datetime

db = pymysql.connect(host='127.0.0.1', user='root', password='ehrl159325!', db='HCI', charset='utf8')

app = Flask(__name__)
CORS(app)

@app.route('/', methods=('GET', ))
def hello_pybo():
    cursor = db.cursor()
    sql_ = '''
        SELECT DISTINCT create_datetime FROM LOGS
        '''
    cursor.execute(sql_)
    dates = cursor.fetchall()
    sql__ = '''SELECT * FROM LOGS'''
    cursor.execute(sql__)
    datas = cursor.fetchall()
    dict = {}
    for date in dates:
        for data in datas:
            if data[3] == date[0]:
                try:
                    dict[str(date[0])].append(data)
                except:
                    dict[str(date[0])] = [data]
    cursor.close()
    return dict

@app.route('/detail', methods=('GET', ))
def detail():
    date = request.args.get('date')
    cursor = db.cursor()
    sql = '''SELECT * FROM LOGS WHERE create_datetime = %s'''
    cursor.execute(sql, (date))
    data = cursor.fetchall()
    dict = {}
    for item in data:
        try:
            dict[item[4]].append(item[1])
        except:
            dict[item[4]] = [item[1]]
    cursor.close()
    return dict

@app.route('/test', methods=('POST',))
def create():
    video = request.files['video']
    if video:
        video.save("C:/Users/ws9706/OneDrive - 한양대학교/3-2/인간컴퓨터상호작용/backend/videos/" + video.filename)

    os.system(r'python C:/Users/ws9706/"OneDrive - 한양대학교"/3-2/인간컴퓨터상호작용/YOLOX/tools/demo.py video -f C:/Users/ws9706/"OneDrive - 한양대학교"/3-2/인간컴퓨터상호작용/YOLOX/exps/example/yolox_voc/yolox_voc_s.py -c C:/Users/ws9706/"OneDrive - 한양대학교"/3-2/인간컴퓨터상호작용/last_epoch_ckpt.pth --path C:/Users/ws9706/"OneDrive - 한양대학교"/3-2/인간컴퓨터상호작용/backend/videos/video.mp4 --conf 0.25 --nms 0.45 --tsize 640 --save_result --device cpu')
    
    f = open("C:/Users/ws9706/OneDrive - 한양대학교/3-2/인간컴퓨터상호작용/backend/logs/temp.txt", 'r')
    lst = []
    while True:
        line = f.readline()
        lst.append(line)
        if not line: break
    f.close()

    y_coordinates = lst[0].split(',')[:-1]
    y_coordinates = list(map(float, y_coordinates))

    dy = np.gradient(y_coordinates)
    zero_points = np.where(np.diff(np.sign(dy)))[0]

    if str(y_coordinates[0])[-1] == '2': 
        filtered_points = [(x_val, y_coordinates[x_val]) for x_val in zero_points if y_coordinates[x_val] >= 1000]
        category = 'dead_lift'
    else: 
        filtered_points = [(x_val, y_coordinates[x_val]) for x_val in zero_points if y_coordinates[x_val] >= 625 and y_coordinates[x_val] < 650] 
        category = 'bench_press'

    count = len(filtered_points)
    cursor = db.cursor()
    sql = '''
            insert into logs (count, user_id, create_datetime, category)
            values (%s, 1, %s, %s)
        '''
    # cursor.execute(sql, (count, datetime.now().strftime('%Y-%m-%d 00:00:00'), category))
    cursor.execute(sql, (count, request.args.get('date'), category))
    db.commit()

    return str(count)

@app.route('/community', methods=('GET',))
def community():
    cursor = db.cursor()
    sql = '''SELECT * FROM QUESTION'''
    cursor.execute(sql)
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

@app.route('/community_detail', methods=('GET', ))
def community_detail():
    cursor = db.cursor()
    id = request.args.get('id')
    sql = '''SELECT * FROM QUESTION WHERE ID = %s'''
    cursor.execute(sql, (id))
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)