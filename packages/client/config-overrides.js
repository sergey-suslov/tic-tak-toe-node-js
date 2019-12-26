/* eslint-disable */
const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    //  modifyVars: {},
    modifyVars: {
      '@primary-color': '#1565c0',
      '@secondary-color': 'rgba(0, 0, 0, .9)',
      '@link-color': '#161211',
      '@success-color': '#6E9B8E',
      '@warning-color': '#faad14',
      '@error-color': '#d81b60',
      //  '@checkbox-check-color': 'rgba(0, 0, 0, 0.9)',
      '@checkbox-color': 'rgba(0, 0, 0, 0.9)',
      '@font-size-base': '14px',
      '@heading-color': 'rgba(0, 0, 0, 0.9)',
      '@text-color': 'rgba(0, 0, 0, 0.9)',
      '@text-color-secondary' : 'rgba(0, 0, 0, .9)',
      '@disabled-color' : 'rgba(0, 0, 0, .25)',
      '@border-radius-base': '4px',
      '@border-color-base': 'rgba(0, 0, 0, .9)',
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
      '@font-family': `'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
       'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
       'Segoe UI Emoji', 'Segoe UI Symbol'`,
      '@statistic-font-family': '\'Open Sans\', \'OpenSans\', Tahoma, \'Helvetica Neue\', @font-family;'
    }
  }),
)