import Matter from 'matter-js';
import {View} from 'react-native';

interface ICeilingProps {
  size: [];
  body: {
    position: {
      x: number;
      y: number;
    };
  };
  color: string;
}

const CeilingComponent = (props: ICeilingProps) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        top: x,
        left: y,
        width: width,
        height: height,
        backgroundColor: props.color,
      }}></View>
  );
};

export const Ceiling = (world, color, pos, size) => {
  const initialCeiling = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {isStatic: true, friction: 1},
  );
  Matter.World.add(world, [initialCeiling]);

  return {
    body: initialCeiling,
    size: [size.width, size.height],
    color: color,
    renderer: <CeilingComponent />,
  };
};
