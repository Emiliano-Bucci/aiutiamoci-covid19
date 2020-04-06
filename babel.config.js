module.exports = api => {
  api.cache(true)

  // adapt this to your setup
  const presets = ['next/babel']

  return {
    presets,
  }
}
