const express = require('express');
const route = express.Router()
const { body, validationResult } = require("express-validator");
const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add notes
 *  @method GET /add-note
 */
route.get('/add-note', services.add_note)

/**
 *  @description for update note
 *  @method GET /update-note
 */
route.get('/update-note', services.update_note)
route.get('/single-note', services.single_note)


// API
route.post(
  "/api/notes",
  [
    body(
      "title",
      "Enter valid Title, minimum length should be 5 charaters"
    ).isLength({ min: 5 }),
    body(
      "description",
      "Enter valid Description, minimum length should be 5 charaters"
    ).isLength({ min: 5 }),
    ], (req, res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('error',{ error: JSON.stringify(errors) });
        }
    next();
    },
  controller.create
);
route.get('/api/notes', controller.find);

route.put('/api/notes/:id', controller.update);
route.delete('/api/notes/:id', controller.delete);
route.get("*", function (req, res) {
  // This is a fallback, in case of no matching

  res.render('error',{error: 'Page Not Found'})
});


module.exports = route