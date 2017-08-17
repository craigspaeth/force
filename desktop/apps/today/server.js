import * as routes from './routes'
// import adminOnly from 'desktop/lib/admin_only.coffee'
import express from 'express'

const app = (module.exports = express.Router())

app.get('/today', routes.index)
app.get('/today/:citySlug', routes.index)
