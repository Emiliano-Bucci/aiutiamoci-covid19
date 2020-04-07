// import { DocumentNode } from 'graphql'

// type FetchAPI<QueryResult, QueryVariables> = {
//   query: QueryResult
//   variables?: QueryVariables
// }

// export async function fetchAPI<
//   QueryResult,
//   QueryVariables = OperationVariables
// >({ query, variables }: FetchAPI) {
//   const res = await fetch(process.env.graphqlEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   })

//   const json = await res.json()
//   if (json.errors) {
//     console.error(json.errors)
//     throw new Error('Failed to fetch API')
//   }
//   return json.data
// }
