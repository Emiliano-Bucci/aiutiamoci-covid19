/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from 'theme'

const animations = css`
  .lds-dual-ring {
    display: inline-block;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid ${colors.semiDark};
    border-color: ${colors.semiDark} transparent ${colors.semiDark}
      transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const PageLoader = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: inherit;
        margin: 80px 0;
        ${animations}
      `}
    >
      <div className="lds-dual-ring"></div>
    </div>
  )
}
