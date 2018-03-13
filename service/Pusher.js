var pusher = require('pusher');

var Pusher = new pusher({
  appId: '490740',
  key: 'ff3cfb7147d390f3b6f8',
  secret: '9dbfe5f7a3d3f017685c',
  cluster: 'us2',
  encrypted: true
});

module.exports = Pusher