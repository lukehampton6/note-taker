const express = require('express');
const fs = require('fs');
const {v1} = require('uuid')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        res.json(data);
    });
});

app.post('/api/notes', (req, res) => {
    let newObject = {
        title: req.body.title,
        text: req.body.text,
        id: v1()
    };
    // use fs.readfile to get db.json data
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
            return
        }
          
    })
    // json parse it so its an array
    // put new object into old one
    // stringify then fs.write file
    fs.appendFile('./db/db.json', JSON.stringify({newObject}), (err) => {
        if (err) {
            console.error(err);
            return
        }
    });
    res.json(newObject);
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let filteredNotes = data.filter(function(notes) {
            return notes.id !== req.params.id;
        })
        fs.writeFile('./db/db.json', filteredNotes, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    })
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});