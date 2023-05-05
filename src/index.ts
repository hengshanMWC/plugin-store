type CreatePluginData<T> = () => T

type AddType<T> = T | CreatePluginData<T>
export class PluginGroup<T extends { id: any }> {
  map: Map<string, T> = new Map()

  async use(...plugins: Array<AddType<T> | string>) {
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i]
      if (typeof plugin === 'string') {
        await this.readAdd(plugin)
      }
      else {
        this.add(plugin)
      }
    }
  }

  get(id: T['id']) {
    return this.map.get(id)
  }

  remove(id: string) {
    this.map.delete(id)
  }

  private add(plugin: AddType<T>) {
    const pluginData: T = typeof plugin === 'function' ? plugin() : plugin
    if (this.map.has(pluginData.id)) {
      console.log('There are duplicate plugin ID')
    }
    else {
      this.map.set(pluginData.id, pluginData)
    }
    return this
  }

  private async readAdd(route: string) {
    const plugin = await import(route)
    // nodejs兼容esm导出，会多包一层default
    return this.add(plugin.default?.default ?? plugin.default)
  }
}
