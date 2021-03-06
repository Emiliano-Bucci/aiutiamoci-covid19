import { css } from '@emotion/core'
import { colors } from './colors'
import { shadow } from './shadow'

export const globalStyles = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  img,
  svg {
    vertical-align: middle;
  }

  /* lato-regular - latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/lato-v16-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Lato Regular'), local('Lato-Regular'),
      url('/fonts/lato-v16-latin-regular.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('/fonts/lato-v16-latin-regular.woff2')
        format('woff2'),
      /* Super Modern Browsers */
        url('/fonts/lato-v16-latin-regular.woff') format('woff'),
      /* Modern Browsers */ url('/fonts/lato-v16-latin-regular.ttf')
        format('truetype'),
      /* Safari, Android, iOS */
        url('/fonts/lato-v16-latin-regular.svg#Lato') format('svg'); /* Legacy iOS */
  }

  /* nunito-regular - latin */
  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/nunito-v11-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Nunito Regular'), local('Nunito-Regular'),
      url('/fonts/nunito-v11-latin-regular.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('/fonts/nunito-v11-latin-regular.woff2')
        format('woff2'),
      /* Super Modern Browsers */
        url('/fonts/nunito-v11-latin-regular.woff') format('woff'),
      /* Modern Browsers */ url('/fonts/nunito-v11-latin-regular.ttf')
        format('truetype'),
      /* Safari, Android, iOS */
        url('/fonts/nunito-v11-latin-regular.svg#Nunito')
        format('svg'); /* Legacy iOS */
  }
  /* nunito-700 - latin */
  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/nunito-v11-latin-700.eot'); /* IE9 Compat Modes */
    src: local('Nunito Bold'), local('Nunito-Bold'),
      url('/fonts/nunito-v11-latin-700.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('/fonts/nunito-v11-latin-700.woff2')
        format('woff2'),
      /* Super Modern Browsers */
        url('/fonts/nunito-v11-latin-700.woff') format('woff'),
      /* Modern Browsers */ url('/fonts/nunito-v11-latin-700.ttf')
        format('truetype'),
      /* Safari, Android, iOS */
        url('/fonts/nunito-v11-latin-700.svg#Nunito') format('svg'); /* Legacy iOS */
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
    position: relative;
  }

  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
    font-size: 1.6rem;
    letter-spacing: 0.088rem;
    line-height: 1.618;
    color: #515151;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    background-color: ${colors.light};
  }

  button,
  input,
  textarea {
    letter-spacing: inherit;
    font-family: inherit;
    font-size: 1.4rem;
  }

  button {
    line-height: 1.418;
  }

  strong {
    font-weight: 600;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: 0.16rem;
    color: #414141;
    font-family: 'Lato';
  }

  h1 {
    line-height: 1;
  }

  select {
    -webkit-appearance: none;
  }

  /* Used by the Media query lib to not break styles */
  .fresnel-container {
    width: 100%;
  }

  a,
  *::after,
  *::before {
    outline: none;
  }
`

export const boxStyles = css`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${shadow.dark};
`

export const buttonStyles = css`
  border: none;
  display: block;
  color: inherit;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  transition: all 400ms;
  background-color: ${colors.semiDark};
  outline: none;
  text-decoration: none;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  cursor: pointer;

  :hover,
  :focus {
    background-color: ${colors.dark};
  }
`
