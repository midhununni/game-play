//import { Sequelize } from "sequelize/types";
import request from "supertest";
import app from "../../app";
import { Match } from "../../db/models";
import { Sequelize } from 'sequelize'

describe("Create Match", () => {
	const todo = {
		title: "Create todo",
	};

	test("Should have key record and msg when created", async () => {
        beforeEach(async () => {
            let mockedSequelize: Sequelize;
            mockedSequelize = new Sequelize('database', 'username')
            await mockedSequelize.sync({ force: true });
        })
		const mockCreateTodo = jest.fn((): any => todo);
		jest
			.spyOn(Match, "create")
			.mockImplementation(() => mockCreateTodo());

		const res = await request(app).post("/api/v1//admin/create-match").send(todo);

		expect(mockCreateTodo).toHaveBeenCalledTimes(1);
		expect(res.body).toHaveProperty("msg");
		expect(res.body).toHaveProperty("record");
	});

	
});

