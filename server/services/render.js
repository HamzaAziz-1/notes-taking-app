const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/notes
    axios.get('http://localhost:8080/api/notes')
        .then(function(response){
            res.render('index', { notes : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_note = (req, res) =>{
    res.render('add_note');
}

exports.update_note = (req, res) =>{
    axios.get('http://localhost:8080/api/notes', { params : { id : req.query.id }})
        .then(function(notedata){
            res.render("update_note", { note : notedata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.single_note = (req, res) => {
  axios
    .get("http://localhost:8080/api/notes", { params: { id: req.query.id } })
    .then(function (notedata) {
      res.render("single_note", { note: notedata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};