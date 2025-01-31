import "next-auth"
import { DefaultSession } from "next-auth"

//next-auth by default doesnot provide much in user object so we add the necessary field required for our app. For example without this code we cannot do user.id because next-auth user doesnot return much data
declare module "next-auth" {
    interface User {
        _id?: String
        isVerified?: boolean
        isAcceptingMessages?: boolean
        username?: string
    }
    interface Session {
        user: {
            _id?: String
            isVerified?: boolean
            isAcceptingMessages?: boolean
            username?: string
        } & DefaultSession['user']
    }
}

//another way of changing interface
declare module "next-auth/jwt" {
    interface JWT {
        _id?: String
        isVerified?: boolean
        isAcceptingMessages?: boolean
        username?: string
    }
}