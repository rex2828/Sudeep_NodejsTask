## Major libraries used - 

bcryptjs - for password hashing  
dotenv for environment variables  
express backend framework  
jsonwebtoken for authentication  
multer file upload  
mysql2 database npm module  
sharp manipulating file properties  
validator validating email,password strength etc.  


## API endpoints

/api/registerDoctor  
/api/loginDoctor  
/api/registerPatient (requires log in as doctor)  
/api/getPatientCount  
/api/getAllPatients  
/api/getPatientsByDoctor (requires log in as doctor)  
/api/me (requires log in as doctor)  

## How to run
 - to run locally you need to navigate to the project directory and run npm run dev  
 - for deploying this application i used heroku for node app and clever cloud platform for mysql database deployment as heroku asks for CC info for deploying mysql database in it :)


## Important Links
Github repo link -> https://github.com/rex2828/Sudeep_NodejsTask  
Heroku link for the API -> https://sudeep-nodejstask.herokuapp.com/  
TEST URL in browser -> https://sudeep-nodejstask.herokuapp.com/api/getAllPatients  

In the database folder there is a test database dump which can be used to test the app locally.  
I have also given the POSTMAN collection import file which can be imported in POSTMAN and used to check the endpoints.  
