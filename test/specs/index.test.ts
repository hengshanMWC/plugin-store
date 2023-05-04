import { resolve } from 'node:path'
import { PluginGroup } from '../../src/index'
import createPluginDefault, { createTestPlugin } from '../__fixtures__/plugin'

describe('plugin', () => {
  const pluginTestId = createTestPlugin().id
  const createPluginDefaultPath = resolve(__dirname, '../__fixtures__/plugin.ts')
  test('use', async () => {
    const pluginGroup = new PluginGroup<{ id: string }>()
    await pluginGroup.use(createPluginDefaultPath, createTestPlugin)
    expect(pluginGroup.get(createPluginDefault().id)).toMatchObject(createPluginDefault())
    expect(pluginGroup.get(pluginTestId)).toMatchObject(createTestPlugin())
  })
  test('repeat', () => {
    const pluginGroup = new PluginGroup()
    const plugin = createTestPlugin()
    pluginGroup.use(plugin, createTestPlugin)
    expect(pluginGroup.get(pluginTestId)).toBe(plugin)
  })
  test('remove', () => {
    const pluginGroup = new PluginGroup()
    pluginGroup.use(createTestPlugin)
    expect(pluginGroup.get(pluginTestId)).not.toBeUndefined()
    pluginGroup.remove(pluginTestId)
    expect(pluginGroup.get(pluginTestId)).toBeUndefined()
  })
})
