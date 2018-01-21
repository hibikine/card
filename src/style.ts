import appConfig from './app-config';

const style = {
  player: {
    handNumberText: {
      style: { fontSize: 100, fill: 0xffffff },
    },
  },
  card: {
    costText: {
      style: { fontSize: 40 },
      x: 290,
      y: 10,
    },
    nameText: {
      style: {
        fontSize: 35,
      },
      x: 10,
      y: 5,
    },
    picture: {
      get width() {
        return style.card.sprite.width - 20;
      },
      x: 10,
      y: 50,
    },
    sprite: {
      width: 320,
    },
  },
  supplyList: {
    characterSupplies: {
      y: 160,
      scaleX: 1.1,
    },
  },
  cardDetail: {
    x: appConfig.width,
    y: appConfig.height,
  },
};

export default style;
