/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { GetStaticProps, NextPage } from 'next'
import { Activity } from 'pages'
import 'isomorphic-unfetch'
import { boxStyles } from 'theme'
import { useEffect } from 'react'

type Props = {
  activity: Activity[]
}

const Page: NextPage<Props> = ({ activity }) => {
  const _activity = activity[0]

  useEffect(() => {
    if (window) {
      const links = document.querySelectorAll('a')

      links.forEach(link => {
        if (link.href.includes('tel:')) {
          link.setAttribute('target', '')
        }
      })
    }
  }, [])

  return (
    <div
      css={css`
        position: relative;
        z-index: 10;
        margin: 0 auto;
        width: 100%;
        max-width: 720px;
        padding-top: 3.2rem;

        @media all and (max-width: 700px) {
          padding: 0 1.6rem;
        }
      `}
    >
      <h1
        css={css`
          ${boxStyles};
          font-size: 4rem;
          transform: translateY(-50%);
          margin-top: -3.2rem;
          text-align: center;
          padding: 1.6rem;

          @media all and (max-width: 700px) {
            font-size: 3.2rem;
          }
        `}
      >
        {_activity.title}
      </h1>

      <div
        css={css`
          h2 {
            font-size: 2.4rem;
            margin-bottom: 1.6rem;
          }

          p {
            font-size: 1.64rem;

            :not(:last-of-type) {
              margin-bottom: 1.6rem;
            }
          }

          ul {
            margin-bottom: 1.6rem;
            list-style: disc;
            padding-left: 2rem;

            li {
              :not(:last-of-type) {
                margin-bottom: 0.8rem;
              }
            }
          }

          a {
            display: inline-block;
            color: inherit;
            transition: all 400ms;

            :hover,
            :focus {
              color: #3498db;
            }
          }

          .info {
            background: #fdf5e7;
            padding: 1.6rem;
            border: 1px solid #fad7a0;
            border-radius: 4px;
          }
        `}
        dangerouslySetInnerHTML={{ __html: _activity.content }}
      />
    </div>
  )
}

const allActivitiesQuery = `
  query {
    activity {
      activityId
      description
      title
      slug
      city
      content
      tags {
        tag {
          title
          slug
        }
      }
    }
  }
`

const activitiesQuery = `
  query($slug: String!) {
    activity(where: {
      slug: {
        _eq: $slug
      }
    }) {
      activityId
      description
      title
      slug
      city
      content
      tags {
        tag {
          title
          slug
        }
      }
    }
  }
`

export async function getStaticPaths() {
  const res = await fetch(process.env.graphqlEndpoint!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: allActivitiesQuery,
    }),
  })

  const json = await res.json()

  const paths = json.data.activity.map((activity: Activity) => {
    return {
      params: {
        slug: activity.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async props => {
  const res = await fetch(process.env.graphqlEndpoint!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: activitiesQuery,
      variables: {
        slug: props.params!.slug,
      },
    }),
  })

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
