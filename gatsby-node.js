// Fixing third-party firebase modules which references “browser globals” like window or document.  
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /firebase/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }