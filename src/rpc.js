class Rpc {
    constructor(url) {
        this.url = url
    }

    async connect() {
        this.isHealthy = await this.checkHealth()
        if (!this.isHealthy) {
            console.log(`rpc ${this.url} is not healthy!`)
            return
        }
        const statusResponse = await this.getStatus()
        if (statusResponse === null) {
            this.status = {}
            console.log(`rpc ${this.url} failed to get status!`)
            this.isSynced = false
            return
        }
        this.status = await statusResponse
            .json()
            .then(res => res.result)
            .catch(_ => { return {} })
        if (!this.status.sync_info || !this.status.node_info) {
            console.log(`rpc ${this.url} provided an invalid status response!`)
            return
        }
        this.latestBlock = this.status.sync_info.latest_block_height
        this.isSynced = !this.status.sync_info.catching_up
        this.isIndexing = this.status.node_info.other.tx_index === "on"
        this.corsOriginPolicy = statusResponse.headers.get("access-control-allow-origin")
    }

    async checkHealth() {
        return fetch(this.url + "/health")
            .then(res => res.json())
            .then(content => Object.keys(content.result).length === 0)
            .catch(err => {
                console.log(err)
                return false
            })
    }

    async getStatus() {
        return fetch(this.url + "/status")
            .catch(err => {
                console.log(err)
                return null
            })
    }
}

export {Rpc}