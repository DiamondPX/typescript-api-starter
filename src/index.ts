import app from './app'

const PORT: any = process.env['PORT'] || 8000
const HOST: any = process.env['NODE_ENV'] === 'development' ? '127.0.0.1' : '0.0.0.0'

app.listen(PORT, HOST, () => {
  // tslint:disable-next-line: no-console
  console.log(`Listening: http://localhost:${PORT}`)
})
