// Testing Pure Functions

import {isPasswordAllowed} from '../auth'

describe('isPasswordAllowed', () => {
    const invalidPasswords = [
        { value: 'a2c!', message: 'too short'},
        { value: '123456!', message: 'no alphabet characters'},
        { value: 'ABCdef!', message: 'no numbers'},
        { value: 'abc123!', message: 'no uppercase letters'},
        { value: 'ABC123!', message: 'no lowercase letters'},
        { value: 'ABCdef123', message: 'no non-alphanumeric characters'},
    ]

    const validPasswords = [
        '!aBc123'
    ]
    
    invalidPasswords.forEach(passwordDetails => {
        const testTitle = [
            'disallows', 
            passwordDetails.value, 
            passwordDetails.message
        ]

        test(`${testTitle.join(' | ')}`, () => {
            expect(isPasswordAllowed(passwordDetails.value)).toBe(false)
        })
    })

    validPasswords.forEach(password => {
        const testTitle = [
            'allows', 
            password,
            'valid'
        ]

        test(`${testTitle.join(' | ')}`, () => {
            expect(isPasswordAllowed(password)).toBe(true)
        })
    })
})


