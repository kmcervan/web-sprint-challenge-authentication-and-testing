const db = require('../../data/dbConfig');

module.exports = {
    add,
    findBy,
    findById,

}

function findBy(user){
    return db('users').where('id',user).orderBy('id');
}

async function add(user){
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
}

function findById(id){
    return db('users').select('id','username','password').where('id', id).first();
}