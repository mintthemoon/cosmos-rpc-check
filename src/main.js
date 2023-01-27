import {check_rpc} from "./check.js"

const args = process.argv.slice(2)

if (args.length < 1) {
    console.log("usage: rpcheck <url> [<url2> ...]")
}

args.map(check_rpc)
