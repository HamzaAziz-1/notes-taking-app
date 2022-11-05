var Notedb = require("../model/model");


// create and save new note
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.render('error',{ error: "Content can not be emtpy!" });
    return;
  }
  let currentDate = new Date();
  let newDate = currentDate.toString().slice(0, 24);
  // new note
  const note = new Notedb({
    title: req.body.title,
    description: req.body.description,
    time: newDate,
   
  });

   // save note in the database
   note
     .save(note)
     .then((data) => {
       //res.send(data)
       res.redirect("/add-note");
     })
     .catch((err) => {
       res.render("error", { error: err });
     });
    
};

// retrieve and return all notes/ retrive and return a single note
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Notedb.findById(id)
      .then((data) => {
        if (!data) {
          res.render('error',{ error: "Not found note with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.render('error',{ error: "Error retrieving note with id " + id });
      });
  } else {
    Notedb.find()
      .then((note) => {
        res.send(note);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving note information",
          });
      });
  }
};

// Update a new idetified note by note id
exports.update = (req, res) => {
  if (!req.body) {
    return res.render('error',{ error: "Data to update can not be empty" });
  }

  const id = req.params.id;
   let currentDate = new Date();
   let newDate = currentDate.toString().slice(0, 24);
  Notedb.findByIdAndUpdate( { _id: id },
      {
        title: req.body.title,
        description: req.body.description,
        time: newDate,
      },
      {
        new: true,
        upsert: true,
      })
    .then((data) => {
      if (!data) {
        res.
         render("error", {
           error: `Cannot Update note with ${id}. Maybe note not found!`,
         });
      } else {
       
        res.send(data);
      }
    })
    .catch((err) => {
      res.render("error", { error: "Error Update note information" });
    });
};

// Delete a note with specified note id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Notedb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.render("error", {
          error: `Cannot Delete with id ${id}. Maybe id is wrong`,
        });
      } else {
        res.send({
          message: "note was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete note with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Notedb.findById(id)
      .then((data) => {
        if (!data) {
          res.render("error", { error: "Not found note with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.render("error", { error: "Error retrieving note with id " + id });
      });
  } else {
    Notedb.find()
      .then((note) => {
        res.send(note);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving note information",
        });
      });
  }
};