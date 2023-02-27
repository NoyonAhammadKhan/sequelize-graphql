const express = require('express');
// const sequelize = require('./database');
const {sequelize,connectDB} = require('./config/db')
// const User = require('./User')
const bodyParser = require('body-parser');
const userRouter =require('./routes/userRoutes');
const eventRouter=require('./routes/eventRoutes')
const morgan = require('morgan');
const cors = require('cors');
const dotenv=require('dotenv');
//graphql
const{ApolloServer,gql}=require('apollo-server-express');
const{ApolloServerPluginLandingPageGraphQLPlayground ,ApolloServerPluginDrainHttpServer,ApolloServerPluginLandingPageDisabled}=require('apollo-server-core');

const typeDefs=require('./graphql/schemaGql');
const resolvers=require('./graphql/resolvers');
const http=require('http');


const httpServer=http.createServer(app);


dotenv.config()
// require('./auth/passport')


const app=express();
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())

const port = process.env.PORT || 4000


//connect db
// connectDB()

// app.use('/user',userRouter);
// app.use('/event',eventRouter);





const context = ({req})=>{
  const {authorization}=req.headers;
  if(authorization){
     const {userId}= jwt.verify(authorization,JWT_SECRET);
     return {userId}
  }
}



const server= new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins:[
      ApolloServerPluginDrainHttpServer({httpServer}),
      ApolloServerPluginLandingPageGraphQLPlayground(),
  ]
})


// app.listen(port,()=>{
//   console.log('app is running')
// })

app.get("/",(req,res)=>{
  res.send("server is running")
})



server.start();
server.applyMiddleware({
    app,
    path:'/graphql'
});

httpServer.listen({port:port},()=>{
    console.log(`Server ready at ${server.graphqlPath}`)
})