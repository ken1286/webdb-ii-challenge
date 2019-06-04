const knex = require('knex');

const knexConfig = {
   client: 'sqlite3',
   connection: {
      filename: './data/lambda.db3'
   },
   useNullAsDefault: true // required for SQLITE3
}

const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('zoos');
};

function findById(id) {
  return db('zoos')
    .where({ id })
    .first();
};

function add(item) {
  return db('zoos')
    .insert(item)
    .then(ids => {
      return findById(ids[0])
    })
};

function update(id, changes) {
  return db('zoos')
    .where({ id })
    .update(changes);
};

function remove(id) {
  return db('zoos')
    .where({ id })
    .del()
};