import Matter from 'matter-js';
import {BOTTOM_PIPE_WIDTH, TOP_PIPE_WIDTH} from '../utils/constants';
import {getRandom} from '../utils/random';
import {heightRatio, width} from '../utils/styleSheet';

export const UpdateObstacle = (entities, {dispatch, time}) => {
  let engine = entities.physics.engine;
  for (let i = 1; i <= 2; i++) {
    if (
      entities['Obstacle' + i].type === 'top' &&
      entities['Obstacle' + i].body.position.x <= -1 * (TOP_PIPE_WIDTH / 2)
    ) {
      entities['Obstacle' + i].scored = false;
      Matter.Body.setPosition(entities['Obstacle' + i].body, {
        x: width * 2 - TOP_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 100, heightRatio * 300),
      });
    } else if (
      entities['Obstacle' + i].type === 'bottom' &&
      entities['Obstacle' + i].body.position.x <= -1 * (BOTTOM_PIPE_WIDTH / 2)
    ) {
      entities['Obstacle' + i].scored = false;
      Matter.Body.setPosition(entities['Obstacle' + i].body, {
        x: width * 2 - BOTTOM_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 300, heightRatio * 500),
      });
    } else {
      Matter.Body.translate(entities['Obstacle' + i].body, {x: -4, y: 0});
    }
  }
  Matter.Engine.update(engine, time.delta);
  for (let i = 1; i <= 2; i++) {
    if (
      entities['Obstacle' + i].body.position.x <=
        entities.Plane.body.position.x &&
      !entities['Obstacle' + i].scored
    ) {
      entities['Obstacle' + i].scored = true;
      dispatch({type: 'score'});
    }
  }
  return entities;
};
