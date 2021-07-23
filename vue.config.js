module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mhs2_note/'
    : '/',
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "萌夯物語筆記";
              return args;
          })
  }
}
