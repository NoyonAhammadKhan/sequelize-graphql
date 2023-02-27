
const {DataTypes, Model}=require("sequelize");

module.exports=(sequelize,DataTypes)=>{

const InvitedGuest=sequelize.define("InvitedUser",{
    email:{
        type:DataTypes.STRING,
        allowNull:false        
    },
    EventId:DataTypes.INTEGER,
})
return InvitedGuest;

}







