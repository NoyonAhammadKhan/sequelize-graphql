const {db}=require('../config/db');

const User= db.user;
const Event = db.event;
const InvitedGuest=db.guest;


// const dbrelation=()=>{
    User.hasMany(db.event,{foreignKey:'UserId',as:'userEvents'});
    Event.belongsTo(db.user,{foreignKey:'UserId',as:'userEvents'});


    Event.hasMany(db.guest,{foreignKey:'EventId',as:'guestEvent'});
    InvitedGuest.belongsTo(db.event,{foreignKey:'EventId',as:'guestEvent'});



// dbrelation()


module.exports={
    User,
    Event,
    InvitedGuest,
    dbrelation
}