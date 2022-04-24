import { Request, Response } from "express";
import { Sequelize } from 'sequelize'
import logger from '../helpers/log4js'

import { Match, UserMatch, Team, User } from "../db/models";

class MatchController {
	async createMatch(req: Request, res: Response) {
		try {
			const record = await Match.create({ ...req.body });
			return res.status(201).json({ 'msg' : 'Match created successfully',record });
		} catch (e) {
			logger.error(e);
			return res.status(500).json({ msg: "Failed to create match"});
		}
	}

	async updateMatch(req: Request, res: Response) {
		try {
			const { id, status } = req.body;
			const record = await Match.findOne({ where: { id } });

			if (!record) {
				return res.status(404).json({ msg: "Cannot find existing record" });
			}

			const updatedRecord = await record.update({ status });
			return res.status(200).json({'msg' : 'Match updated successfully', record: updatedRecord });
	
		} catch (e) {
			logger.error(e);
			return res.status(500).json({ msg: "Failed to update match"});
		}
	}

	async listMatch(req: Request, res: Response) {
		try {
			const { user_id } = req.params;
			if (user_id) {
				const user = await User.findOne({ where: { id: user_id } });
				if (!user) {
					return res.status(401).json({ msg: "Unauthorized user" });
				}
			}

			const records = user_id ?
				await UserMatch.findAll({
					attributes: [
						'id',
						[Sequelize.col('Match.name'), 'name'],
						[Sequelize.col('Match.match_time'), 'match_time'],
						[Sequelize.col('Match.status'), 'status'],
						'team' as 'selected_team_id',
						[Sequelize.col('Team.name'), 'selected_team']
					],
					include: [{
						model: Match,
						attributes: [],
						include: [{
							model: Team,
							as: 'homeModel',
							attributes: [],
							required: false
						},
						{
							model: Team,
							as: 'awayModel',
							attributes: [],
							required: false
						}
						],
						where: { status: 'PUBLISHED' }
					},
					{
						model: Team,
						attributes: [],
						required: false
					}

					], where: { user: user_id },
					raw: true
				})
				:
				await Match.findAll({
					attributes: ['id', 'name', 'match_time', 'status',
						[Sequelize.col('UserMatches.team'), 'selected_team_id'],
						[Sequelize.col('UserMatches.Team.name'), 'selected_team_name']

					],
					include: [{
						model: UserMatch,
						attributes: [],
						required: false,
						include: [{
							model: Team,
							attributes: [],
							required: false,
						}]
					}],
					where: { status: 'PUBLISHED' },
					raw: true
				})

				return res.status(200).json({records});
		} catch (e) {
			logger.error(e);
			return res.status(500).json({ msg: "Failed to list matches"});
		}
	}

}

export default new MatchController();