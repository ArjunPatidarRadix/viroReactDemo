import Matter from 'matter-js';
import {Plane} from '../components/Plane';
import {Floor} from '../components/Floor';
import {Ceiling} from '../components/Ceiling';
import {height, heightRatio, width} from '../utils/styleSheet';
import {Obstacle} from '../components/Obstacle';
import {BOTTOM_PIPE_WIDTH, TOP_PIPE_WIDTH} from '../utils/constants';
import {
  bottomObstacleHeight,
  getRandom,
  topObstacleHeight,
} from '../utils/random';

Matter.Common.isElement = () => false;

export const Entities = (restart?: any) => {
  if (restart) {
    Matter.Engine.clear(restart.physics.engine);
  }
  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  world.gravity.y = 0.15;
  const boxSize = 50;

  return {
    physics: {engine: engine, world: world},
    Plane: Plane(
      world,
      'pink',
      {x: width / 2, y: 200},
      {height: boxSize, width: boxSize},
    ),

    Floor: Floor(
      world,
      'white',
      {x: width / 2, y: height},
      {height: 100, width: width},
    ),
    Ceiling: Ceiling(
      world,
      'transparent',
      {x: width / 2, y: 30},
      {height: 5, width: width},
    ),
    Obstacle1: Obstacle(
      world,
      'top',
      {
        x: width * 2 - TOP_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 100, heightRatio * 300),
      },
      {height: topObstacleHeight, width: TOP_PIPE_WIDTH},
    ),

    Obstacle2: Obstacle(
      world,
      'bottom',
      {
        x: width - BOTTOM_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 300, heightRatio * 500),
      },
      {height: bottomObstacleHeight, width: BOTTOM_PIPE_WIDTH},
    ),
  };
};
