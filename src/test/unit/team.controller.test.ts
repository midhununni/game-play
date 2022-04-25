import { TeamController } from '../../controllers'
import {Team} from '../../db/models'
import log4js from 'log4js';
import httpMocks from 'node-mocks-http'
import newTeam from '../mock-data/new-team.json'

Team.create = jest.fn(():any => true)
Team.findOne = jest.fn(():any => true)

let req: any,res: any

 beforeEach(() => {
     req = httpMocks.createRequest();
     res = httpMocks.createResponse();
 })

jest.mock('log4js', () => {
    const error = jest.fn()
    return {
        getLogger: jest.fn().mockImplementation(() => ({
            level: jest.fn(),
            error,
        })),
    }
})

describe("TeamController.createTeam", () => {

    it("should have a createTeam function", () => {
        expect(typeof TeamController.createTeam).toBe("function");
    });
    it("should check team exists", async() => {
        await TeamController.createTeam(req, res);
        expect(Team.findOne).toBeCalled();
        expect(res.statusCode).toBe(409);
    })
    it("should create team",async () => {
        Team.findOne = jest.fn(():any => false)
        req.body = newTeam;
        await TeamController.createTeam(req, res);
        expect(Team.create).toBeCalled();
        expect(res.statusCode).toBe(201);
    })
    it("should log server error",async () => {
        const error = {"message" : "error"}
        const rejectedPromise = Promise.reject(error)
        Team.findOne = jest.fn().mockReturnValue(rejectedPromise)
        req.body = newTeam;
        await TeamController.createTeam(req, res);
        expect(log4js.getLogger().error).toBeCalled()
        expect(res.statusCode).toBe(500);
    })
    
})