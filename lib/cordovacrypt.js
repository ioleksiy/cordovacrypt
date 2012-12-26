#! /usr/bin/env node

/*
 * cordovacrypt
 * https://github.com/ioleksiy/cordovacrypt
 *
 * Copyright (c) 2012 Oleksii Glib
 * Licensed under the MIT license.
 */

var userArgs = process.argv.slice(2)
if (userArgs.length < 2) {
  console.log('Usage: corc key fileIn [fileOut]')
} else {
  var password = userArgs[0]
  var fileIn = userArgs[1]
  var fileOut = userArgs.length > 2 ? userArgs[2] : fileIn

  var crypto = require('crypto')
  var fs = require('fs')

  var input = fs.readFileSync(fileIn);

  var m = crypto.createHash('md5');
  m.update(password)
  var key = m.digest('hex');
  m = crypto.createHash('md5');
  m.update(password + key)
  var iv = m.digest('hex').slice(0,16);
  var data = new Buffer(input, 'utf8').toString('binary');
  var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  var encrypted = cipher.update(input, 'binary') + cipher.final('binary');
  var encoded = new Buffer(encrypted, 'binary').toString('base64');
  fs.writeFileSync(fileOut, encoded)
}
