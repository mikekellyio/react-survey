import { ActionCable, Cable } from 'action-cable-react';
import config from './config';

var actionCable = ActionCable.createConsumer(config.cable_url);

var cable = new Cable({
  GameChannel: actionCable.subscriptions.create({channel: 'GameChannel'}, [])
});

module.exports = cable;
