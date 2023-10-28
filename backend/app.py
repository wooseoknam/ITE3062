from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pymysql
import numpy as np
from scipy.optimize import fsolve

db = pymysql.connect(host='127.0.0.1', user='root', password='ehrl159325!', db='HCI', charset='utf8')

app = Flask(__name__)
CORS(app)

@app.route('/', methods=('GET', ))
def hello_pybo():
    cursor = db.cursor()
    sql_ = '''
        SELECT * FROM LOGS
        '''
    cursor.execute(sql_)
    data = cursor.fetchall()
    cursor.close()
    return list(data)

@app.route('/test', methods=('POST',))
def create():
    video = request.files['video']
    print("C:/Users/ws9706/OneDrive - 한양대학교/3-2/인간컴퓨터상호작용/backend/videos/" + video.filename)
    if video:
        video.save("C:/Users/ws9706/OneDrive - 한양대학교/3-2/인간컴퓨터상호작용/backend/videos/" + video.filename)
        # return '업로드 성공'
    os.system(r'python C:\Users\ws9706\YOLOX\tools\demo.py video -f C:\Users\ws9706\YOLOX\exps\default\yolox_s.py -c C:\Users\ws9706\epoch_300_ckpt_1.pth --path C:/Users/ws9706/"OneDrive - 한양대학교"/3-2/인간컴퓨터상호작용/backend/videos/video.mp4 --conf 0.25 --nms 0.45 --tsize 640 --device cpu')
    
    f = open("./backend/logs/temp.txt", 'r')
    lst = []
    while True:
        line = f.readline()
        lst.append(line)
        if not line: break
    f.close()
    count = 0

    y_coordinates = lst[0].split(',')[:-1]
    print(y_coordinates)
    y_coordinates = list(map(float, y_coordinates))
    # for i in range(len(lst_) - 1):
    #     if float(lst_[i]) > float(lst_[i+1]) and flag == False:
    #         flag = True
    #         count += 1
    #     else:
    #         flag = False
    # print(count)

    x = np.arange(len(y_coordinates))

    dy = np.gradient(y_coordinates)  # 미분 계산
    zero_points = np.where(np.diff(np.sign(dy)))[0]  # 미분값이 0이 되는 지점 찾기

    filtered_points = [(x_val, y_coordinates[x_val]) for x_val in zero_points if y_coordinates[x_val] >= 600]

    count = len(filtered_points)
    cursor = db.cursor()
    sql = '''
            insert into logs (count, user_id, create_datetime)
            values (%s, 1, '2023-10-28')
        '''
    cursor.execute(sql, (count))

    db.commit()
    # result = {'result': count}
    return str(count)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)