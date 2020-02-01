// Testing Middleware

import {UnauthorizedError} from 'express-jwt'
import { buildRes, buildReq, buildNext } from 'utils/generate'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
test('responds with 401 for express-jwt UnauthorizedError', () => {
    const code = 'error_code'
    const message = 'Some message'
    const error = new UnauthorizedError(code, { message })
    const req = buildReq()
    const res = buildRes()
    const next = buildNext()

    errorMiddleware(error, req, res, next)
    
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ code: error.code, message: error.message })
    expect(res.json).toHaveBeenCalledTimes(1)
})

// 🐨 Write a test for the headersSent case
test('calls next with error if headers already sent', () => {
    const error = new Error('some error')
    const req = buildReq()
    const res = buildRes({ headersSent: true })
    const next = buildNext()
    
    errorMiddleware(error, req, res, next)

    expect(next).toHaveBeenCalledWith(error)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
test('responds with 500 in any other case', () => {
    const error = new Error('some error')
    const req = buildReq()
    const res = buildRes()
    const next = buildNext()

    errorMiddleware(error, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ message: error.message, stack: error.stack })
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(next).not.toHaveBeenCalled()
})
