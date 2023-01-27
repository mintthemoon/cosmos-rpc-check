import {Rpc} from "./rpc.js"

const check_rpc = async (url) => {
    const rpc = new Rpc(url)
    await rpc.connect()
    if (Object.keys(rpc.status).length === 0) {
        console.log(`rpc ${url} cannot be checked without a valid status response`)
        return
    }
    let ok = true
    if (!rpc.isSynced) {
        console.log(`rpc ${url} is not synced!`)
        ok = false
    }
    if (!rpc.isIndexing) {
        console.log(`rpc ${url} is not indexing transactions!`)
        ok = false
    }
    if (rpc.corsOriginPolicy !== null && rpc.corsOriginPolicy !== "*") {
        console.log(`rpc ${url} has a restricted CORS policy (${rpc.corsOriginPolicy})`)
        ok = false
    }
    if (ok) {
        console.log(`rpc ${url} ok!`)
    }
}

export {check_rpc}
