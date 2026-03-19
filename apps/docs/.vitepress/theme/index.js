import DefaultTheme from 'vitepress/theme';
import '@boring/tokens/tokens.css'; // 引入全局样式变量

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      // 在开发文档时，直接引入组件包
      // 因为在 components/package.json 中配置了 "development": "./src/index.ts"
      // Vite 会在开发环境下自动解析到 src 源码，从而获得 HMR 热更新支持
      import('@boring/components');
    }
  }
};
