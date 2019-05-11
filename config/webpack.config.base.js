module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [ { loader: 'babel-loader' }, { loader: 'ts-loader' } ]
      },
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.(ts|js)$/, loader: 'eslint-loader' }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  }
}