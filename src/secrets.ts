import dotenv from 'dotenv'

dotenv.config( {path:'.env'}  )

export const PORT=process.env.PORT
export const MONGODB_URI=process.env.MONGODB_URI
export const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET
export const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN
export const JWT_COOKIE_EXPIRES_IN=process.env.JWT_COOKIE_EXPIRES_IN
export const EMAIL_USERNAME=process.env.EMAIL_USERNAME
export const EMAIL_PASSWORD=process.env.EMAIL_PASSWORD
export const EMAIL_HOST=process.env.EMAIL_HOST
export const EMAIL_PORT=process.env.EMAIL_PORT
export const EMAIL_FROM=process.env.EMAIL_FROM
export const EMAIL_TO=process.env.EMAIL_TO
export const EMAIL_SUBJECT=process.env.EMAIL_SUBJECT
export const EMAIL_TEXT=process.env.EMAIL_TEXT
export const EMAIL_HTML=process.env.EMAIL_HTML
export const EMAIL_RESET_PASSWORD_SUBJECT=process.env.EMAIL_RESET_PASSWORD_SUBJECT
export const EMAIL_RESET_PASSWORD_TEXT=process.env.EMAIL_RESET_PASSWORD_TEXT
export const EMAIL_RESET_PASSWORD_HTML=process.env.EMAIL_RESET_PASSWORD_HTML
