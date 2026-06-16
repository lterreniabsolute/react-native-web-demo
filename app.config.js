// app.config.js sovrascrive app.json in Expo quando presente.
// Legge EXPO_BASE_URL dall'ambiente: su GitHub Actions sarà
// '/react-native-web-demo/', in locale rimane vuoto.
const baseConfig = require('./app.json');

module.exports = ({ config }) => ({
  ...baseConfig.expo,
  experiments: {
    ...baseConfig.expo.experiments,
    baseUrl: process.env.EXPO_BASE_URL ?? '',
  },
});
