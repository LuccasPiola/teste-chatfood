module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/styles/base.scss";
        @import "@/styles/breakpoints.scss";
        `,
      },
    },
  },
}
