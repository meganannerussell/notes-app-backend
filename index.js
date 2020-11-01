const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/notes", async (req, res) => {
  try {
    const { title, description, color } = req.body;
    const newNote = await db.query(
      "INSERT INTO notes (title, description, color) VALUES($1, $2, $3) RETURNING *",
      [title, description, color]
    );

    res.json(newNote.rows[0]);
    res.send("hello");
  } catch (err) {
    console.log("hello this is", err);
  }
});

app.get("/notes", async (req, res) => {
  try {
    const allNotes = await db.query("SELECT * FROM notes");
    res.json(allNotes.rows);
  } catch (err) {
    console.log(err);
  }
});

// app.get("/notes/:id", async(req,res)=>{
//   try{
//   }catch(err){
//     console.log(err)
//   }
// })

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await db.query("DELETE FROM notes WHERE id =$1", [id]);
    res.json("Note was deleted");
  } catch (err) {
    console.log(err);
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newTitle, newDescription, newColor } = req.body;
    const updatedNote = await db.query(
      "UPDATE notes SET (title, description, color) = ($1, $2, $3) WHERE id = $4",
      [newTitle, newDescription, newColor, id]
    );
    res.json(updatedNote);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("server has started on port " + port);
});
