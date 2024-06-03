import { describe, expect, it } from '@jest/globals'
import { load } from '@sumor/config'
import { Storage } from '../src/index.js'

describe('context', () => {
  it('demo', async () => {
    const config = await load(`${process.cwd()}/test/config`, 'storage')

    const remoteRoot = '/storageTest'

    const storage = new Storage(config)

    const fileName = `test-${Date.now()}.txt`
    const remotePath = `${remoteRoot}/${fileName}`
    const data = 'Test'
    await storage.put(remotePath, data)

    const exists = await storage.exists(remotePath)
    expect(exists).toBe(true)

    const result = await storage.get(remotePath, {
      type: 'string'
    })
    expect(result).toBe(data)

    await storage.delete(remotePath)
    const exists2 = await storage.exists(remotePath)
    expect(exists2).toBe(false)
  })
})
