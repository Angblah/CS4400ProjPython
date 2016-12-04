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

class CreateUser(Resource):
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

class GetDepartments(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT Dept_Name FROM department"
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
            stmt = "SELECT name FROM designation"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class QueryProject(Resource):
    def get(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('title', type=str, help="title of project")
            parser.add_argument('category', type=str, help="category of project")
            parser.add_argument('designation', type=str, help="designation of project")
            parser.add_argument('major', type=str, help="major restriction of project")
            parser.add_argument('year', type=str, help="year restriction of project")
            args = parser.parse_args()

            # if args['title'] is not None:
            #     projTitle = args['title']
            # else:
            #     projTitle = True
            # if args['category'] is not None:
            #     projCategory = args['category']
            # else:
            #     projCategory = True
            # if args['designation'] is not None:
            #     projDesignation = args['designation']
            # else:
            #     projDesignation = True
            # if args['major'] is not None:
            #     projMajor = args['major']
            # else:
            #     projMajor = True
            # if args['year'] is not None:
            #     projYear = args['year']
            # else:
            #     projYear = True

            projTitle = args['title']
            projCategory = args['category']
            projDesignation = args['designation']
            projMajor = args['major']
            projYear = args['year']
            #build onto statements if null
            print(projTitle)
            print(projCategory)
            print(projDesignation)
            print(projMajor)
            print(projYear)
            

            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT DISTINCT Proj_Name from project1 WHERE Proj_Name= '{}' OR P_Designation='{}' AND Maj_Restrict='{}'".format(projTitle,projDesignation,projMajor)
            cursor.execute(stmt)
            data = cursor.fetchall()
            print([{'name':x,'type':'Project'} for x in data])
            if(data):
                return [{'name':x,'type':'Project'} for x in data]
            else:
                return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class QueryCourse(Resource):
    def get(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('title', type=str, help="title of project")
            parser.add_argument('category', type=str, help="category of project")
            parser.add_argument('designation', type=str, help="designation of project")
            parser.add_argument('major', type=str, help="major restriction of project")
            parser.add_argument('year', type=str, help="year restriction of project")
            args = parser.parse_args()

            _projTitle = args['title']
            _projCategory = args['category']
            _projDesignation = args['designation']
            _projMajor = args['major']
            _projYear = args['year']

            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT Proj_Name FROM project1 WHERE Maj_Restrict = '{}'".format(_projMajor)
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class QueryBoth(Resource):
    def get(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('title', type=str, help="title of project")
            parser.add_argument('category', type=str, help="category of project")
            parser.add_argument('designation', type=str, help="designation of project")
            parser.add_argument('major', type=str, help="major restriction of project")
            parser.add_argument('year', type=str, help="year restriction of project")

            args = parser.parse_args()

            _projTitle = args['title']
            _projCategory = args['category']
            _projDesignation = args['designation']
            _projMajor = args['major']
            _projYear = args['year']

            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT Proj_Name FROM project1 WHERE Maj_Restrict = '{}'".format(_projMajor)
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class AddCourse(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('number', type=str, help='Number of course')
            parser.add_argument('name', type=str, help='Name of course')
            parser.add_argument('instructor', type=str, help='Course instructor')
            parser.add_argument('students', type=str, help='Estimated number of students in course')
            parser.add_argument('designation', type=str, help='Designation of course')
            parser.add_argument('category', type=str, help='Course categories')
            args = parser.parse_args()

            _courseNum = args['number']
            _courseName = args['name']
            _courseInstructor = args['instructor']
            _courseStudents = args['students']
            _courseDesignation = args['designation']
            _courseCategory = args['category']

            conn = mysql.connect()
            cursor = conn.cursor()

            # Statement for inserting into courses
            stmt1 = "INSERT INTO course VALUES ('{}','{}','{}','{}','{}')".format(_courseNum,_courseName,_courseInstructor,_courseStudents,_courseDesignation)
            cursor.execute(stmt1)
            data1 = cursor.fetchall() #no data should be returned?
            if(len(data1)>0):
                if(data1):
                    print ('data 1 failure' + data1)
                else:
                    return {'status':100,'message':'Course add failure'}
            conn.commit()

            # Need to insert categories
            _courseCategory = _courseCategory.split(",")
            for category in _courseCategory:
                stmt = "INSERT INTO course_category VALUES ('{}', '{}')".format(_courseName, category)
                cursor.execute(stmt)
                data2 = cursor.fetchall()
                if(len(data2)>0):
                    if(data2):
                        print ('data 2 failure' + data2)
                    else:
                        return {'status':100,'message':'Course add failure in categories'}                
                conn.commit()  
            return "added"
        except Exception as e:
            return {'error': str(e)}

class AddProject(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str, help='Name of project')
            parser.add_argument('description', type=str, help='Description of project')
            parser.add_argument('advisor', type=str, help='Project adviost')
            parser.add_argument('students', type=str, help='Estimated number of students in project')
            parser.add_argument('email', type=str, help='Project Adviosr email')
            parser.add_argument('designation', type=str, help='Project designation')
            parser.add_argument('category', type=str, help='Project categories')
            parser.add_argument('major', type=str, help='Major req for project')
            parser.add_argument('department', type=str, help='Dept req for project')
            parser.add_argument('year', type=str, help='year req for project')
            args = parser.parse_args()

            _projectName = args['name']
            _projectDescription = args['description']
            _projectAdvisor = args['advisor']
            _projectEmail = args['email']
            _projectStudents = args['students']
            _projectCategory = args['category']
            _projectDesignation = args['designation']
            _projectMajor = args['major'] 
            _projectDept = args['department'] 
            _projectYear = args['year']          

            conn = mysql.connect()
            cursor = conn.cursor()

            # Statement for inserting into project
            stmt1 = "INSERT INTO project VALUES ('{}','{}','{}','{}','{}','{}')".format(_projectName,_projectDescription,_projectAdvisor,_projectEmail,_projectStudents,_projectDesignation)
            cursor.execute(stmt1)
            data1 = cursor.fetchall() #no data should be returned?
            print("Executed")
            if(len(data1)>0):
                if(data1):
                    print ('data 1 failure' + data1)
                else:
                    return {'status':100,'message':'Course add failure'}
            conn.commit()

            # Insert categories
            _projectCategory = _projectCategory.split(",")
            for category in _projectCategory:
                stmt2 = "INSERT INTO project_category VALUES ('{}', '{}')".format(category, _projectName)
                cursor.execute(stmt2)
                data2 = cursor.fetchall()
                if(len(data2)>0):
                    if(data2):
                        print ('data 2 failure' + data2)
                    else:
                        return {'status':100,'message':'Course add failure in categories'} 
                conn.commit()             

            # Insert requirements
            # Format SQL statement
            stmt3 = "INSERT INTO project_requirement VALUES('{}'".format(_projectName)
            if(_projectDept != "? string: ?"):
                stmt3 += ", '{}'".format(_projectDept)
            else:
                stmt3 += ", NULL"

            if(_projectYear != "? undefinded:undefined ?"):
                if (_projectYear == "Freshman"):
                    stmt3 += ", '1'"
                elif (_projectYear == "Sophomore"):
                    stmt3 += ", '2'"
                elif (_projectYear == "Junior"):
                    stmt3 += ", '3'"
                elif (_projectYear == "Senior"):
                    stmt3 += ", '4'"
            else:
                stmt3 += ", NULL"

            if(_projectMajor != "? string: ?"):
                stmt3 += ", '{}''".format(_projectMajor)
            else:
                stmt3 += ", NULL"
            stmt3 += ')'

            cursor.execute(stmt3)
            data3 = cursor.fetchall() #no data should be returned?
            if(len(data3)>0):
                if(data3):
                    print ('data 3 failure' + data1)
                else:
                    return {'status':100,'message':'Course add failure'}
            conn.commit()            
            
            return "added"
        except Exception as e:
            return {'error': str(e)}
 
class GetTopTenProjects(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT application.Proj_Name, COUNT(application.Proj_Name) as num_Apps FROM project LEFT OUTER JOIN application ON project.Proj_Name=application.Proj_Name WHERE application.Proj_Name IS NOT NULL GROUP BY application.Proj_Name ORDER BY num_Apps DESC LIMIT 10"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

#Add request url to api
api.add_resource(CreateUser, '/api/CreateUser')
api.add_resource(AuthenticateUser, '/api/AuthenticateUser')
api.add_resource(AddCourse, '/api/AddCourse')
api.add_resource(AddProject, '/api/AddProject')
api.add_resource(GetCategory, '/api/GetCategory')
api.add_resource(GetMajor, '/api/GetMajor')
api.add_resource(GetDepartments, '/api/GetDepartments')
api.add_resource(GetDesignation, '/api/GetDesignation')
api.add_resource(GetTopTenProjects, '/api/GetTopTenProjects')

api.add_resource(QueryProject, '/api/QueryProject')
api.add_resource(QueryCourse, '/api/QueryCourse')
api.add_resource(QueryBoth, '/api/QueryBoth')



if __name__ == '__main__':
    app.run()
