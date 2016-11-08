const SerialPort = require("serialport");
const client = require('prom-client');

const tempGauge = new client.Gauge('temperature', 'Temperature in server room');
let first = true;

const port = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600,
  parser: SerialPort.parsers.readline('\n')
});

port.on('open', function() {
  console.log('Opened port, starting to read...');
});

port.on('error', function(err) {
  console.error('Error when trying to read from serial port: ', err.message);
})

port.on('data', function (data) {
  if (first) {
    // Drop first reading which might have faulty formatting
    first = false;
    return;
  }
  tempGauge.set(parseFloat(data));
});
