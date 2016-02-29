import State from '../State';

State
    .on('games:fetch', function () {
        State.get().set({status: 'ready', message: "Fetching active games..."});
    })
