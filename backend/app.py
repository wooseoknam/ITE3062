from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pymysql
import numpy as np
from scipy.optimize import fsolve
import json

db = pymysql.connect(host='127.0.0.1', user='root', password='ehrl159325!', db='HCI', charset='utf8')

app = Flask(__name__)
CORS(app)

@app.route('/', methods=('GET', ))
def hello_pybo():
    print('@@@@@@@@@@@@@@')
    cursor = db.cursor()
    sql_ = '''
        SELECT * FROM LOGS
        '''
    cursor.execute(sql_)
    data = json.dumps(cursor.fetchall())
    cursor.close()
    return data

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
            values (%s, 1, '2023-10-28', %s)
        '''
    cursor.execute(sql, (count, category))
    db.commit()

    return str(count)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)