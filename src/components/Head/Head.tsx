import React from 'react'
import NextHead from 'next/head'

export const Head = () => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="theme-color" content="#1f4e5f" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />
    <meta name="msapplication-TileColor" content="#1f4e5f" />
  </NextHead>
)
