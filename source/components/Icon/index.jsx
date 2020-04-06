import React from 'react';
import { string, object } from 'prop-types';

import iconSprite from 'Images/icon-sprite.svg';

const Icon = ({ width, height, type, className, style }, props) => {
  return (
    <svg width={width} height={height} className={className} style={style} aria-hidden='true' focusable='false' {...props}>
      <use xlinkHref={`${iconSprite}#${type}`}></use>
    </svg>
  );
};

Icon.propTypes = {
  width: string,
  height: string,
  type: string.isRequired,
  className: string,
  style: object
};

export default Icon;