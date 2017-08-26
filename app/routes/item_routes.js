
var ObjectID = require('mongodb').ObjectID; // used to convert string ID to object ID as it's required by MongoDB

module.exports = function(app, db) {

// TASK 1

app.post('/items', (req, res) => {
    const item = { 
       name: req.body.name,
       price: req.body.price,
       brand: req.body.brand
       };
    db.collection('items').insert(item, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // TASK 2

  app.get('/items', (req, res) => {
    db.collection('items').find().toArray(function(err, item) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

    // TASK 3

  app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('items').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('');
      } 
    });
  });

    // TASK 4

  app.patch('/items/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const item = {
      name: req.body.name,
      price: req.body.price,
      brand: req.body.brand
      };
    db.collection('items').update(details, item, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(item);
      } 
    });
  });
};

