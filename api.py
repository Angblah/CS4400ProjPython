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
            parser.add_argument('email', type=str, help='Email address to create user')
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

            conn = mysql.connect()
            cursor = conn.cursor()
            #Could try string formatting for statement execute
            ''' 
                stmt = "SELECT * FROM student WHERE Username='{}'"
                cursor.execute(stmt);
            '''                
            cursor.execute("SELECT * FROM student where Username='" + _userUsername + "'")
            data = cursor.fetchall()

            if(len(data)>0):
                if(data):
                    return {'status':200,'student': {'username': data[0][0],
                    'email': data[0][1], 'Major_Name': data[0][2], 'Year': data[0][3]}}
                else:
                    return {'status':100,'message':'Authentication failure'}

        except Exception as e:
            return {'error': str(e)}

api.add_resource(CreateUser, '/api/CreateUser')
api.add_resource(AuthenticateUser, '/api/AuthenticateUser')

if __name__ == '__main__':
    app.run()