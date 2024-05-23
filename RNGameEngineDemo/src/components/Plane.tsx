import Matter from 'matter-js';
import {Image} from 'react-native';
import React from 'react';

const airplane = require('../assets/airplane.png');

interface IPlaneProps {
  size: [];
  body: {
    position: {
      x: number;
      y: number;
    };
  };
  color: string;
}

const PlaneComponent = (props: IPlaneProps) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <Image
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      resizeMode="stretch"
      source={airplane}
    />
  );
};

export const Plane = (world, color, pos, size) => {
  const initialPlane = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
  );

  Matter.World.add(world, [initialPlane]);

  return {
    body: initialPlane,
    size: [size.width, size.height],
    color: color,
    renderer: <PlaneComponent />,
  };
};
