//const pixijs = jest.genMockFromModule('pixi.js');
const pixijs = {};
class TextureMock {
  constructor() {
    this.width = 320;
    this.height = 240;
  }
}

function generateTextureResourceMock(width = 320, height = 240) {
  const textureResourceMock = new TextureResourceMock();
  textureResourceMock.texture.width = width;
  textureResourceMock.texture.height = height;
  return textureResourceMock;
}

class TextureResourceMock {
  constructor() {
    this.texture = new TextureMock();
  }
}

const resourcesMock = {
  'img/card/card.png': generateTextureResourceMock(320, 280),
  'img/card/card_back.png': generateTextureResourceMock(320, 280),
  'img/card/1.png': generateTextureResourceMock(),
  'img/card/2.png': generateTextureResourceMock(),
  'img/card/3.png': generateTextureResourceMock(),
  'img/card/dairi.png': generateTextureResourceMock(),
  'img/card/dragon.png': generateTextureResourceMock(),
  'img/card/garnet.png': generateTextureResourceMock(),
  'img/card/ichimi.png': generateTextureResourceMock(),
  'img/card/nanashi.png': generateTextureResourceMock(),
  'img/card/nyan.png': generateTextureResourceMock(),
  'img/card/score1.png': generateTextureResourceMock(),
  'img/card/score2.png': generateTextureResourceMock(),
  'img/card/score3.png': generateTextureResourceMock(),
  'img/card/yarn.png': generateTextureResourceMock(),
};

class LoaderMock {
  constructor(baseUrl, concurrency) {
    this.resources = resourcesMock;
  }

  add(...files) {
    if (files.length === 1) {
      if (files[0] != null) {
        files.map(v => {
          if (this.resources[v] != null) {
            // [フルファイル名、ファイル名、拡張子だけ] が返ってくる正規表現
            const ext = v.match(/(.*)(?:\.([^.]+$))/)[2];
            if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
              this.resources[v] = new TextureResourceMock();
            }
          }
        });
      }
    }
  }
}
class DisplayObject {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Container extends DisplayObject {
  addChild(container) {}
}
class Sprite extends Container {
  constructor(texture) {
    super();
    this.texture = texture;
    this.width = texture.width;
    this.height = texture.height;
  }
}
class Text extends Container {
  constructor(text, style, canvas) {
    super();
    this.text = text;
  }
}
pixijs.DisplayObject = DisplayObject;
pixijs.Container = Container;
pixijs.Sprite = Sprite;
pixijs.loaders = {};
pixijs.loaders.Loader = LoaderMock;
pixijs.loader = new LoaderMock();
pixijs.loader.resources = resourcesMock;
pixijs.__init = () => {
  pixijs.loader = new LoaderMock();
};
pixijs.Text = Text;

module.exports = pixijs;
