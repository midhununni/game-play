import { MatchController } from '../../controllers'
import {Match, User, UserMatch} from '../../db/models'
import log4js from 'log4js';
import httpMocks from 'node-mocks-http'
import newMatch from '../mock-data/new-match.json'
import updateMatch from '../mock-data/update-match.json'

Match.create = jest.fn(():any => true)
Match.findOne = jest.fn(():any => false)
Match.findAll = jest.fn(():any => true)
UserMatch.findAll = jest.fn(():any => true)

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

describe("MatchController.createMatch", () => {

    it("should have a createMatch function", () => {
        expect(typeof MatchController.createMatch).toBe("function");
    });
    it("should create a match",async () => {
        req.body = newMatch;
        await MatchController.createMatch(req, res);
        expect(Match.create).toBeCalled();
        expect(res.statusCode).toBe(201);
    })
    it("should log server error",async () => {
        const error = {"message" : "error"}
        const rejectedPromise = Promise.reject(error)
        Match.create = jest.fn().mockReturnValue(rejectedPromise)
        req.body = newMatch;
        await MatchController.createMatch(req, res);
        expect(log4js.getLogger().error).toBeCalled()
        expect(res.statusCode).toBe(500);
    })
    
})

describe("MatchController.updateMatch", () => {

    it("should have a updateMatch function", () => {
        expect(typeof MatchController.updateMatch).toBe("function");
    });
    it("should check a match exists",async () => {
        req.body = updateMatch;
        await MatchController.updateMatch(req, res);
        expect(Match.findOne).toBeCalled();
        expect(res.statusCode).toBe(404);
    })
    it("should update a match",async () => {
        const response = {update : jest.fn(():any => true)}
        Match.findOne = jest.fn(():any => response)
        req.body = updateMatch;
        await MatchController.updateMatch(req, res);
        expect(Match.findOne).toBeCalled();
        expect(response.update).toBeCalled();
        expect(res.statusCode).toBe(200);
    })
    it("should log server error",async () => {
        const error = {"message" : "error"}
        const rejectedPromise = Promise.reject(error)
        Match.findOne = jest.fn().mockReturnValue(rejectedPromise)
        req.body = updateMatch;
        await MatchController.updateMatch(req, res);
        expect(log4js.getLogger().error).toBeCalled()
        expect(res.statusCode).toBe(500);
    })
    
})

describe("MatchController.listMatch", () => {

    it("should have a listMatch function", () => {
        expect(typeof MatchController.listMatch).toBe("function");
    });
    it("should check user exists",async () => {
        req.params.user_id = 1;
        User.findOne = jest.fn(():any => false)
        await MatchController.listMatch(req, res);
        expect(User.findOne).toBeCalled();
        expect(res.statusCode).toBe(401);
    })
    it("should list published matches of user",async () => {
        req.params.user_id = 1;
        User.findOne = jest.fn(():any => true)
        await MatchController.listMatch(req, res);
        expect(UserMatch.findAll).toBeCalled();
        expect(User.findOne).toBeCalled();
        expect(res.statusCode).toBe(200);
    })
    it("should list all published matches",async () => {
        req.params.user_id = null;
        User.findOne = jest.fn(():any => false)
        await MatchController.listMatch(req, res);
        expect(Match.findAll).toBeCalled();
        expect(res.statusCode).toBe(200);
    })
    it("should log server error",async () => {
        req.params.user_id = null;
        const error = {"message" : "error"}
        const rejectedPromise = Promise.reject(error)
        Match.findAll = jest.fn().mockReturnValue(rejectedPromise)
        await MatchController.listMatch(req, res);
        expect(log4js.getLogger().error).toBeCalled()
        expect(res.statusCode).toBe(500);
    })
    
})