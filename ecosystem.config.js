module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'bot.moses',
      script    : 'index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production',
        MESSENGER_VERIFY_TOKEN: '25e838ce-7524-45c5-b6df-49a7a7430d7f',
        MESSENGER_ACCESS_TOKEN: 'EAADKZBNefPDIBABIgImuBTwV7X2c6vG1GZBRaW6hlKVCfZCie9nMiHSDeWY9FFrvSenZA4HXRzGvTPmEPKE1wlVGgBsrvUcV4gTFtxKAS7f8ujlk2QjzHPGScrQju5r1V9Gq09BNqs5CdMlEWe9UhnBnrpumkoiy1BPftDrvsgZDZD'
      }
    }
  ]
};
