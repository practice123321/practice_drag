from flask import Flask, request, render_template, redirect
import xlrd 
import csv
import pandas as pd
import collections

app = Flask(__name__)
nested_dic = collections.defaultdict(lambda : collections.defaultdict(list))

@app.route('/getdata', methods = ['GET'])
def getdata():
    global nested_dic
    list1 = list(nested_dic.keys())
    #list1.sort(key = lambda x: len(x))
    list2 = list(nested_dic['Singapore'].keys())
    return {
        "list1": list1,
        "list2": list2
    }

@app.route('/getalldata', methods = ['GET'])
def getalldata():
    global nested_dic
    return {
        "result": nested_dic,
    }

if __name__ == "__main__":
    csvfile = '500000.csv'
    '''
    sheet = xlrd.open_workbook(filepath).sheet_by_index(1)
    col = csv.writer(open("500000.csv", 'w', newline=""))
    for row in range(sheet.nrows):
        col.writerow(sheet.row_values(row))
    '''
    with open(csvfile, 'r') as c:
        csvreader = csv.reader(c)
        for row in csvreader:
            nested_dic[row[1]][row[2]].append(row)
    app.run(debug=True)