import StyleDictionary from 'style-dictionary';
import {fileURLToPath} from 'url';

// ------------------------------------------------------------
// 1. 配置注册 (Registers)
// ------------------------------------------------------------

/**
 * 过滤器: 隐私保护
 * [v5 FIX]: 属性名必须是 'filter'，不能是 'matcher'
 */
StyleDictionary.registerFilter({
    name: 'filter-public-tokens',
    filter: (token) => {
        return ['sys', 'comp'].includes(token.path[0]);
    }
});

/**
 * 格式化器: 增强版 (排序 + 文件头 + 动态选择器)
 */
/**
 * 格式化器: 增强版 (排序 + 文件头 + 动态选择器)
 */
StyleDictionary.registerFormat({
    name: 'css/theme-aware',
    // [v5 FIX]: 属性名必须是 'format'，不能是 'formatter'
    format: ({dictionary, options}) => {
        const selector = options.selector || ':root';

        const header = `/**
            * ----------------------------------------------------
            * 🎨 Design Tokens: ${options.themeName}
            * 🤖 Generated at: ${new Date().toISOString()}
            * ⚠️ DO NOT EDIT DIRECTLY - Update source JSON instead
            * ----------------------------------------------------
            */`;

        // [v5 NOTE]: dictionary.allTokens 是标准用法
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
// 3. 构建执行 (Async for v5)
// ------------------------------------------------------------

console.log('🏗️  Starting Design Tokens Build...\n');

// [v5 FIX]: v5 的构建是异步的，必须使用 async/await
// 因此不能用 forEach，改用 for...of 循环
async function runBuild() {
    for (const theme of themes) {
        console.log(`Processing Theme: [${theme.name}]`);

        // [v5 FIX]: 使用 new StyleDictionary(config)
        const sd = new StyleDictionary({
            source: theme.sources,
            platforms: {
                css: {
                    transformGroup: 'css',
                    buildPath: 'dist/css/',
                    files: [
                        {
                            destination: `${theme.name}.css`,
                            format: 'css/theme-aware',
                            filter: 'filter-public-tokens',
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
                    js: { // 新增 JS 构建
                        transformGroup: 'js',
                        buildPath: 'dist/',
                        files: [
                            {
                                destination: 'index.js',
                                format: 'javascript/es6', // 生成 export const sys = ...
                                filter: 'filter-public-tokens'
                            },
                            {
                                destination: 'index.d.ts',
                                format: 'typescript/es6-declarations',
                                filter: 'filter-public-tokens'
                            }
                        ]
                    }
                } : {})
            }
        });

        // [v5 FIX]: 必须 await
        await sd.buildAllPlatforms();
    }
}

// 执行异步构建
runBuild();