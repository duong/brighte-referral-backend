import { Request } from 'express';
import { body, Result, ValidationChain, ValidationError, validationResult } from 'express-validator';

export const expressValidator = (req: Request): ValidationError[] => {
	const errors: Result<ValidationError> = validationResult(req)

	const messages: ValidationError[] = []
	if (!errors.isEmpty()) {
		for (const i of errors.array()) {
			messages.push(i)
		}
	}
	return messages
}

export const createReferralValidator = (): ValidationChain[] => [
	body('referralInput.givenName').notEmpty().withMessage('given name is required'),
	body('referralInput.givenName').isLength({ min: 2, max: 200 }).withMessage('given name between 2 and 200 characters'),
	body('referralInput.surName').notEmpty().withMessage('surname is required'),
	body('referralInput.surName').isLength({ min: 2, max: 200 }).withMessage('surname between 2 and 200 characters'),
	body('referralInput.email').notEmpty().withMessage('email is required'),
	body('referralInput.email').isEmail().withMessage('email is not valid'),
	body('referralInput.phone').notEmpty().withMessage('phone is required'),
    body('referralInput.phone').isMobilePhone('en-AU').withMessage('phone must be a valid Australian phone number')
]
