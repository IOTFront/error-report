var map = require('map-stream')
  , zmq = require('zmq')
  , client = zmq.socket('sub')
  , port = global.pjconfig.acceptor.port
  , address = global.pjconfig.acceptor.address
  , service = global.pjconfig.acceptor.subscribe;

/**
 * dispatcher
 * @returns {Stream}
 */
module.exports = function () {
  var stream = map(function (data, fn) {
    fn(null, data);
  });
  client.connect("tcp://" + address + ":" + port);
  client.subscribe(service);
  client.on('message', function (data) {
    stream.write(data);
  });
  return stream;
};