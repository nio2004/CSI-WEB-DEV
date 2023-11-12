# Assignment 5

## Requirements
The following requirements were laid down:
    a. File upload and download capabilities using Node js and Express js
    b. User authentication
    c. File storage
    d. Associating files with the users that have uploaded them. Users should be able to view only those files that they have uploaded.
    e. Version Control for files

## Project Layout
1. There are two folders- one for frontend and one for backend. The backend folder has a node js app (with express) and the frontend has a react app. 
2. Node handles the following (backend/index2.js):
    a. GET and POST requests:
        i. GET requests for all urls are handled and routed to index.html file in the build directory of react. This serves the js files from frontend. 
        ii. POST requests for registration, login and file upload forms are handled. I have kept all the console.log messages for my own debugging. 
        iii. GET '/userFiles' which returns a .json file of all the files uploaded by that user. Users are identified by sessions. (yes i wrote my own API)
3. Database:
    a. Connecting to MongoDB
    b. Creating database schemas:
        i. User: This stores username (string) and password (string). A new entry is made at '/registration'. Authentication is done at '/login' by checking username with the password.
        ii. File: This stores filename (string), data (buffer), uploaded by (objectID). 
4. Session: This stores the username in a variable after successful authentication. You can use this to retrieve username and userfiles. 
5. AuthContext: In frontend, an AuthContext (frontend/file-up-dwn/Contexts/AuthContext.js) provides
    a. The variable isLoggedIn which is true is the user is logged in and false if not. This is used to hide Routes.
    b. Functions logout and login that are used to set the value of isLoggedin.
6. React Router: Used to route urls of the app.
7. ProtectedRoutes: Uses AuthContext to check whether user is logged in. If not, it redirects you from the '/home' route to '/login'. 

## Dependencies
Other than the ones already present, this project uses the following backend packages in node. Check and install if not present. Additionally, go through backend/package.json to cross-check all dependencies.
1. multer
2. express-session
3. mongoose
4. express
5. body-parser

## For cloning/forking
1. Go to frontend/file-up-dwn in terminal and use npm start. 
2. Go to '/register'. 
3. On another terminal, go to backend and use npm start. 
4. Open MongoDB Atlas and connect the database.
5. Open console and check for errors. 
6. Register a new user and check in MongoDB Atlas to check if user is stored.
7. Go to '/login' and login using the registered username and password. 
8. Upload file.

## Existing problems
1. You may need to refresh the page 1-5 times if the login route does not work. Check console for errors. 

## Further
I have not added any frontend as Assignment 6 contains instructions for that. 




