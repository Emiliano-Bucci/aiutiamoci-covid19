/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import 'isomorphic-unfetch'
import { colors } from 'theme'
import { shadow } from 'theme/shadow'
import Logo from 'public/virus.svg?sprite'

const Page = () => {
  return (
    <div>
      <header
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 400px;
          background-color: #fff;
          border-top: 8px solid ${colors.semiLight};
          box-shadow: ${shadow.light};
          text-align: center;
          position: relative;
        `}
      >
        <div
          css={css`
            margin-top: 3.2rem;
          `}
        >
          <h1
            css={css`
              font-size: 6.4rem;

              @media all and (max-width: 700px) {
                font-size: 4rem;
                padding: 0 2.4rem;
              }
            `}
          >
            Aiutiamoci Covid 19
          </h1>
          <span
            css={css`
              font-size: 4rem;
              text-align: center;
              display: inline-block;
              font-family: 'Lato';
            `}
          >
            Aiutiamoci per aiutare
          </span>
        </div>

        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 0;

            svg {
              flex-shrink: 0;
              width: 72px;
              height: 72px;
              opacity: 0.64;
              margin-top: 4rem;
            }
          `}
        >
          <Logo />
        </div>
      </header>
      <main
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          padding-bottom: 4rem;
        `}
      >
        main!
      </main>
    </div>
  )
}

const activitiesQuery = `
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
