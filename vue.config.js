module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    https: true
  }
  // pwa: {
  //   name: 'Carcassonne',
  //   short_name: 'Carcassonne',
  //   start_url: "index.html",
  //   display: "standalone",
  //   background_color: '#000000',
  //   themeColor: '#4DBA87',
  //   msTileColor: '#000000',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'black',
  //   manifestOptions: {
  //     background_color: "#42b983"
  //   },
  //   icons: [
  //
  //   ]
    // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'service-worker.js',
    //   // ...other Workbox options...
    // }
  // }
}
