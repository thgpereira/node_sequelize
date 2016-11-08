var crypto = require('crypto');

module.exports = {
  cryptoPassword: function (password) {
    var shasum = crypto.createHash('sha1');
    shasum.update(password);
    return shasum.digest('hex');
  }
};