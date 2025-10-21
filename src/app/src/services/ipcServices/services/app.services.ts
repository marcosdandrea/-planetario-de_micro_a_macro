import e from "express";

interface authorizationPayload {
    password: string;
}

interface authorizationResponse {
    authorized: boolean;
}

export const authorization = (payload: authorizationPayload, callback: (response: authorizationResponse) => Boolean) => {
    try{

        const {password} = payload;
        if (!process.env.AUTHORIZATION_PASSWORD) {
            callback({authorized: true});
            return;
        }
        const authorized = password === process.env.AUTHORIZATION_PASSWORD;
        callback({authorized});
    } catch (error) {
        console.error("Authorization error:", error);
        callback({authorized: false});
    }
}

export default {
    authorization
};