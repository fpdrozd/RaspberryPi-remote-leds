const io = require('socket.io-client');
const Gpio = require('onoff').Gpio;

const redLed = new Gpio(22, 'out');
const greenLed = new Gpio(27, 'out');
const blueLed = new Gpio(17, 'out');

const socket = io('http://127.0.0.1:3000');

socket.on('click', (color) => {
  redLed.writeSync(color == 'red' ? 1 : 0);
  greenLed.writeSync(color == 'green' ? 1 : 0);
  blueLed.writeSync(color == 'blue' ? 1 : 0);
});

function unexportOnClose() {
  redLed.writeSync(0);
  redLed.unexport();
  greenLed.writeSync(0);
  greenLed.unexport();
  blueLed.writeSync(0);
  blueLed.unexport();
};

process.on('SIGINT', unexportOnClose);
