const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
require("dotenv").config();

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
mongoose
  .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => console.log(err));
