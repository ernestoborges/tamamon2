import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'token-dot-color': 'var(--dot-color)',
        'token-main-surface-background': 'var(--main-surface-background)',
        'token-text-primary': 'var(--text-primary)',
        'token-text-secondary': 'var(--text-secondary)',
        'token-text-tertiary': 'var(--text-tertiary)',
        'token-text-quaternary': 'var(--text-quaternary)',
        'token-text-placeholder': 'var(--text-placeholder)',
        'token-text-error': 'var(--text-error)',
        'token-border-xlight': 'var(--border-xlight)',
        'token-border-light': 'var(--border-light)',
        'token-border-medium': 'var(--border-medium)',
        'token-border-heavy': 'var(--border-heavy)',
        'token-border-xheavy': 'var(--border-xheavy)',
        'token-border-sharp': 'var(--border-sharp)',
        'token-main-surface-primary': 'var(--main-surface-primary)',
        'token-main-surface-secondary': 'var(--main-surface-secondary)',
        'token-main-surface-tertiary': 'var(--main-surface-tertiary)',
        'token-sidebar-surface-primary': 'var(--sidebar-surface-primary)',
        'token-sidebar-surface-secondary': 'var(--sidebar-surface-secondary)',
        'token-sidebar-surface-tertiary': 'var(--sidebar-surface-tertiary)',
        'token-sidebar-body-primary': 'var(--sidebar-body-primary)',
        'token-sidebar-icon': 'var(--sidebar-icon)',
        'token-link': 'var(--link)',
        'token-link-hover': 'var(--link-hover)',
        'token-surface-error': 'var(--surface-error)',
        'token-composer-surface': 'var(--composer-surface)'
      }
    },
    animation: {
      wiggle: 'wiggle 0.2s alternate infinite;'
    }
  },
  plugins: []
}
export default config
