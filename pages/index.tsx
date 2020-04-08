/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import 'isomorphic-unfetch'
import { colors, boxStyles, buttonStyles } from 'theme'
import TagSVG from 'public/tag.svg?sprite'
import { Link } from 'components/Link'

type Tag = {
  title: string
  slug: string
  _id: string
}

export type Activity = {
  _id: string
  title: string
  slug: string
  content: string
  city: string
  metadata: {
    tags: Tag[]
    description: string
  }
}

const Page = ({ objects: activity }: { objects: Activity[] }) => {
  return (
    <div
      css={css`
        position: relative;
        z-index: 10;
        margin: 0 auto;
        padding-top: 4rem;
        width: 100%;
        max-width: 720px;
      `}
    >
      {activity.map(activity => {
        return (
          <article
            key={activity._id}
            css={css`
              ${boxStyles};
              padding: 2.4rem;
              padding-top: 1.6rem;
              border-left: 5px solid ${colors.semiLight};

              :not(:last-of-type) {
                margin-bottom: 4rem;
              }

              @media all and (max-width: 700px) {
                padding: 2rem;
                padding-top: 1.2rem;
              }
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
                {activity.metadata.description}
              </span>
            </div>

            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-top: 2.4rem;

                @media all and (max-width: 700px) {
                  flex-direction: column;
                  align-items: stretch;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex: 1;
                  margin-right: 3.2rem;

                  @media all and (max-width: 700px) {
                    margin-right: 0;
                  }
                `}
              >
                <ul
                  css={css`
                    display: flex;
                    flex-flow: wrap;
                  `}
                >
                  {activity.metadata.tags.map(tag => {
                    return (
                      <li
                        key={tag.slug}
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

                          @media all and (max-width: 700px) {
                            margin-bottom: 0.8rem;
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
                              width: 14px;
                              height: 14px;
                              fill: #fff;
                              color: #fff;
                            `}
                          />
                        </span>

                        <span>{tag.title}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div
                css={css`
                  @media all and (max-width: 700px) {
                    margin-top: 0.8rem;
                  }
                `}
              >
                <Link
                  href="/attivita/[slug]"
                  as={`/attivita/${activity.slug}`}
                  customStyles={buttonStyles}
                  title={`Visita l'attività ${activity.title}`}
                >
                  Vedi attività
                </Link>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export const allActivitiesQuery = `
  query {
    getObjects(
      bucket_slug: "${process.env.bucketSlug}"
      input: {
        read_key: "${process.env.graphqlEndpointReadKey}"
        type: "activities"
      }
    ) {
      objects {
        _id
        title
        content
        slug
        metadata
      }
    }
  }
`

export async function getStaticProps() {
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

  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return {
    props: json.data.getObjects,
  }
}

export default Page
