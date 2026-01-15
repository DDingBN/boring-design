import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js'; // 这是一个非常好用的指令
import { buttonStyles } from './button.styles';

/**
 * Button 组件
 * * @slot - 默认插槽，用于放置按钮文字或图标
 */
@customElement('bd-button') // 定义标签名为 bd-button
export class Button extends LitElement {

    // 1. 绑定样式
    static styles = buttonStyles;

    // 2. 定义属性 (Properties)
    // reflect: true 表示属性变化时，会同步反射到 HTML 标签属性上 (比如 <bd-button variant="primary">)
    @property({ type: String, reflect: true })
    variant: 'primary' | 'default' | 'text' = 'default';

    @property({ type: String, reflect: true })
    size: 'small' | 'medium' | 'large' = 'medium';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: String })
    type: 'button' | 'submit' | 'reset' = 'button';

    // 3. 渲染方法
    render() {
        // 动态计算 class
        const classes = {
            'button': true,
            [`button--${this.variant}`]: true, // 例如 button--primary
            [`button--${this.size}`]: true,    // 例如 button--medium
        };

        return html`
      <button 
        part="button" 
        class=${classMap(classes)} 
        ?disabled=${this.disabled}
        type=${this.type}
      >
        <slot></slot>
      </button>
    `;
    }
}

// 声明类型，让 TypeScript 认识这个元素
declare global {
    interface HTMLElementTagNameMap {
        'bd-button': Button;
    }
}