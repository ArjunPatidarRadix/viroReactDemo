import Matter from 'matter-js';

export const UpdatePlane = (entities, {touches, time}) => {
  const engine = entities.physics.engine;
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.setVelocity(entities.Plane.body, {
        x: entities.Plane.body.velocity.x,
        y: -2,
      });
    });
  Matter.Engine.update(engine, time.delta);
  return entities;
};
