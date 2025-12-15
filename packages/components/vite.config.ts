import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // 指定入口文件
      formats: ['es'],        // 打包格式：ES Modules
      fileName: () => 'index.js'
    },
    rollupOptions: {
      // 这里的 external 决定了哪些包不被打入最终产物
      // 通常我们会把 Lit 排除在外，让用户自己去依赖，或者是为了减小体积
      // 但为了让你先跑通，这里先暂时留空，把 lit 打包进去
      external: [/^lit/] 
    }
  }
});