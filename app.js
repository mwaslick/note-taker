// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notesData = fs.readFileSync(path.join(__dirname, "/db/db.json"), "utf-8");
notesData = JSON.parse(notesData)

// Get Functions

app.get("*", function(req,res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.json(notesData)
});

app.post("/api/notes", function(req, res) {
  const newNote = {
    title: req.body.title,
    text: req.body.text
  }

  newNote.id = notesData.length + 1

  console.log(newNote);

  notesData.push(newNote);

  const newNoteState = notesData

  fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(newNoteState));

  res.json(notesData)
})
 

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
