import { body, param, query } from 'express-validator';

class MatchValidator {
	checkCreateMatch() {
		return [
			body('name')
                .notEmpty()
				.withMessage('The name value should not be empty'),
			body('match_time')
				.notEmpty()
                .isISO8601().toDate()
                .withMessage('The Match time should be in date time format'),
			body('home')
                .notEmpty()
				.withMessage('The home value should not be empty')
                .isInt()
				.withMessage('The home value should be integer'),
            body('away')
                .notEmpty()
				.withMessage('The away value should not be empty')
                .isInt()
				.withMessage('The away value should be integer'),
            body('status')
                .notEmpty()
				.withMessage('The status value should not be empty')
                .isIn(['PUBLISHED', 'LIVE', 'ENDED'])
				.withMessage('The status value should be PUBLISHED, LIVE or ENDED')
		];
	}

	checkUpdateMatch(){
		return [
			body('id')
                .notEmpty()
				.withMessage('The id value should not be empty')
			    .isInt()
				.withMessage('The id value should be integer'),
			body('status')
                .notEmpty()
				.withMessage('The status value should not be empty')
                .isIn(['PUBLISHED', 'LIVE', 'ENDED'])
				.withMessage('The status value should be PUBLISHED, LIVE or ENDED')
		]

	}

	checkListMatches(){
		return [
			body('id')
                .notEmpty()
				.withMessage('The id value should not be empty')
			    .isInt()
				.withMessage('The id value should be integer'),
			body('status')
                .notEmpty()
				.withMessage('The status value should not be empty')
                .isIn(['PUBLISHED', 'LIVE', 'ENDED'])
				.withMessage('The status value should be PUBLISHED, LIVE or ENDED')
		]

	}
    

}

export default new MatchValidator();
