const express = require("express");
const app = express();
const PORT = 6969;
const userData = require("./Faker.json");
const graphql = require("graphql")
const { graphqlHTTP } = require("express-graphql") 

app.listen(PORT,(err)=>{
    console.log(err ? "Server Crashed" :"Server is serving faster than a supercar")
})