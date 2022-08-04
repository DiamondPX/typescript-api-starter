import { Pool, types, PoolConfig, QueryResult } from 'pg'
import logger from '../logger'

export const config: PoolConfig = {
  user: process.env['PG_USER'] || 'postgres',
  database: process.env['PG_DATABASE'] || 'postgres',
  password: process.env['PG_PASSWORD'] || '123456',
  port: parseInt(process.env['PG_PORT'] as string, 10) || 5432,
  host: process.env['PG_HOST'] || '0.0.0.0',
  connectionTimeoutMillis: 0, // wait before timing out when connecting a new client
  idleTimeoutMillis: 10000, // auto-disconnection of idle clients
  max: 20, //  maximum number of clients the pool should contain
}

types.setTypeParser(types.builtins.NUMERIC, (value: any) => {
  return parseFloat(value)
})

export const query = async (text: any, params?: any, log?: boolean): Promise<QueryResult> => {
  const pooling = new Pool(config)
  const start = Date.now()
  const res: QueryResult = await pooling.query(text, params)
  pooling.on('error', (err: any, _client: any) => {
    logger.error('Unexpected error on idle client:' + JSON.stringify(err))
    process.exit(-1)
  })
  await pooling.end()
  if (log) {
    const duration = Date.now() - start
    // tslint:disable-next-line: no-console
    console.log('executed query', { text, duration, rows: res.rowCount })
  }
  return res
}
