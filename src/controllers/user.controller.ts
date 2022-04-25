import { Request, Response } from "express";
import logger from '../helpers/log4js'
import { User, Match, UserMatch } from "../db/models";

class UserController {
	async registerUser(req: Request, res: Response) {
		try {
            const { name } = req.body;
            const user = await User.findOne({ where: { name } });
			if (user) {
				return res.status(409).json({ msg: "User with same username already exists" });
			}
			const record = await User.create({ ...req.body });
			return res.status(201).json({ msg: "Successfully registered",record });
		} catch (e) {
			logger.error(e);
			return res.status(500).json({ msg: "Failed to register user"});
		}
	}

    async signupMatch(req: Request, res: Response) {
		try {
            const { match_id, user_id, team } = req.body;
            const match = await Match.findOne({ where: { id : match_id },raw:true });
            if (!match) {
				return res.status(404).json({ msg: "Match not found" });
			}
            if(match.status != 'PUBLISHED'){
                return res.status(400).json({ msg: "Can't signup for a match that already started or ended" });
            }
            if(![match.away,match.home].includes(team)){
                return res.status(400).json({ msg: "Can't select a team that is not in the match" });
            }

			const record = await UserMatch.create({ team, match : match_id, user: user_id});
			return res.status(201).json({ msg: "Successfully signed up",record });
		} catch (e) {
			logger.error(e);
			return res.status(500).json({ msg: "Failed to sign up"});
		}
	}
}

export default new UserController();