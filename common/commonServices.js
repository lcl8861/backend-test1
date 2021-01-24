"use strict";

const request = require('request');
const apiUrl = 'https://jsonplaceholder.typicode.com';
const commonServices = {

     getComments: () => {
        const url = apiUrl + '/comments'
         return new Promise(function (resolve, reject) {
             request(url, function (error, response, body) {
                 if (!error && response.statusCode == 200) {
                     resolve(body);
                 }
             });
         });
    },

    getPost: () => {
        const url = apiUrl + '/posts'
        return new Promise(function (resolve, reject) {
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
            });
        });
    },

    getPostById: (id) => {
        const url = apiUrl + '/posts' + id;
        return new Promise(function (resolve, reject) {
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
            });
        });
    },
}
module.exports = commonServices;