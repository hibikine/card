interface TextureSprite {
  width: number;
  height: number;
  texture: {
    height: number;
    width: number;
  };
}

export function setWidthWithTextureAspect<T extends TextureSprite>(sprite: T, width: number): T {
  sprite.width = width;
  sprite.height = width * sprite.texture.height / sprite.texture.width;
  return sprite;
}
