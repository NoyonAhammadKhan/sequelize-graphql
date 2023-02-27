
module.exports =(sequelize,DataTypes)=>{
    const Event = sequelize.define("Event",{
    eventName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    eventDetails:{
        type:DataTypes.STRING,
        allowNull:false
    },
    eventCreatedDate:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    eventDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    UserId:DataTypes.INTEGER
})
return Event;

}


// module.exports=Event
