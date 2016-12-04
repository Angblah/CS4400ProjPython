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

            print(_userUsername)

            # Select all student info for profile
            stmt = "SELECT * FROM student WHERE Username='{}'".format(_userUsername)
            cursor.execute(stmt)
            data = cursor.fetchall()
            studentData = {'username': data[0][0], 'email': data[0][1], 'major_name': data[0][2], 'department': 'NONE', 'year': data[0][3]}
            print(data[0])

            if(data[0][2]):
                stmt2 = "SELECT Dept_Name FROM major WHERE Major_Name='{}'".format(data[0][2])
                cursor.execute(stmt2)
                department = cursor.fetchall()
                studentData['department'] = department[0][0]

            #Format return into JSON object
            if(len(data)>0):
                if(data):
                    #Format return into JSON object
                    print(studentData)
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

            print(_userUsername)
            print(_userMjr)
            print(_userYear)

            conn = mysql.connect()
            cursor = conn.cursor()

            # insert into user (username, password, usertype)
            stmt = "UPDATE student SET Major_Name='{}', Year='{}' WHERE Username='{}'".format(_userMjr, _userYear, _userUsername)
            cursor.execute(stmt)
            data = cursor.fetchall() #no data should be returned?

            print(data)

            #Format return into JSON object
            if(len(data)>0):
                return {'status':100,'message':'Update student failure'}

            userData = {'username': _userUsername}
            print(userData)
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
            stmt = "SELECT * FROM major"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    majors = []
                    for m in data:
                        majors.append({'Major_Name': m[0], 'Dept_Name': m[1]})
                    js = json.dumps({'majors': majors})
                    resp = Response(js, status=200, mimetype='application/json')
                    return resp
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

            projTitle = args['title']
            projCategory = args['category']
            projDesignation = args['designation']
            projMajor = args['major']
            projYear = args['year']
            print(projTitle)
            print(projCategory)
            print(projDesignation)
            print(projMajor)
            print(projYear)
            #build onto statements if null

            argys = []
            stmt = "SELECT * from project1 WHERE "
            if args['title'] is not None:
                print('got title')
                stmt += "Proj_Name='{}'"
                argys.append(projTitle)
            if args['category'] is not None:
                if len(argys) != 0:
                    stmt += " AND P_Category='{}'"
                else:
                    stmt += "P_Category='{}'"
                argys.append(projCategory)
            if args['designation'] is not None:
                if len(argys) != 0:
                    stmt += " AND P_Designation='{}'"
                else:
                    stmt += "P_Designation='{}'"
                argys.append(projDesignation)
            if args['major'] is not None:
                if len(argys) != 0:
                    stmt += " AND Maj_Restrict='{}'"
                else:
                    stmt += "Maj_Restrict='{}'"
                argys.append(projMajor)
            if args['year'] is not None:
                if len(argys) != 0:
                    stmt += " AND Yr_Restrict='{}'"
                else:
                    stmt += "Yr_Restrict='{}'"
                argys.append(projYear)

            print (stmt)
            print (argys)
            stmt = stmt.format(*argys)

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(stmt)
            data = cursor.fetchall()
            print([{'proj':x,'type':'Project'} for x in data])
            if(data):
                return [{'proj':x,'type':'Project'} for x in data]
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
            args = parser.parse_args()

            courseTitle = args['title']
            courseCategory = args['category']
            courseDesignation = args['designation']
            print(courseTitle)
            print(courseCategory)
            print(courseDesignation)
            #build onto statements if null

            argys = []
            stmt = "SELECT * from course2 WHERE "
            if args['title'] is not None or args['title'] == "":
                stmt += "Course_Name='{}'"
                argys.append(courseTitle)
            if args['category'] is not None:
                if len(argys) != 0:
                    stmt += " AND C_Category='{}'"
                else:
                    stmt += "C_Category='{}'"
                argys.append(courseCategory)
            if args['designation'] is not None:
                if len(argys) != 0:
                    stmt += " AND C_Designation='{}'"
                else:
                    stmt += "C_Designation='{}'"
                argys.append(courseDesignation)

            print (stmt)
            print (argys)
            stmt = stmt.format(*argys)

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(stmt)
            data = cursor.fetchall()
            print([{'proj':x,'type':'Course'} for x in data])
            if(data):
                return [{'proj':x,'type':'Course'} for x in data]
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
            # Handle adding stuff

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
            parser.add_argument('desination', type=str, help='Project designation')
            parser.add_argument('category', type=str, help='Project categories')
            parser.add_argument('requirement', type=str, help='Requirements for project')
            args = parser.parse_args()

            _projectName = args['name']
            _projectDescription = args['description']
            _projectAdvisor = args['advisor']
            _projectEmail = args['email']
            _projectStudents = args['students']
            _projectCategory = args['category']
            _projectDesignation = args['designation']
            _projectCategory = args['requirement']

            conn = mysql.connect()
            cursor = conn.cursor()

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

class GetProjectByApps(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT * FROM (SELECT Proj_Name, num_Apps, CONVERT((Accepted/num_Apps*100),char) as Acceptance_Rate FROM num_applications NATURAL JOIN (SELECT Proj_Name, SUM(Status) as Accepted FROM application WHERE Status >= 0 GROUP BY Proj_Name) temp_table) with_acceptance_temp NATURAL JOIN (SELECT Proj_Name, GROUP_CONCAT(Major_Name ORDER BY Num_Major_Apps DESC SEPARATOR '/') as Majors FROM project_with_majors GROUP BY Proj_Name) with_proj_temp ORDER BY Acceptance_Rate DESC"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class GetNumApps(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT CONVERT(SUM(num_Apps),char) FROM num_applications"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class GetNumAccepted(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT CONVERT(SUM(Status),char) FROM application WHERE Status >=0"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class GetAdminApplications(Resource):
    def get(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT Proj_Name, Major_Name, Year, Status, Username From application NATURAL JOIN student"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return data
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

class RejectApplication(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('projname', type=str)
            parser.add_argument('username', type=str)
            args = parser.parse_args()

            _projname = args['projname']
            _username = args['username']

            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "UPDATE application SET status = '-1' WHERE Proj_Name = '{}' AND Username = '{}'".format(_projname,_username)
            cursor.execute(stmt)
            data = cursor.fetchall()
            conn.commit()
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

class AcceptApplication(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('projname', type=str)
            parser.add_argument('username', type=str)
            args = parser.parse_args()

            _projname = args['projname']
            _username = args['username']

            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "UPDATE application SET status = '1' WHERE Proj_Name = '{}' AND Username = '{}'".format(_projname,_username)
            cursor.execute(stmt)
            data = cursor.fetchall()
            conn.commit()
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

#Add request url to api
api.add_resource(Student, '/api/Student')
api.add_resource(AuthenticateUser, '/api/AuthenticateUser')
api.add_resource(AddProject, '/api/AddProject')
api.add_resource(GetCategory, '/api/GetCategory')
api.add_resource(GetMajor, '/api/GetMajor')
api.add_resource(GetDesignation, '/api/GetDesignation')

api.add_resource(GetAdminApplications, '/api/GetAdminApplications')
api.add_resource(GetTopTenProjects, '/api/GetTopTenProjects')
api.add_resource(GetProjectByApps, '/api/GetProjectByApps')
api.add_resource(GetNumApps, '/api/GetNumApps')
api.add_resource(GetNumAccepted, '/api/GetNumAccepted')
api.add_resource(RejectApplication, '/api/RejectApplication')
api.add_resource(AcceptApplication, '/api/AcceptApplication')


# api.add_resource(SearchProjects, '/api/SearchProjects')
api.add_resource(AddCourse, '/api/AddCourse')
api.add_resource(QueryProject, '/api/QueryProject')
api.add_resource(QueryCourse, '/api/QueryCourse')
api.add_resource(QueryBoth, '/api/QueryBoth')

if __name__ == '__main__':
    app.run()
