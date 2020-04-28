import CopyWebpackPlugin from "copy-webpack-plugin";
import ImageminPlugin from "imagemin-webpack-plugin";
import imageminMozjpeg from "imagemin-mozjpeg";

export default (config) => {
  // Take everything under src/assets and copy it into root build destination
  config.plugins.push(
    // new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }])
    new CopyWebpackPlugin([
      { from: `${__dirname}/src/assets/admin`, to: `${__dirname}/build/admin` },
      { from: `${__dirname}/src/public`, to: `${__dirname}/build/` },
      {
        from: `${__dirname}/src/assets/images`,
        to: `${__dirname}/src/assets/images-esm`,
      },
    ]),
    new ImageminPlugin({
      test: /\/images\/.+\.(jpe?g)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
        }),
      ],
    }),
    new ImageminPlugin({
      test: /\/images-esm\/.+\.(jpe?g)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
        }),
      ],
    })
  );
};
