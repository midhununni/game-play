import request from "supertest";
import app from "../../app";
import newUser from '../mock-data/new-match.json'
import signupUser from '../mock-data/signup-user.json'
import updateMatchStatus from '../mock-data/update-match.json'
import newMatchError from '../mock-data/new-match-validate-error.json'
import {Match,User} from '../../db/models'

jest.mock('../../db/models')
const endpointUrl = "/api/v1/user"

describe("/register-user", () => {
   it(` should post register user with success`,async() => {
    const response = await request(app)
    .post(`${endpointUrl}/register-user`)
    .send(newUser)
    expect(response.statusCode).toBe(201)
   })

   it(` should return validation error if body is wrong`,async() => {
      const response = await request(app)
      .post(`${endpointUrl}/register-user`)
      .send({})
      expect(response.statusCode).toBe(400)
   })

})

describe("/match-sign-up", () => {
   it(` should post sign up match with success`,async() => {
    const match ={status : 'PUBLISHED',home : 3,away:5}
    Match.findOne = jest.fn(():any => match)
    const response = await request(app)
    .post(`${endpointUrl}/match-sign-up`)
    .send(signupUser)
    expect(response.statusCode).toBe(201)
   })

   it(` should return validation error if body is wrong`,async() => {
      const response = await request(app)
      .post(`${endpointUrl}/match-sign-up`)
      .send({})
      expect(response.statusCode).toBe(400)
   })

})

describe("/list-matches", () => {
   it(` should get list all published matches with success`,async() => {
   const response = await request(app)
    .get(`${endpointUrl}/list-matches`)
    expect(response.statusCode).toBe(200)
   })

})

describe("/list-matches/2", () => {
    it(` should get list all published matches of user with success`,async() => {
    User.findOne = jest.fn(():any => true)
    const response = await request(app)
     .get(`${endpointUrl}/list-matches/2`)
     expect(response.statusCode).toBe(200)
    })

    it(` should return validation error if body is wrong`,async() => {
    User.findOne = jest.fn(():any => false)
    const response = await request(app)
     .get(`${endpointUrl}/list-matches/abcd`)
     expect(response.statusCode).toBe(401)
    })
 
 })

 describe("not fount url", () => {
    it(` should get not found if url is not present`,async() => {
    const response = await request(app)
     .get(`${endpointUrl}/list-match`)
     expect(response.statusCode).toBe(404)
    })
 
 })