import { UserController } from '../../controllers'
import {User,UserMatch,Match} from '../../db/models'
import log4js from 'log4js';
import httpMocks from 'node-mocks-http'
import newUser from '../mock-data/new-user.json'
import signupUser from '../mock-data/signup-user.json'


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

describe("UserController.registerUser", () => {
    User.create = jest.fn(():any => true)
    User.findOne = jest.fn(():any => true)

    it("should have a createUser function", () => {
        expect(typeof UserController.registerUser).toBe("function");
    });
    it("should check user exists", async() => {
        await UserController.registerUser(req, res);
        expect(User.findOne).toBeCalled();
        expect(res.statusCode).toBe(409);
    })
    it("should register user",async () => {
        User.findOne = jest.fn(():any => false)
        req.body = newUser;
        await UserController.registerUser(req, res);
        expect(User.create).toBeCalled();
        expect(res.statusCode).toBe(201);
    })
    it("should log server error",async () => {
        const error = {"message" : "error"}
        const rejectedPromise = Promise.reject(error)
        User.findOne = jest.fn().mockReturnValue(rejectedPromise)
        req.body = newUser;
        await UserController.registerUser(req, res);
        expect(log4js.getLogger().error).toBeCalled()
        expect(res.statusCode).toBe(500);
    })
    
})

describe("UserController.signupUser", () => {
    UserMatch.create = jest.fn(():any => true)
    Match.findOne = jest.fn(():any => true)

    it("should have a signup function", () => {
        expect(typeof UserController.signupMatch).toBe("function");
    });
    it("should check match exists", async() => {
        Match.findOne = jest.fn(():any => false)
        await UserController.signupMatch(req, res);
        expect(Match.findOne).toBeCalled();
        expect(res.statusCode).toBe(404);
    })
    it("should check match status is published", async() => {
        const response ={status : 'LIVE'}
        Match.findOne = jest.fn(():any => response)
        await UserController.signupMatch(req, res);
        expect(Match.findOne).toBeCalled();
        expect(res.statusCode).toBe(400);
        
    })
    it("should check user selected team that is part of match",async () => {
        const response ={status : 'PUBLISHED',home : 13,away:15}
        Match.findOne = jest.fn(():any => response)
        req.body = signupUser;
        await UserController.signupMatch(req, res);
        expect(Match.findOne).toBeCalled();
        expect(res.statusCode).toBe(400);
    })

    it("should create the match for user",async () => {
        const response ={status : 'PUBLISHED',home : 3,away:5}
        Match.findOne = jest.fn(():any => response)
        req.body = signupUser;
        await UserController.signupMatch(req, res);
        expect(Match.findOne).toBeCalled();
        expect(UserMatch.create).toBeCalled();
        expect(res.statusCode).toBe(201);
    })

    it("should log server error",async () => {
        const error = {"message" : "error"}
        const rejectedPromise = Promise.reject(error)
        Match.findOne = jest.fn().mockReturnValue(rejectedPromise)
        req.body = signupUser;
        await UserController.signupMatch(req, res);
        expect(log4js.getLogger().error).toBeCalled()
        expect(res.statusCode).toBe(500);
    })
    
})