/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const fullNameResolver = source => `${source.firstName} ${source.name}`
// exports.createSchemaCustomization = ({ actions, schema }) => {
//   actions.createTypes([
//     {
//       name: "AuthorJson",
//       interfaces: ["Node"],
//       fields: {
//         fullName: {
//           type: "String",
//           resolve: fullNameResolver,
//         },
//       },
//     },
//     {
//       name: "ContributorJson",
//       interfaces: ["Node"],
//       fields: {
//         fullName: {
//           type: "String",
//           resolve: fullNameResolver,
//         },
//       },
//     },
//   ])
// }

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions
//   const typeDefs = [
//     schema.buildObjectType({
//       name: "ContributorJson",
//       fields: {
//         name: "String!",
//         firstName: "String!",
//         email: "String!",
//         receivedSwag: {
//           type: "Boolean",
//           resolve: source => source.receivedSwag || false,
//         },
//       },
//       interfaces: ["Node"],
//     }),
//   ]
//   createTypes(typeDefs)
// }
