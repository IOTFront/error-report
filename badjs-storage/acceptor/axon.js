var map = require('map-stream')
  , mq = require('axon')
  , client = mq.socket('sub')
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
  client.subscribe(service +"*");
  client.on('message', function (data) {
    stream.write(data);
  });
  return stream;
};