const db = require('../../data/dbConfig');

module.exports = {
    findBy,
    findById,
    add
}

function findBy(id){
    return db('users').where(id).orderBy('id');
}

async function add(user){
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
}

function findById(id){
    return db('users').where({ id }).first();
}