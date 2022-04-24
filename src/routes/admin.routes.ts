import express from 'express';
import { MatchValidator, TeamValidator} from '../middlewares/validator';
import Helper from '../middlewares/helper';
import { MatchController, TeamController } from '../controllers';

const router = express.Router();

router.post(
	'/create-match',
	MatchValidator.checkCreateMatch(),
	Helper.handleValidationError,
	MatchController.createMatch
);

router.post(
	'/create-team',
	TeamValidator.checkCreateTeam(),
	Helper.handleValidationError,
	TeamController.createTeam
);

router.put(
	'/update-match-status',
	MatchValidator.checkUpdateMatch(),
	Helper.handleValidationError,
	MatchController.updateMatch
);


export default router;