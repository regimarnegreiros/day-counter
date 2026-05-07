import argon2, { argon2id } from "argon2";
const hashConfig: object = {
        type: argon2id,
        parallelism: 2,
        memoryCost: 2 ** 16,
        timeCost: 4,
        hashLength: 100
    } as const;

export async function hash(text: string){
    try{
        return await argon2.hash(text,hashConfig);
    } catch(err: unknown){
        console.error('failed to hash',err);
        throw new Error('failed to hash the text');
    };
}

export async function verifyHash(hashText:string, text:string) {
    try{
        if(await argon2.verify(hashText,text,hashConfig)){
            return true;
        }else{
            return false
        }
    } catch(err: unknown){
        console.error('failed to verify hash',err);
        throw new Error('failed to verify text');
    };
}