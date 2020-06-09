export const assetAlgo = {
  main: {
    name: 'My great algo',
    dateCreated: '2012-02-01T10:55:11Z',
    author: 'Alex',
    type: 'algorithm',
    algorithm: {
      format: 'docker-image',
      version: '0.1',
      container: {
        entrypoint: 'node $ALGO',
        image: 'node',
        tag: '10'
      }
    },
    license: 'CC0: Public Domain',
    price: '0',
    files: [
      {
        index: 0,
        contentType: 'application/text',
        contentLength: '12057507',
        compression: 'zip',
        encoding: 'UTF-8',
        url:
          'https://raw.githubusercontent.com/oceanprotocol/test-algorithm/master/javascript/algo.js'
      }
    ]
  },
  additionalInformation: {
    description: 'My super algo'
  }
}

export const rawAlgoMeta = {
  rawcode: `console.log('Hello world'!)`,
  format: 'docker-image',
  version: '0.1',
  container: {
    entrypoint: 'node $ALGO',
    image: 'node',
    tag: '10'
  }
}
