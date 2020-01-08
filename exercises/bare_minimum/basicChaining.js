/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var ourSecondPromises = require('./promisification.js');
var ourFirstPromises = require('./promiseConstructor.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return ourFirstPromises.pluckFirstLineFromFileAsync(readFilePath)
    .then(function (user) {
      return user;
    })
    .then(function (user) {
      return ourSecondPromises.getGitHubProfileAsync(user);
    })
    .then(function(data) {
      return new Promise(function(resolve, reject) {
        fs.writeFile(writeFilePath, JSON.stringify(data), 'utf8', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
