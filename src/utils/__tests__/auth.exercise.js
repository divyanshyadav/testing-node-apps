// Testing Pure Functions

import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

const casify = (obj) => Object.entries(obj)
    .map(([title, password]) => ({
        name: `${password} - ${title}`,
        password
    }))

cases('isPasswordAllowed: valid passwords', 
    ({ password }) => {
        expect(isPasswordAllowed(password)).toBe(true)
    }, 
    casify({
        'valid Password': '!aBc123'
    })
)

cases('isPasswordAllowed: invalid passwords', 
    ({ password }) => {
        expect(isPasswordAllowed(password)).toBe(false)
    }, 
    casify({
        'too short':  'a2c!',
        'no alphabet characters':  '123456!',
        'no number': 'ABCdef!',
        'no uppercase letters': 'abc123!',
        'no lowercase letters': 'ABC123!',
        'no non-alphanumeric characters': 'ABCdef123'
    })
)