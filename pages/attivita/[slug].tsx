/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { GetStaticProps, NextPage } from 'next'
import { Activity, allActivitiesQuery } from 'pages'
import 'isomorphic-unfetch'
import { boxStyles, buttonStyles, colors } from 'theme'
import { Fragment } from 'react'
import { NextSeo } from 'next-seo'
import { Link } from 'components/Link'

const Page: NextPage<Activity> = ({ title, metadata, content }) => {
  return (
    <Fragment>
      <NextSeo title={title} description={metadata.description} />
      <div
        css={css`
          position: relative;
          z-index: 10;
          margin: 0 auto;
          width: 100%;
          max-width: 720px;
          padding-top: 3.2rem;

          @media all and (max-width: 700px) {
            padding: 0;
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
              margin-top: 0;
            }
          `}
        >
          {title}
        </h1>

        <div
          css={css`
            margin-bottom: 3.2rem;

            h2 {
              font-size: 2.4rem;
              margin-bottom: 1.6rem;
              position: relative;
              display: inline-block;

              ::before {
                content: '';
                position: absolute;
                display: block;
                width: 100%;
                height: 5px;
                background-color: ${colors.semiLight};
                opacity: 0.4;
                top: 100%;
                left: 0;
              }
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
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Link
          href="/"
          as="/"
          customStyles={css`
            ${buttonStyles};
            padding: 1.2rem 1.6rem;
          `}
        >
          Torna alla pagina principale
        </Link>
      </div>
    </Fragment>
  )
}

const activityQuery = `
  query($slug: String!){
    getObject(bucket_slug: "${process.env.bucketSlug}", input: {
      slug: $slug,
      read_key: "${process.env.graphqlEndpointReadKey}"
    }) {
      _id
      title
      content
      metadata
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

  const paths = json.data.getObjects.objects.map(
    (activity: Activity) => {
      return {
        params: {
          slug: activity.slug,
        },
      }
    },
  )

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
      query: activityQuery,
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
    props: json.data.getObject,
  }
}

export default Page
