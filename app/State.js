import Freezer from 'freezer-js';

var State = new Freezer({
    status: 'loading',
    teams: [{
      status: 'loading'
    }],
    games: [{
      status: 'loading'
    }]
});

module.exports = State;
