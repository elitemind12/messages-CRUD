const express = require('express');
const app = express();
const methodOveride = require('method-override');//npm code kwa ajili ya patch, put and delete request
const port = 5050;
const {v4: uuid} = require('uuid');//npm code kwa ajili ya ku generate unique id.
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());
// To 'fake' put/patch/delete requests:
app.use(methodOveride('_method'));
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// fake database
let messages = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]


//route to display all messages in the web
app.get('/', (req, res) => {
    res.render('index', { messages })
})
//route to display the write space to add new message
app.get('/create', (req, res) => {
    res.render('create')
})
//route to add new message in form of json in fake database
app.post('/', (req, res) => {
    const { username, comment } = req.body;
    messages.push({ username, comment, id: uuid() })
    res.redirect('/');
})
//route to display details for single message in the web
app.get('/:id/details', (req, res) => {
    const { id } = req.params;
    const message = messages.find(m => m.id === id);
    res.render('details', { message });
})
app.get('/:id/update', (req, res) => {
    const { id } = req.params;
    const message = messages.find(m => m.id === id);
    res.render('update', { message });
})
//route to display a space for edit single message in the web
app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const message = messages.find(m => m.id === id);
    const newMessage = req.body.comment;
    message.comment = newMessage;
    res.redirect('/');
})
//route to delete message in the fake database
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    messages = messages.filter(m => m.id !== id);
    res.redirect('/');
})

app.listen(port, () => {
    console.log("on port 5050");
})
