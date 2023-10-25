const express = require('express')
const upload = require('express-fileupload')
const app = express();
const bodyParser = require('body-parser'); // Required for parsing form data
const bcrypt = require('bcrypt'); // Required for password hashing
const User = require('./user'); // Your user model
const path = require('path');
const session = require('express-session');
const port = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(upload()); // Serve static files from the current directory

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    if(req.files){
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)
        file.mv('./uploads/'+filename, function(err){
            if(err){
                res.send(err)
            }else{
                res.send("File uploaded")
            }
        })
    }
})

// Define GET and POST routes for user signup
app.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup form
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email is already in use
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).send("Username or email already in use.");
        }

        // Hash and salt the password before storing it in the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Redirect the user to the login page
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Define GET and POST routes for user login
app.get('/login', (req, res) => {
    res.render('login'); // Render the login form
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if a user with the provided username or email exists
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(401).send("Invalid credentials");
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send("Invalid credentials");
        }

        // Create a session to authenticate the user
        req.session.user = user;

        // Redirect the user to a protected route or dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(session({
    secret: 'oinkOink124',
    resave: false,
    saveUninitialized: true
}));



app.listen(5000)
