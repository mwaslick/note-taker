// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// Function that reads the db.JSON file and parses it for the notes data variable
const getJsonData = () => {
  let notesData = fs.readFileSync(path.join(__dirname, "/db/db.json"), "utf-8");
  return JSON.parse(notesData)
}


// HTML Route for viewing the notes code
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API route for getting the notes json file
app.get("/api/notes", function(req, res) {
  let notesData = getJsonData();

  res.json(notesData)
});

// API route for posting notes
app.post("/api/notes", function(req, res) {
  let notesData = getJsonData()

  const newNote = {
    title: req.body.title,
    text: req.body.text
  }

  newNote.id = notesData.length + 1

  console.log(newNote);

  notesData.push(newNote);

  const newNoteState = notesData

  fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(newNoteState));

  return res.json(true)
})

// API route for deleting notes
app.delete("/api/notes/:id", function (req, res) {
  // Reads the db.JSON file and parses it for the notes data variable
  let notesData = getJsonData()

  const deletedNote = req.params.id;

  const newnoteData = notesData.filter(note => note.id != deletedNote);

  fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(newnoteData));
  
  return res.json(true)
});

// API route for all other paths
app.get("*", function(req,res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
 

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
