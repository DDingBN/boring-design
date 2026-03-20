import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Boring Design",
    description: "A Boring UI Component Library",

    vue: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => tag.startsWith('bd-') || tag.includes('boring-')
            }
        }
    },

    themeConfig: {
        nav: [
            { text: 'Guide', link: '/api/started' },
            { text: 'Components', link: '/api/components/' },
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Quick Start', link: '/api/started' },
                    { text: 'Navigation', link: '/api/navigation' },
                ]
            },
            {
                text: 'Components',
                items: [
                    { text: 'Overview', link: '/api/components/' },
                    { text: 'Button', link: '/api/components/button/' },
                    { text: 'Input', link: '/api/components/input/' },
                    { text: 'Alert', link: '/api/components/alert/' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ddingbn/boring-design' }
        ]
    }
})
