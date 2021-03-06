/* eslint-disable */
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const path = require('path')

const nextConfig = {
  target: 'experimental-serverless-trace',
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // custom webpack aliases
      components: path.resolve(__dirname, 'src/components'),
      apollo: path.resolve(__dirname, 'src/apollo'),
      pages: path.resolve(__dirname, 'pages'),
      theme: path.resolve(__dirname, 'src/theme'),
      utils: path.resolve(__dirname, 'src/utils'),
      public: path.resolve(__dirname, 'public'),
      types: path.resolve(__dirname, 'src/types'),
      'graphql-types': path.resolve(__dirname, 'src/graphql-types/'),
    }

    return config
  },
  env: {
    bucketSlug: 'aiutiamoci-covid19',
    graphqlEndpointReadKey:
      'wcZUxZQeEnxEugFyx6FU3MJKEYjoApD7487plZ3DYgYhbG2krV',
    graphqlEndpoint: 'https://graphql.cosmicjs.com/v2',
  },
}

module.exports = withPlugins([optimizedImages], nextConfig)
