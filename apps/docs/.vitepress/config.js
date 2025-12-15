import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Boring Design",
  vue: {
    template: {
      compilerOptions: {
        // 告诉 Vue：所有以 boring- 开头的标签都是自定义元素，不要报错
        isCustomElement: (tag) => tag.includes('boring-')
      }
    }
  }
})