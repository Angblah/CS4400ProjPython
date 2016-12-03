from flask import Flask, Response, json, send_file
from flask_restful import Resource, Api, reqparse
from flaskext.mysql import MySQL


mysql = MySQL()
app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'cs4400_Team_30'
app.config['MYSQL_DATABASE_PASSWORD'] = 'oHU3I5m6'
app.config['MYSQL_DATABASE_DB'] = 'cs4400_Team_30'
app.config['MYSQL_DATABASE_HOST'] = 'academic-mysql.cc.gatech.edu'

mysql.init_app(app)

@app.route("/")
def login():
    return app.send_static_file('index.html')

api = Api(app)

class Student(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('username', type=str, help='Username to create user')
            parser.add_argument('email', type=str, help='Email to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _userUsername = args['username']
            _userEmail = args['email']
            _userPassword = args['password']

            conn = mysql.connect()
            cursor = conn.cursor()

            # insert into user (username, password, usertype)
            stmt1 = "INSERT INTO user VALUES ('{}', '{}', 'Student')".format(_userUsername,_userPassword)

            cursor.execute(stmt1)
            data1 = cursor.fetchall() #no data should be returned?
            if(len(data1)>0):
                if(data1):
                    print ('data 1 failure' + data1)
                else:
                    return {'status':100,'message':'Register failure'}
            conn.commit()

            # insert into student (Username, Email, Major_Name, Year)
            stmt2 = "INSERT INTO student (Username, Email) VALUES ('{}', '{}')".format(_userUsername,_userEmail)
            cursor.execute(stmt2)
            data2 = cursor.fetchall() #no data should be returned?
            if(len(data2)>0):
                if(data2):
                    print ('data 2 failure' + data2)
                else:
                    return {'status':100,'message':'Register failure'}
            conn.commit()
            #Format return into JSON object
            userData = {'username': _userUsername, 'userType':'Student'}
            js = json.dumps(userData)
            resp = Response(js, status=200, mimetype='application/json')
            return resp

        except Exception as e:
            return {'error': str(e)}

    def get(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('username', type=str, help='Username to filter the student')
            args = parser.parse_args()

            _userUsername = args['username']

            conn = mysql.connect()
            cursor = conn.cursor()

            # Select all student info for profile
            stmt = "SELECT * FROM student WHERE Username='{}'".format(_userUsername)
            cursor.execute(stmt)
            data = cursor.fetchall()

            stmt = "SELECT DEPARTMENT FROM major WHERE Major_Name='{}'".format(data[0][2])
            cursor.execute(stmt2)
            department = cursor.fetchall()

            #Format return into JSON object
            if(len(data)>0):
                if(data):
                    #Format return into JSON object
                    studentData = {'username': data[0][0], 'email': data[0][1], 'major_name': data[0][2], 'department': department[0][1], 'year': data[0][3]}
                    js = json.dumps(studentData)
                    resp = Response(js, status=200, mimetype='application/json')
                    return resp
                else:
                    return {'status':100,'message':'Student Get failure'}

        except Exception as e:
            return {'error': str(e)}
        
    def put(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('username', type=str, help='Username to select user to update')
            parser.add_argument('major_name', type=str, help='Major name to update')
            parser.add_argument('year', type=str, help='Year to update')
            args = parser.parse_args()

            _userUsername = args['username']
            _userMjr = args['major_name']
            _userYear = args['year']

            conn = mysql.connect()
            cursor = conn.cursor()

            # insert into user (username, password, usertype)
            stmt = "UPDATE student SET Major_Name='{}', Year='{}' WHERE Username='{}'".format(_userMjr, _userYear, _userUsername)
            cursor.execute(stmt)
            data = cursor.fetchall() #no data should be returned?

            #Format return into JSON object
            if(len(data)>0):
                return {'status':100,'message':'Update student failure'}

            userData = {'username': _userUsername}
            js = json.dumps(userData)
            resp = Response(js, status=200, mimetype='application/json')
            return resp
        except Exception as e:
            return {'error': str(e)}

class AuthenticateUser(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('username', type=str, help='Username for Authentication')
            parser.add_argument('password', type=str, help='Password for Authentication')
            args = parser.parse_args()

            _userUsername = args['username']
            _userPassword = args['password']
            isStudent = False

            conn = mysql.connect()
            cursor = conn.cursor()
            #Could try string formatting for statement execute
            #Check for username AND password match in user table
            stmt = "SELECT * FROM user WHERE Username='{}' AND Password='{}'".format(_userUsername,_userPassword)
            cursor.execute(stmt)
            data = cursor.fetchall()

            if(len(data)>0):
                if(data):
                    #Format return into JSON object
                    userData = {'username': data[0][0], 'userType': data[0][2]}
                    js = json.dumps(userData)
                    resp = Response(js, status=200, mimetype='application/json')
                    return resp
                else:
                    return {'status':100,'message':'Authentication failure'}

        except Exception as e:
            return {'error': str(e)}

class GetCategory(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT * FROM category"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}
class GetMajor(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT Major_Name FROM major"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}
class GetDesignation(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT NAME FROM designation"
            cursor.execute(stmt)
            data = cursor.fetchall()
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}
class GetMajor(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT Major_Name FROM major"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}
class GetDesignation(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT NAME FROM designation"
            cursor.execute(stmt)
            data = cursor.fetchall()
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class AddCourse(Resource):
    # Handles loading of categories, designation, major, department
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            # All statements to fetch info with
            stmtCat = "SELECT * FROM category"
            stmtDes = "SELECT * FROM designation"
            stmtMajor = "SELECT * FROM major"
            stmtDepts = "SELECT * FROM department"
            # Category fetch
            cursor.execute(stmtCat)
            catData = cursor.fetchall()
            # Designation fetch
            cursor.execute(stmtDes)
            desData = cursor.fetchall()
            # Major fetch
            cursor.execute(stmtMajor)
            majorData = cursor.fetchall()
            # Department fetch
            cursor.execute(stmtDepts)
            depData = cursor.fetchall()

            if(len(catData) > 0 and len(desData) > 0 
                and len(majorData) > 0 and len(depData) > 0):

                if(catData and desData and majorData and depData):
                    # Dictionary to use for JSON
                    jsData = {'category': None, 'designation': None, 'major': None, 'department': None}
                    # Put majors into dictionary
                    majors = []
                    for m in majorData:
                        majors.append(m[0])
                    jsData['major'] = majors
                    # Put designations into dictionary
                    designations = []
                    for d in desData:
                        designations.append(d[0])
                    jsData['designation'] = designations
                    # Put departments into dictionary
                    departments = []
                    for dp in depData:
                        departments.append(dp[0])
                    jsData['department'] = departments
                    # Put categories into dictionary
                    categories = []
                    for c in catData:
                        categories.append(c[0])
                    jsData['category'] = categories
                    # Dump into json
                    js = json.dumps(jsData)
                    resp = Response(js, status=200, mimetype='application/json')
                    return resp
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)} 

#Add request url to api
api.add_resource(Student, '/api/Student')
api.add_resource(AuthenticateUser, '/api/AuthenticateUser')

api.add_resource(GetCategory, '/api/GetCategory')
api.add_resource(GetMajor, '/api/GetMajor')
api.add_resource(GetDesignation, '/api/GetDesignation')

api.add_resource(SearchProjects, '/api/SearchProjects')
api.add_resource(AddCourse, '/api/AddCourse')



if __name__ == '__main__':
    app.run()
