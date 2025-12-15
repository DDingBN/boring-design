import DefaultTheme from 'vitepress/theme';
import '@boring/tokens/index.css'; // 引入全局样式变量

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      // 仅在客户端加载 Web Components
      import('@boring/components');
    }
  }
};