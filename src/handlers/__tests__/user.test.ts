import { body } from 'express-validator'
import * as user from '../user'
import { json } from 'stream/consumers'

describe('user handler', ()=>{
    it('should create a new user', async ()=> {
        const req = {body: {username: 'thoria', email: 'thoria@gmail.com', password: 'hi'}}
        const res = {json({ token} ) {
            expect(token).toBeTruthy()
        }}
        await user.createNewUser(req, res, ()=>{})
    })
})