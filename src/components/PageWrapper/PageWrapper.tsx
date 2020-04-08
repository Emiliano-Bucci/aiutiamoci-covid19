/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { colors, boxStyles } from 'theme'
import { shadow } from 'theme/shadow'
import Logo from 'public/virus.svg?sprite'
import { Link } from 'components/Link'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  const { pathname } = useRouter()
  const isHomePage = pathname === '/'

  return (
    <div>
      <header
        css={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 400px;
          background-color: #fff;
          border-top: 8px solid ${colors.semiLight};
          box-shadow: ${shadow.light};
          text-align: center;
          position: relative;

          & > * {
            flex-shrink: 0;
          }
        `}
      >
        <div
          css={css`
            margin-top: 10rem;
            margin-bottom: 2.4rem;
            position: relative;
            z-index: 100;
          `}
        >
          <h1
            css={css`
              font-size: 6.4rem;

              @media all and (max-width: 700px) {
                font-size: 3.8rem;
                padding: 0 2.4rem;
              }
            `}
          >
            Covid 19
          </h1>
          <span
            css={css`
              font-size: 4rem;
              text-align: center;
              display: inline-block;
              font-family: 'Lato';

              @media all and (max-width: 700px) {
                font-size: 2.6rem;
              }
            `}
          >
            Aiutiamoci per aiutare
          </span>
        </div>

        <div
          css={css`
            position: relative;
            z-index: 100;
            max-width: 560px;
            padding: 0.8rem;
            border-radius: 4px;
            background-color: #fdf5e7;
            border: 1px solid #fad7a0;

            @media all and (max-width: 700px) {
              border-radius: 0;
            }
          `}
        >
          <p>
            In questo portale vengono elencate le attività che operano
            ancora in questo periodo di crisi effettuando consegne a
            domicilio oppure consulenze a distanza.
          </p>
        </div>

        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 0;

            a {
              opacity: 1 !important;
            }
          `}
        >
          <Link
            href="/"
            as="/"
            isDisabled={isHomePage}
            title="Torna alla pagina principale"
            customStyles={css`
              align-self: flex-start;
              margin-top: 4rem;

              svg {
                flex-shrink: 0;
                width: 72px;
                height: 72px;
                fill: ${colors.dark};
              }
            `}
          >
            <Logo />
          </Link>
        </div>
      </header>

      <main
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 8rem;

          & > * {
            flex-shrink: 0;
          }

          @media all and (max-width: 700px) {
            padding: 0 1.6rem;
            padding-bottom: 8rem;
          }
        `}
      >
        {children}

        <div
          css={css`
            max-width: 720px;
            padding: 2.4rem;
            padding-top: 2rem;
            margin: 0 auto;
            position: relative;
            z-index: 100;
            margin-top: 8rem;
            border-top: 5px solid ${colors.semiDark};
            text-align: center;
            ${boxStyles}
          `}
        >
          <h2
            css={css`
              font-size: 3.2rem;
              margin-bottom: 0.8rem;
            `}
          >
            Collabora anche tu!
          </h2>
          <p
            css={css`
              margin-bottom: 1.6rem;
            `}
          >
            Vuoi aggiungere la tua attività? Nessun problema, scrivimi
            a{' '}
            <a
              css={css`
                color: inherit;
                transition: color 400ms;

                :hover {
                  color: #3498db;
                }
              `}
              href="mailto:emilianobucci@outlook.com"
            >
              emiliano.bucci@outlook.com
            </a>{' '}
            e provvederò ad aggiornale la lista! Questo è un progetto
            completamente <strong>gratuito</strong> con l'unico scopo
            di avvicinare <strong>domanda</strong> e{' '}
            <strong>offerta</strong> in questo periodo tumultuoso,
            difficile e di grandi cambiamenti.
          </p>
          <blockquote
            css={css`
              opacity: 0.8;
              font-style: italic;
            `}
          >
            ~ Aiutiamoci per aiutare ~
          </blockquote>
        </div>
      </main>

      <footer
        css={css`
          padding: 1.6rem 0;
          background-color: ${colors.semiDark};
          text-align: center;
          border-bottom: 5px solid ${colors.dark};
        `}
      >
        <span
          css={css`
            display: block;
            color: #fff;
            font-size: 1.6rem;
            font-style: italic;
            margin-bottom: 0.4rem;
          `}
        >
          - Andrà tutto bene -
        </span>
        <span
          css={css`
            color: #fff;
            font-size: 1.32rem;
            display: block;

            a {
              color: inherit;
              transition: color 400ms;

              :hover {
                color: #eee;
              }
            }
          `}
        >
          Made with &#9829; by{' '}
          <a
            href="https://www.facebook.com/profile.php?id=693248867"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emiliano Bucci
          </a>
        </span>
      </footer>
    </div>
  )
}
