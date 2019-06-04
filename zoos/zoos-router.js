
const router = require('express').Router();
const Zoos = require('./zoos-model.js');

router.get('/', (req, res) => {
  Zoos
    .find()
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Zoos.findById(req.params.id)
    .then( zoo => {
      if(zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({message: 'Zoo not found.'});
      }
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  Zoos
    .add(req.body)
    .then( zoo => {
      res.status(201).json(zoo);
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Zoos
    .update(req.params.id, changes)
    .then( count => {
      if(count > 0) {
        res.status(200).json({message: `${count} records updated.`});
      } else {
        res.status(404).json({message: 'Zoo not found.'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  Zoos
    .remove(req.params.id)
    .then( count => {
      if(count > 0) {
        const unit = count > 1 ? 'records' : 'record';
        res.status(200).json({message: `${count} ${unit} deleted.`})
      } else {
        res.status(404).json({message: 'Zoo not found.'})
      }
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

module.exports = router;