import { Schema } from 'express-validator';

export const AccountSchema: Schema = {
    recieverId: {
        isString: true,
        trim: true,
        notEmpty: {
            errorMessage: 'Please input a receiver\'s Id',
        },
        escape: true,
    },
    amount: {
        isNumeric: true,
        notEmpty: {
            errorMessage: 'Amount is required',
        },
        trim: true,
        escape: true,
    }
};