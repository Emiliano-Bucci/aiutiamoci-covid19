import React, { Fragment } from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from 'theme'
import { Head } from 'components/Head'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head />
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default App
