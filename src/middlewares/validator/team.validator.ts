import { body } from 'express-validator';

class TeamValidator {
	checkCreateTeam() {
		return [
			body('name')
                .notEmpty()
				.withMessage('The name value should not be empty')
		];
	}
}

export default new TeamValidator();