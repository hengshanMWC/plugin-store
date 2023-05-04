import { resolve } from 'node:path'
import { PluginStore } from '../../src/index'
import createPluginDefault, { createTestPlugin } from '../__fixtures__/plugin'

const createPluginDefaultPath = resolve(__dirname, '../__fixtures__/plugin.ts')
describe('plugin', () => {
  test('default', () => {
    const pluginStore = new PluginStore()
    pluginStore.add(createTestPlugin)
    expect(pluginStore.map.get('test')).toMatchObject(createTestPlugin())
  })
  test('repeat', () => {
    const pluginStore = new PluginStore()
    const plugin = createTestPlugin()
    pluginStore.add(plugin)
    pluginStore.add(createTestPlugin)
    expect(pluginStore.map.get('test')).toBe(plugin)
  })
  test('remove', () => {
    const pluginStore = new PluginStore()
    pluginStore.add(createTestPlugin)
    expect(pluginStore.map.get('test')).not.toBeUndefined()
    pluginStore.remove('test')
    expect(pluginStore.map.get('test')).toBeUndefined()
  })
  test('readAdd', async () => {
    const pluginStore = new PluginStore()
    await pluginStore.readAdd(createPluginDefaultPath)
    expect(pluginStore.map.get('default')).toMatchObject(createPluginDefault())
  })
  test('use', async () => {
    const pluginStore = new PluginStore<{ id: string }>()
    await pluginStore.use(createPluginDefaultPath, createTestPlugin)
    expect(pluginStore.map.get('default')).toMatchObject(createPluginDefault())
    expect(pluginStore.map.get('test')).toMatchObject(createTestPlugin())
  })
})
