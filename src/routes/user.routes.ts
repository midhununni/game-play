import express from 'express';
import { UserValidator, MatchValidator} from '../middlewares/validator';
import Helper from '../middlewares/helper';
import { UserController, MatchController} from '../controllers';

const router = express.Router();

router.post(
	'/register-user',
	UserValidator.checkRegisterUser(),
	Helper.handleValidationError,
	UserController.registerUser
);

router.post(
	'/match-sign-up',
	UserValidator.checkMatchSignup(),
	Helper.handleValidationError,
	UserController.signupMatch
);

router.get(
	'/list-matches/:user_id?',
	//MatchValidator.checkListMatches(),
	//Helper.handleValidationError,
	MatchController.listMatch
);


export default router;