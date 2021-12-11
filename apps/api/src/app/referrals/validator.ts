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
	body('referralInput.givenName').notEmpty().withMessage('Given name is required'),
	body('referralInput.givenName').isLength({ min: 2, max: 200 }).withMessage('Given name must be between 2 and 200 characters'),
	body('referralInput.surName').notEmpty().withMessage('Surname is required'),
	body('referralInput.surName').isLength({ min: 2, max: 200 }).withMessage('Surname must be between 2 and 200 characters'),
	body('referralInput.email').notEmpty().withMessage('Email is required'),
	body('referralInput.email').isEmail().withMessage('Email provided is not a valid email'),
	body('referralInput.phone').notEmpty().withMessage('Phone is required'),
    body('referralInput.phone').isMobilePhone('en-AU').withMessage('Phone must be a valid Australian phone number')
]
