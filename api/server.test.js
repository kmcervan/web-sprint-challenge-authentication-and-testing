const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })

const user = { username: 'karla', password: 'qwe123' }
const badUser = { username: 'boo', password: ''}

describe('register end point', () => {
  beforeEach(async () => {
    await db('users').truncate()
  })
  it('creates an account', async () =>{
    await request(server).post('/api/auth/register').send(user)
    const use = await db('users').first()
    expect(use).toHaveProperty('id')
    expect(use).toHaveProperty('username')
    expect(use).toHaveProperty('password')
    expect(use.username).toBe(user.username)
  })
  it('has hashed password', async ()=>{
    const { body } = await request(server).post('/api/auth/register').send(user)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('username')
        expect(body).toHaveProperty('password')
        expect(body.password).toMatch(/^\$2[ayb]\$.{56}$/)
        // expect(body.username).toBe(user.username)
  })
})

function greets(name){
  return `welcome, ${name}`
}

describe('login end point', () => {
  beforeEach(async () => {
    await db('users').truncate()
  })
  it('returns greeting', async () => {
    const { body } = await request(server).post('/api/auth/login').send(user)
    expect(body).toHaveReturned(user.username)
  })
  it('invalid login', async () => {
    const { body } = await request(server).post('/api/auth/login').send(user)
    expect(body).toBe("invalid credentials")
  })
})