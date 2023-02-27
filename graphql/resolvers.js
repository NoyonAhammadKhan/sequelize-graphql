const {db}=require('../config/db');

const User = db.user;
const Event = db.event;
const InvitedGuest = db.guest;
const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const setJWT=require('../../jwt/setJWT');
const jwt=require("jsonwebtoken")


const resolvers={
    Query:{
        users:async()=>{
            let data = await User.findAll({
                attributes:['id','fullName','email'],
                include:[
                    {
                        model:Event,
                        as:'userEvents',
                        attributes:['eventName','eventDetails']
                    }
                ]
            })
            res.status(200).json({data:data});
        },
        user:async(_,{id})=>{
            let data = await User.findAll({
                attributes:['id','fullName','email'],
                include:[
                    {
                        model:Event,
                        as:'userEvents',
                        attributes:['eventName','eventDetails']
                    }
                ],
                where:{id:id}
                
            })
            res.status(200).json({data:data});
        },
        events:async()=>{
            let data = await Event.findAll({
                attributes:['id','email', 'eventName','eventDetails',],
                include:[
                    {
                        model:InvitedGuest,
                        as:'guestEvent',
                        attributes:[,'id','email']
                    }
                ],
                where:{id:1}
                
            })
            res.status(200).json({data:data});
        },
        event:async(_,{id})=>{
            let data = await Event.findAll({
                attributes:['id','email', 'eventName','eventDetails',],
                include:[
                    {
                        model:InvitedGuest,
                        as:'guestEvent',
                        attributes:[,'id','email']
                    }
                ],
                where:{id:id}
                
            })
            res.status(200).json({data:data});
        }

        
    },

    Mutation:{
        signUpUser:async(_,{newUser})=>{
            const {fullName, email}=newUser;
    
    
            const password = await bcrypt.hash(newUser.password, 10);
            const alreadyExistsUser = await User.findOne({
                where:{
                    email:email
                }
            }).catch((err)=>{
                console.log("Error",err)
            })
            // console.log(hashedPassword)
            if(alreadyExistsUser){
                return res.json({message:"User with email already exists"});
            }
            const newUser = new User({fullName, email, password});
            let savedUser;
           try{
                 savedUser= await newUser.save().catch((err)=>{
                console.log("Error",err);
                res.json({error:"Cannot register user at this moment"})
            })
           }catch(e){
                console.log(e)
           }
            
            if(savedUser) res.json({message:"Thanks for registering"})
        },
        loginUser:async(_,{signInUser})=>{
            const {email,password}=signInUser;

            const userWithEmail = await User.findOne({where:{email}}).catch((err)=>{
                console.log(err)
            })
            console.log("user",)
        
            if(!userWithEmail){
                return res.json({message:"Email does not match"})
            }
        
            
            const validPassword = await bcrypt.compare(signInUser.password, userWithEmail.dataValues.password);
        
            if(validPassword){
                let createdEvent = await User.findAll({
                    attributes:[],
                    include:[
                        {
                            model:Event,
                            as:'userEvents',
                            attributes:['eventName','eventDetails','eventDate']
                        }
                    ],
                    where:{email:email}
                })
                let invitedEvent = await InvitedGuest.findAll({
                    attributes:[],
                    include:[
                        {
                            model:Event,
                            as:'guestEvent',
                            attributes:['id','eventName','eventDetails','eventDate']
                        }
                    ],
                    where:{email:email}
                    
                })
                
                // ----------------------------------------
                const jwtToken=setJWT(userWithEmail.id,userWithEmail.email)
                return  res.json({message:"Welcome Back",token:jwtToken,invitedEvent:invitedEvent,createdEvent:createdEvent})
            }else{
                return res.status(400).send('Invalid Email or Password.')
            }
        },
        updatePassword:async(_,{updatePass})=>{
            try{
                const {oldPassword,newPassword,email}=updatePass;
                // console.log(req.body)
            
                const userWithEmail = await User.findOne({where:{email}}).catch((err)=>{
                    console.log(err)
                })
                console.log(userWithEmail)
            
                const validPassword = await bcrypt.compare(oldPassword, userWithEmail.dataValues.password);
                console.log(validPassword)
            
                if(!validPassword){
                    return res.status(400).json({"message":"your put wrong password.put correct password to update new password"});
                }
                const password = await bcrypt.hash(newPassword, 10);
                User.update({ password},{where:{email:email}}).then(upRes=>{
                
                if(upRes.length==1){
                    return res.status(200).send({"message":"password updated"})
                }
                })
                .catch(err=>console.log(err))
            
                // console.log(data,"data")
               }catch(e){
                console.log(e)
               }            
        },
        createEvent:async(_,{eventCreate})=>{
            const {eventName,eventDetails,eventDate,UserId}=eventCreate;
            
        
            const newEvent = new Event({eventName,eventDetails,eventDate,UserId});
        
            let savedEvent;
            try{
                savedEvent=await newEvent.save().catch((err)=>{
                    console.log(err)
                    return res.json({message:"cannot register event now"})
                })
            }catch(e){
                console.log(e)
            }
            if(savedEvent){
                return res.json({message:"Thanks for making an event"})
            }
        },
        inviteGuest:async(_,{guestInvite})=>{
            const {email,EventId}=guestInvite;

            const newGuest = new InvitedGuest({email,EventId});
        
            let savedGuest;
            try{
                savedGuest=await newGuest.save().catch((err)=>{
                    return res.json({message:"cannot register guest now"})
                })
            }catch(e){
                console.log(e)
            }
            if(savedGuest){
                return res.json({message:"Thanks for adding a guest"})
            }
        },
        updateEvent:async(_,{})=>{

        }



    }
}

module.exports= resolvers;