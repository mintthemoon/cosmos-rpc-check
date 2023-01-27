# cosmos-rpc-check
Validates RPC endpoints are properly configured for public infrastructure.

## Usage
Check all servers in the default `kujira-infra.txt` list:
```bash
npm run start
```

Check custom server(s):
```bash
node src/main.js <url1> [<url2> ...]
```

## Checks
* CORS: Cross-origin access policy should be open (*) or not defined
* Synced: Node should be caught up with the latest blocks
* Indexing: Node should have transaction indexing enabled for queries
