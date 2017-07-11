'use strict';

var  log4js = require('log4js'),
     childProcess = require("child_process"),
     logger = log4js.getLogger();

var path = require("path");


var argv = process.argv.slice(2);

if(argv.indexOf('--debug') >= 0){
    logger.setLevel('DEBUG');
}else {
    logger.setLevel('INFO');
}


if(argv.indexOf('--project') >= 0){
    global.pjconfig =  require(path.join( __dirname , 'project.debug.json'))
}else {
    global.pjconfig =  require(path.join( __dirname ,'project.json'));
}


var mq = require(global.pjconfig.mq.module)
    , dispatcher = mq.socket('pub')
    , acceptor = mq.socket('pull')
    , dispatcherPort =  global.pjconfig.dispatcher.port
    , dispatcherAddress =   global.pjconfig.dispatcher.address
    , acceptorPort =   global.pjconfig.acceptor.port
    , acceptorAddress =   global.pjconfig.acceptor.address;



acceptor[acceptor.bindSync ? 'bindSync' : 'bind']("tcp://" + acceptorAddress + ":" + acceptorPort);

dispatcher[acceptor.bindSync ? 'bindSync' : 'bind']("tcp://" + dispatcherAddress + ":" + dispatcherPort);

var openApiServer = childProcess.fork(__dirname + '/openApiService.js', argv)

acceptor.on("message" , function (data){
    logger.debug(data.toString());
    dispatcher.send(data);
})

logger.info("start badjs-mq success. ");
