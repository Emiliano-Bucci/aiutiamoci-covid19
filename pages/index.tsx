import React from 'react'
import 'isomorphic-unfetch'

const Page = () => {
  return <div>Main page</div>
}

const activitiesQuery = `
  query {
    activities {
      id
      tags
      title
      category
      content
      description
      featuredImage {
        id
        imageSlug
      }
      slug
    }
  }
`

export async function getStaticProps() {
  const res = await fetch(
    'https://aiutiamoci-covid19.herokuapp.com/v1/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: activitiesQuery,
      }),
    },
  )

  const json = await res.json()

  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return {
    props: json.data,
  }
}

export default Page
