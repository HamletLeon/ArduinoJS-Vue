import { serverBus } from './main';
import { Board } from 'johnny-five';

const board = new Board({ repl: false });

board.on('ready', () => {
    console.log('Ready!');
});

export default board;
