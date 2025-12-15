import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [{ destination: 'index.css', format: 'css/variables' }]
    }
  }
});

await sd.buildAllPlatforms();