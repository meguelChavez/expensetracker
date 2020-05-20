module.exports = {
  google: {
    clientID: process.env.Google_ClientID,
    clientSecret: process.env.Google_ClientSecret
  },
  twitter: {
    CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TOKEN_SECRET: process.env.TWITTER_TOKEN_SECRET
  },
  MongoDB: {
    URI: process.env.MONGODB_URI
  },
  session: {
    cookieKey: process.env.cookieKey
  }
};
