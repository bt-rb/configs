module.exports = function btrbWebPreset(_api, options = {}) {
  const { debug = false, browsers } = options

  const presets = [
    [
      require.resolve("@babel/preset-env"),
      {
        targets: browsers,
        debug,
        bugfixes: true,
        shippedProposals: true,
      },
    ],
  ]

  const plugins = [
    [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    [require.resolve("@babel/plugin-transform-runtime"), { helpers: false }],
  ]

  return {
    presets,
    plugins,
  }
}
