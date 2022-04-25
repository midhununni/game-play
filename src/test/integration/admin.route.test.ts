import request from "supertest";
import app from "../../app";
import newMatch from '../mock-data/new-match.json'
import newTeam from '../mock-data/new-team.json'
import updateMatchStatus from '../mock-data/update-match.json'
import newMatchError from '../mock-data/new-match-validate-error.json'
import {Match} from '../../db/models'

jest.mock('../../db/models')
const endpointUrl = "/api/v1/admin"

describe("/create-match", () => {
   it(` should post create match with success`,async() => {
    const response = await request(app)
    .post(`${endpointUrl}/create-match`)
    .send(newMatch)
    expect(response.statusCode).toBe(201)
   })

   it(` should return validation error if body is wrong`,async() => {
      const response = await request(app)
      .post(`${endpointUrl}/create-match`)
      .send(newMatchError)
      expect(response.statusCode).toBe(400)
   })

})

describe("/create-team", () => {
   it(` should post create team with success`,async() => {
    const response = await request(app)
    .post(`${endpointUrl}/create-team`)
    .send(newTeam)
    expect(response.statusCode).toBe(201)
   })

   it(` should return validation error if body is wrong`,async() => {
      const response = await request(app)
      .post(`${endpointUrl}/create-team`)
      .send({})
      expect(response.statusCode).toBe(400)
   })

})

describe("/update-match-status", () => {
   it(` should post update match status with success`,async() => {
    const match = {update : jest.fn(():any => true)}
    Match.findOne = jest.fn(():any => match)
    const response = await request(app)
    .put(`${endpointUrl}/update-match-status`)
    .send(updateMatchStatus)
    expect(response.statusCode).toBe(200)
   })

   it(` should return validation error if body is wrong`,async() => {
      const response = await request(app)
      .put(`${endpointUrl}/update-match-status`)
      .send({})
      expect(response.statusCode).toBe(400)
   })

})