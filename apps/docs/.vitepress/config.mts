import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Boring Design",
    description: "A Boring UI Component Library",

    vue: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => tag.includes('boring-')
            }
        }
    },

    themeConfig: {
        nav: [
            { text: 'Guide', link: '/api/started' },
            { text: 'Components', link: '/api/index' },
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Quick Start', link: '/api/started' },
                    { text: 'Navigation', link: '/api/分类导航' },
                ]
            },
            {
                text: 'Components',
                items: [
                    { text: 'Button', link: '/api/index' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ddingbn/boring-design' }
        ]
    }
})
