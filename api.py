from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flaskext.mysql import MySQL
from flask import send_file

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
            parser.add_argument('username', type=str, help='Email address to create user')
            parser.add_argument('')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']

            return {'Email': args['email'], 'Password': args['password']}

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
                    return {'status':200,'user': {'username': data[0][0], 'userType': data[0][2]}}
                else:
                    return {'status':100,'message':'Authentication failure'}

        except Exception as e:
            return {'error': str(e)}
class searchProjects(Resource):
    # def post(self):
    #     try:
    #         # Parse the arguments
    #         parser = reqparse.RequestParser()
    #         parser.add_argument('title', type=str, help='Title of project')
    #         parser.add_argument('category', type=str, help='Category of project')
    #         parser.add_argument('designation', type=str, help='Designation of project')
    #         parser.add_argument('major', type=str, help='Major of project')
    #         parser.add_argument('year', type=str, help='Year of project')
    #         parser.add_argument('type', type=str, help='Type of project')
    #         args = parser.parse_args()

    #         _projTitle = args['title']
    #         _projCateogry = args['category']
    #         _projDesignation = args['designation']
    #         _projMajor = args['major']
    #         _projYear = args['year']
    #         _projType = args['type']

    #         conn = mysql.connect()
    #         cursor = conn.cursor()
    #         #Could try string formatting for statement execute
    #         #Check for username AND password match in user table
    #         stmt = "SELECT * FROM projects"
    #         cursor.execute(stmt)
    #         data = cursor.fetchall()
    def getCategory(self):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            stmt = "SELECT * FROM category"
            cursor.execute(stmt)
            data = cursor.fetchall()
            if(len(data)>0):
                if(data):
                    return {'status':200,'categories': {'categories': data[0][0]}}
                else:
                    return {'status':100,'message':'Failure'}
        except Exception as e:
            return {'error': str(e)}

api.add_resource(CreateUser, '/api/CreateUser')
api.add_resource(AuthenticateUser, '/api/AuthenticateUser')
api.add_resource(CreateUser, '/api/CreateUser')


if __name__ == '__main__':
    app.run()