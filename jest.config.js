// TODO: Strings should avoid referencing the node_modules directory (prefer require.resolve)

module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testPathIgnorePatterns: [".*/tests/fixtures/"],
  testRegex: ".*\\.test\\.(tsx?|jsx?)$",
}
