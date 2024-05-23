import React from 'react';
import {View, Image} from 'react-native';
import Matter from 'matter-js';

const water = require('../assets/water.png');

const FloorComponent = props => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  return (
    <View
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: props.color || 'pink',
        },
      ]}>
      <Image
        style={{width: width, height: height}}
        source={water}
        resizeMode="stretch"
      />
    </View>
  );
};

export const Floor = (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {isStatic: true, friction: 1},
  );
  Matter.World.add(world, [initialFloor]);

  return {
    body: initialFloor,
    size: [size.width, size.height],
    color: color,
    renderer: <FloorComponent />,
  };
};
