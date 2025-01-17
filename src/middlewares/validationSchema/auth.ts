import { Schema } from 'express-validator';
export const registerSchema:Schema={
    name:{
        in:['body'],
        isString:true,
        isLength:{
            options:{min:3},
            errorMessage:'Name should be at least 3 characters long'
        },
        trim:true,
        notEmpty:{
            errorMessage:'Name is required',

        },
        escape:true
    },
    email:{
        in:['body'],
        notEmpty:{ errorMessage:'Email is required'},
        isEmail:{
            errorMessage:'Invalid email address'
        },
        normalizeEmail:true,
        trim:true,
        escape:true
    },
    password:{
        in:['body'],
        isLength:{
            options:{min:6},
            errorMessage:'Password must be at least 6 characters long'
        },
        trim:true,
        escape:true
    }
}

export const loginSchema:Schema={
    email:{
        in:['body'],
        notEmpty:{ errorMessage:'Email is required'},
        isEmail:{
            errorMessage:'Invalid email address'
        },
        normalizeEmail:true,
        trim:true,
        escape:true
    },
    password:{
        in:['body'],
        notEmpty:{ errorMessage:'Password is required'},
        isLength:{
            options:{min:6},
            errorMessage:'Password must be at least 6 characters long'
        },
        trim:true,
        escape:true
    }
}

