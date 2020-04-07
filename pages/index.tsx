/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import 'isomorphic-unfetch'
import { colors, boxStyles, buttonStyles } from 'theme'
import { shadow } from 'theme/shadow'
import Logo from 'public/virus.svg?sprite'
import TagSVG from 'public/tag.svg?sprite'
import { Link } from 'components/Link'

type Tag = {
  tag: {
    title: string
    slug: string
  }
}

type Activity = {
  activityId: string
  description: string
  title: string
  slug: string
  city: string
  content: string
  tags: Tag[]
}

const Page = ({ activity }: { activity: Activity[] }) => {
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
        <div
          css={css`
            position: relative;
            z-index: 10;
            margin: 0 auto;
            margin-top: -4rem;
            width: 100%;
            max-width: 720px;
          `}
        >
          {activity.map(activity => {
            return (
              <article
                key={activity.activityId}
                css={css`
                  ${boxStyles};
                  padding: 2.4rem;
                  padding-top: 1.6rem;
                  border-left: 5px solid ${colors.semiLight};
                `}
              >
                <div>
                  <h2
                    css={css`
                      font-size: 2.8rem;
                      margin-bottom: 0.8rem;
                    `}
                  >
                    {activity.title}
                  </h2>
                  <span
                    css={css`
                      display: block;
                    `}
                  >
                    {activity.description}
                  </span>
                </div>

                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 2.4rem;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      flex: 1;
                      margin-right: 3.2rem;
                    `}
                  >
                    <ul
                      css={css`
                        display: flex;
                        flex-flow: wrap;
                      `}
                    >
                      {activity.tags.map(tag => {
                        return (
                          <li
                            key={tag.tag.slug}
                            css={css`
                              display: flex;
                              align-items: center;
                              font-size: 1.4rem;
                              background-color: ${colors.semiLight};
                              border-radius: 4px;
                              color: #fff;
                              padding: 0.4rem 0.8rem;

                              :not(:last-of-type) {
                                margin-right: 0.8rem;
                              }
                            `}
                          >
                            <span
                              css={css`
                                margin-right: 0.64rem;
                              `}
                            >
                              <TagSVG
                                css={css`
                                  width: 16px;
                                  height: 16px;
                                  fill: #fff;
                                  color: #fff;
                                `}
                              />
                            </span>

                            <span>{tag.tag.title}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <Link
                    href="/attivita/[slug]"
                    as={`/attivita/${activity.slug}`}
                    customStyles={buttonStyles}
                  >
                    Vedi attività
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
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
