/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { colors } from 'theme'
import { shadow } from 'theme/shadow'
import Logo from 'public/virus.svg?sprite'

type Props = {
  children: React.ReactNode
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
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
                font-size: 3.8rem;
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
              margin-top: 4rem;
              fill: ${colors.dark};
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
          padding-bottom: 8rem;
        `}
      >
        {children}
      </main>

      <footer
        css={css`
          padding: 1.6rem 0;
          background-color: ${colors.semiDark};
          text-align: center;
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
