import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';

// ------------------------------------------------------------
// 1. 配置注册 (Registers)
// ------------------------------------------------------------

/**
 * 过滤器: 隐私保护
 * 只输出 "sys" (Semantic) 开头的变量，隐藏 "ref" (Primitives)
 */
StyleDictionary.registerFilter({
    name: 'filter-is-semantic',
    matcher: (token) => {
        return token.path[0] === 'sys';
    }
});

/**
 * 格式化器: 增强版 (排序 + 文件头 + 动态选择器)
 */
StyleDictionary.registerFormat({
    name: 'css/theme-aware',
    formatter: ({ dictionary, options }) => {
        const selector = options.selector || ':root';

        // [优化 3] 生成文件头信息
        const header = `/**
 * ----------------------------------------------------
 * 🎨 Design Tokens: ${options.themeName}
 * 🤖 Generated at: ${new Date().toISOString()}
 * ⚠️ DO NOT EDIT DIRECTLY - Update source JSON instead
 * ----------------------------------------------------
 */`;

        // [优化 1 & 2] 提取变量并进行稳定排序 (A-Z)
        // 注意: 使用 allTokens (v4标准) 或 allProperties (v3标准)
        // 这里使用了 sort 确保 Git Diff 永远干净
        const variables = dictionary.allTokens
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(token => {
                return `  --${token.name}: ${token.value};`;
            })
            .join('\n');

        return `${header}\n${selector} {\n${variables}\n}\n`;
    }
});

// ------------------------------------------------------------
// 2. 主题策略定义
// ------------------------------------------------------------

const themes = [
    {
        name: 'light',
        selector: ':root',
        sources: [
            'src/primitives/**/*.json',
            'src/semantics/**/*.json',
            'src/themes/light.json'
        ]
    },
    {
        name: 'dark',
        selector: '[data-theme="dark"]',
        sources: [
            'src/primitives/**/*.json',
            'src/semantics/**/*.json',
            'src/themes/dark.json'
        ]
    }
];

// ------------------------------------------------------------
// 3. 构建执行
// ------------------------------------------------------------

console.log('🏗️  Starting Design Tokens Build...\n');

themes.forEach(theme => {
    console.log(`Processing Theme: [${theme.name}]`);

    const sd = StyleDictionary.extend({
        source: theme.sources,
        platforms: {
            css: {
                transformGroup: 'css',
                buildPath: 'dist/css/',
                files: [
                    {
                        destination: `${theme.name}.css`,
                        format: 'css/theme-aware',
                        filter: 'filter-is-semantic',
                        // [优化 3] 将元数据传递给 formatter
                        options: {
                            selector: theme.selector,
                            themeName: theme.name,
                            outputReferences: true
                        }
                    }
                ]
            },
            // TypeScript 定义只生成一次 (基于 Light)
            ...(theme.name === 'light' ? {
                ts: {
                    transformGroup: 'js',
                    buildPath: 'dist/',
                    files: [
                        {
                            destination: 'index.d.ts',
                            format: 'typescript/es6-declarations',
                            filter: 'filter-is-semantic'
                        }
                    ]
                }
            } : {})
        }
    });

    sd.buildAllPlatforms();
});

console.log('\n✅ Build finished successfully!');