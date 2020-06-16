const graphql = require('graphql');

// import models
const ExampleModel = require('../models/exampleModel.js');

// get GraphQL types
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

/*
    Object Types -> Fields & types
*/

// Note: replace {ExampleModel} with eg {Book} ...

const ExampleModelType = new GraphQLObjectType({
  name: 'ExampleModel',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

/*
    Root Queries
*/

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    exampleModel: {
      type: ExampleModelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ExampleModel.findById(args.id);
      }
    },
    exampleModels: {
      type: new GraphQLList(ExampleModelType),
      resolve(parent, args) {
        return ExampleModel.find({});
      }
    }
    // etc
  }
});

/*
    Mutations
*/

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addExampleModel: {
      type: ExampleModelType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let newExampleModel = new ExampleModel({
          name: args.name
        });

        // returns added data + pushes to db
        return newExampleModel.save();
      }
    }
  }
});

// Export schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
