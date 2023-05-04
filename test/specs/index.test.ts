import { resolve } from 'node:path'
import { PluginStore } from '../../src/index'
import createPluginDefault, { createTestPlugin } from '../__fixtures__/plugin'

describe('plugin', () => {
  const pluginTestId = createTestPlugin().id
  const createPluginDefaultPath = resolve(__dirname, '../__fixtures__/plugin.ts')
  test('use', async () => {
    const pluginStore = new PluginStore<{ id: string }>()
    await pluginStore.use(createPluginDefaultPath, createTestPlugin)
    expect(pluginStore.get(createPluginDefault().id)).toMatchObject(createPluginDefault())
    expect(pluginStore.get(pluginTestId)).toMatchObject(createTestPlugin())
  })
  test('repeat', () => {
    const pluginStore = new PluginStore()
    const plugin = createTestPlugin()
    pluginStore.use(plugin, createTestPlugin)
    expect(pluginStore.get(pluginTestId)).toBe(plugin)
  })
  test('remove', () => {
    const pluginStore = new PluginStore()
    pluginStore.use(createTestPlugin)
    expect(pluginStore.get(pluginTestId)).not.toBeUndefined()
    pluginStore.remove(pluginTestId)
    expect(pluginStore.get(pluginTestId)).toBeUndefined()
  })
})
