import io from 'socket.io-client';

export const socket = io('viewingpartyserver.herokuapp.com', {
    path: '/socket.io',
    transports: ['websocket'],
    secure: true,
});
