import { body } from 'express-validator';

class UserValidator {
	checkRegisterUser() {
		return [
			body('name')
                .notEmpty()
				.withMessage('The name value should not be empty')
		];
	}

    checkMatchSignup() {
		return [
			body('match_id')
                .notEmpty()
				.withMessage('The match id value should not be empty')
                .isInt()
				.withMessage('The match id value should be integer'),
            body('user_id')
                .notEmpty()
				.withMessage('The user id value should not be empty')
                .isInt()
				.withMessage('The user id value should be integer'),
            body('team')
                .notEmpty()
				.withMessage('The team value should not be empty')
                .isInt()
				.withMessage('The team value should be integer'),
		];
	}
}

export default new UserValidator();