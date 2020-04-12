import React, { Fragment, useEffect } from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from 'theme'
import { Head } from 'components/Head'
import { DefaultSeo } from 'next-seo'
import { PageWrapper } from 'components/PageWrapper'
import { hotjar } from 'react-hotjar'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      hotjar.initialize(1765178, 6)
    }
  }, [])

  return (
    <Fragment>
      <Head />
      <DefaultSeo
        title="Covid 19 - Aiutiamoci per aiutare"
        description="Una raccolta delle attività ancora aperte e informazioni utili su cosa fanno e come contattarli"
      />
      <Global styles={globalStyles} />
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </Fragment>
  )
}

export default App
