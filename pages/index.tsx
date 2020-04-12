/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import 'isomorphic-unfetch'
import { colors, boxStyles, buttonStyles } from 'theme'
import TagSVG from 'public/tag.svg?sprite'
import { Link } from 'components/Link'
import { Fragment, useState } from 'react'

type Tag = {
  title: string
  slug: string
  _id: string
}

type City = {
  title: string
  slug: string
  _id: string
}

export type Activity = {
  _id: string
  title: string
  slug: string
  content: string
  metadata: {
    city: City
    tags: Tag[]
    description: string
  }
}

type FilterState = {
  tag: string
  city: string
}

const defaultFilterState = {
  tag: 'Tutti',
  city: 'Tutte',
}

const selectStyles = css`
  border: none;
  background-color: ${colors.semiDark};
  padding: 1.2rem 1.6rem;
  cursor: pointer;
  transition: all 400ms;
  outline: none;
  font-size: 1.4rem;
  font-family: inherit;
  letter-spacing: inherit;
  width: 100%;
  border-radius: 4px;
  color: #fff;

  :hover,
  :focus {
    color: #fff;
    background-color: ${colors.dark};
  }
`

const Page = ({ objects: activities }: { objects: Activity[] }) => {
  const [filterState, setFilterState] = useState<FilterState>(
    defaultFilterState,
  )

  const filteredEvents = activities
    .filter(activity => {
      if (filterState.tag === 'Tutti') {
        return activity
      }

      return activity.metadata.tags.some(
        tag => tag.title === filterState.tag,
      )
    })
    .filter(activity => {
      if (filterState.city === 'Tutte') {
        return activity
      }

      return filterState.city === activity.metadata.city.title
    })

  const cities = activities.map(
    activity => activity.metadata.city.title,
  )
  const filteredCitites = cities
    .filter((city, index) => cities.indexOf(city) === index)
    .filter(city => !!city)
  filteredCitites.unshift('Tutte')

  const tags = [] as string[]

  activities.forEach(activity => {
    activity.metadata.tags.forEach(__tag => {
      tags.push(__tag.title)
    })
  })

  const filteredTags = tags.filter(
    (tag, index) => tags.indexOf(tag) === index,
  )
  filteredTags.unshift('Tutti')

  const resetButtonIsDisabled =
    filterState.city === 'Tutte' && filterState.tag === 'Tutti'

  return (
    <Fragment>
      <div
        css={css`
          ${boxStyles};
          display: flex;
          justify-content: center;
          max-width: 100vw;
          width: 100vw;
          z-index: 50;
          padding: 2.4rem;
          padding-top: 1.6rem;
          border-top: 8px solid ${colors.semiDark};
          position: sticky;
          top: 0;
          z-index: 200;
          border-radius: 0;
          margin-bottom: 2.4rem;

          @media all and (max-width: 700px) {
            padding: 1.6rem;
          }
        `}
      >
        <div>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 2.4rem;

              @media all and (max-width: 450px) {
                margin-bottom: 0.8rem;
              }
            `}
          >
            <h3
              css={css`
                font-size: 2.4rem;
                text-align: center;
              `}
            >
              Filtra le attività
            </h3>

            <button
              disabled={resetButtonIsDisabled}
              onClick={() => {
                setFilterState(defaultFilterState)
              }}
              css={css`
                ${buttonStyles};
                padding: 0.8rem 2rem;
                ${resetButtonIsDisabled
                  ? css`
                      opacity: 0.5;
                      pointer-events: none;
                    `
                  : undefined}
              `}
            >
              Reset
            </button>
          </div>

          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;

              & > * {
                flex: 1;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                margin-right: 4rem;

                @media all and (max-width: 450px) {
                  margin-right: 1.6rem;
                }
              `}
            >
              <label
                htmlFor="cities"
                css={css`
                  margin-right: 0.8rem;
                `}
              >
                Scegli una città:
              </label>

              <select
                id="cities"
                css={selectStyles}
                value={filterState.city}
                onChange={event => {
                  const value = event.target.value
                  setFilterState(prevState => ({
                    ...prevState,
                    city: value,
                  }))
                }}
              >
                {filteredCitites.map(city => {
                  return (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  )
                })}
              </select>
            </div>

            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <label id="tags">Scegli un tag:</label>
              <select
                id="tags"
                css={selectStyles}
                value={filterState.tag}
                onChange={event => {
                  const value = event.target.value
                  setFilterState(prevState => ({
                    ...prevState,
                    tag: value,
                  }))
                }}
              >
                {filteredTags.map(tag => {
                  return (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

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
        {filteredEvents.map(activity => {
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
                  align-items: flex-end;
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
                      margin-bottom: -4px;
                      margin-left: -4px;

                      li {
                        margin: 4px;
                      }
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
    </Fragment>
  )
}

export const allActivitiesQuery = `
  query {
    getObjects(
      bucket_slug: "${process.env.bucketSlug}"
      input: {
        read_key: "${process.env.graphqlEndpointReadKey}"
        type: "activities",
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
