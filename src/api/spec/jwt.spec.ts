import { test, describe, expect } from "@jest/globals";
import JWT from '../utils/jwt.singleton.ts';

describe('jwt tests',()=>{
    test('sign a jwt',async ()=>{
        JWT.initialize();
        const result = await JWT.sign({id: '123', name: 'josevaldo'});
        expect(result).toBeInstanceOf(String)
        console.log(result);
    })
})