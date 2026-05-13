import { makeRouteHandler } from '@keystatic/next/route-handler'
import keystaticConfig from '../../../../keystatic.config.js'

export const { GET, POST } = makeRouteHandler({ config: keystaticConfig })