module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _core: './src/components/core',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _theme: './src/theme',
          _toolbox: './src/components/toolbox',
          _utils: './src/utils',
        },
      },
    },
  },
};
