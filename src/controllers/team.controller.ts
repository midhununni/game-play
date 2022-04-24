import { Request, Response } from "express";
import logger from '../helpers/log4js'
import { Team } from "../db/models";

class TeamController {
	async createTeam(req: Request, res: Response) {
		try {
            const { name } = req.body;
            const team = await Team.findOne({ where: { name } });
	        if (team) {
			  return res.status(409).json({  msg: "Team with same name already exists"});
			}
			const record = await Team.create({ ...req.body });
			return res.status(201).json({ 'msg' : 'Team created successfully',record });
		} catch (e) {
			logger.error(e);
			return res.status(500).json({ msg: "Failed to create team"});
		}
	}
}

export default new TeamController();