/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import 'isomorphic-unfetch'
import { getDataFromTree } from '@apollo/react-ssr'
import { WithApollo } from 'components/WithApollo'
import { Link } from 'components/Link'
import { buttonStyles, boxStyles, colors } from 'theme'
import { Fragment } from 'react'
import { NextSeo } from 'next-seo'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { activityQuery } from 'apollo/queries'
import { Activity, ActivityVariables } from 'graphql-types'
import { PageLoader } from 'components/PageLoader'

const Page = () => {
  const { query } = useRouter()
  const { data, loading } = useQuery<Activity, ActivityVariables>(
    activityQuery,
    {
      variables: {
        slug: query.slug as string,
      },
    },
  )

  if (!data || !data.getObject || loading) {
    return <PageLoader />
  }

  const { title, metadata, content } = data.getObject

  return (
    <Fragment>
      <NextSeo title={title!} description={metadata.description} />
      <div
        css={css`
          ${boxStyles};
          border-radius: 0;
          width: 100vw;
          border-top: 8px solid ${colors.semiDark};
          position: sticky;
          top: 0;
          z-index: 200;
          margin-bottom: 2.4rem;
        `}
      >
        <h1
          css={css`
            font-size: 4rem;
            padding: 3.2rem 0;
            text-align: center;

            @media all and (max-width: 700px) {
              font-size: 3.2rem;
              line-height: 1.4;
              padding: 2.4rem 0.8rem;
              padding-top: 1.6rem;
              font-size: 2.6rem;
            }
          `}
        >
          {title}
        </h1>
      </div>

      <div
        css={css`
          ${boxStyles};
          border-top: 5px solid ${colors.semiDark};
          position: relative;
          z-index: 10;
          margin: 0 auto;
          width: 100%;
          max-width: 720px;
          padding: 3.2rem;
          margin-top: 4.8rem;

          @media all and (max-width: 700px) {
            padding: 2rem;
            padding-top: 1.2rem;
          }
        `}
      >
        <div
          dangerouslySetInnerHTML={{ __html: content! }}
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
              margin-bottom: 2.4rem;
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
              word-break: break-all;

              :hover,
              :focus {
                color: #3498db;
              }
            }

            .info {
              background: #fdf5e7;
              padding: 1.2rem 1.6rem;
              border-radius: 4px;
              margin-bottom: 2.4rem;
            }
          `}
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

export default WithApollo(Page, {
  getDataFromTree,
})
