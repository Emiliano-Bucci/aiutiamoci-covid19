import gql from 'graphql-tag'

export const activityQuery = gql`
  query Activity($slug: String!) {
    getObject(
      bucket_slug: "aiutiamoci-covid19"
      input: {
        slug: $slug
        read_key: "wcZUxZQeEnxEugFyx6FU3MJKEYjoApD7487plZ3DYgYhbG2krV"
      }
    ) {
      _id
      title
      content
      metadata
    }
  }
`
