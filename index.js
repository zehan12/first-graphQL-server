const express = require("express");
const app = express();
const PORT = 6969;
const userData = require("./Faker.json");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require("graphql")


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            }, 
            resolve(parent, args) {
                userData.push({
                    id: userData.length+Math.floor((Math.random() * 100) + 1),
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                return args
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery, mutation: Mutation
});

app.use('/garphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, (err) => {
    console.log(err ? "Server Crashed" : "Server is serving faster than a supercar")
})