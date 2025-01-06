'server-only'

import { apiReference } from '@scalar/hono-api-reference';
import packageJson from '../../package.json';
import { AppOpenAPI } from "./types";




export default function configureOpenApi(app: AppOpenAPI) {
  // The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: packageJson.version,
    title: 'Marliket API',
  },
})

app.get(
  '/reference',
  apiReference({
    "theme": "purple",
    layout: 'classic',
    defaultHttpClient: {
      targetKey: 'javascript',
      clientKey: 'fetch',
      
    },
    spec: {
      url: '/api/doc',
    },
  }),
)

}