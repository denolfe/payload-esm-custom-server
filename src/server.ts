import express from 'express'

import { parse } from 'url'
import nextImport from 'next'

const next = (nextImport.default || nextImport) as unknown as typeof nextImport.default

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const app = express()

    app.all('*', async (req, res) => {
      const parsedUrl = parse(req.url, true)
      void handle(req, res, parsedUrl)
    })

    app.listen(port, () => {
      console.log(
        `> Server listening at http://localhost:${port} as ${
          dev ? 'development' : process.env.NODE_ENV
        }`,
      )
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
