const{gql}=require('apollo-server-express');

const typeDefs=gql`
    type Query{
        events:[Event]
        users:[User]
        user:User
    }

    type User{
        id:ID
        fullName:String
        email:String
        events:[Event]
    }

    type Event{
        eventName:String
        eventDetails:String
        eventDate:String
    }

    
    UserData{
        token:String
        createdEvent:[Event]
        invitedEvent:[Event]
    }


    type Message{
        message:String!
    }
    type Mutation{
        signUpUser(newUser:UserInput!):User
        signInUser(signInUser:UserSigninInput!):UserData
        updatePassWord(updatePass:UserPasswordInput!):Message
        createEvent(eventCreate:CreateEventInput):Message
        updateEvent(eventUpdate:UpdateEventInput):Message
        inviteGuest(guestInvite:InviteGuestInput):Message
    }

    input InviteGuestInput{
        email:String!
        eventId:ID!
    }

    input UpdateEventInput{

    }

    input CreateEventInput{
        eventName:String!
        eventDetails:String!
        eventDate:String!
        UserId:ID!
    }

    input UserPasswordInput{
        email:String!
        oldPassword:String!
        newPassword:String!
    }

    input UserInput{
        fullName:String!
        email:String!
        password:String!
    }

    input UserSigninInput{
        email:String!
        password:String!
    }



`

module.exports=typeDefs;