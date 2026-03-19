import { ReactiveController, ReactiveControllerHost } from "lit";

/**
 * 确定一个节点是否为一个有效的插槽节点。
 * 忽略只包含空白字符的文本节点和注释节点。
 */
function isSlotNode(node: Node): boolean {
  if (node.nodeType === Node.ELEMENT_NODE) {
    return true;
  }
  if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") {
    return true;
  }
  return false;
}

/**
 * HasSlotController
 * 
 * 用于检测组件是否被传入了特定的插槽内容。
 * 如果插槽内容发生变化，它会自动触发宿主组件的重新渲染。
 * 这对于解决 Web Components 中因为空插槽导致 flex/grid gap 被撑开的问题非常有效。
 */
export class HasSlotController implements ReactiveController {
  host: ReactiveControllerHost & Element;
  slotNames: string[];
  private observer?: MutationObserver;

  constructor(host: ReactiveControllerHost & Element, ...slotNames: string[]) {
    this.host = host;
    // 如果没有提供插槽名称，默认监听默认插槽 "[default]"
    this.slotNames = slotNames.length > 0 ? slotNames : ["[default]"];
    this.host.addController(this);
  }

  /**
   * 测试指定的插槽是否有内容传入
   * @param slotName 插槽名称，如果不传则测试默认插槽
   */
  test(slotName = "[default]"): boolean {
    return slotName === "[default]"
      ? this._hasDefaultSlot()
      : this._hasNamedSlot(slotName);
  }

  private _hasNamedSlot(name: string): boolean {
    return Array.from(this.host.childNodes).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && (node as Element).slot === name) {
        return true;
      }
      return false;
    });
  }

  private _hasDefaultSlot(): boolean {
    return Array.from(this.host.childNodes).some((node) => {
      // 如果是元素节点，它必须没有 slot 属性（或者 slot 属性为空）
      if (node.nodeType === Node.ELEMENT_NODE && (node as Element).slot !== "") {
        return false;
      }
      return isSlotNode(node);
    });
  }

  hostConnected() {
    // 使用 MutationObserver 监听子节点的变化
    // 因为原生的 slotchange 事件对纯文本节点的变化有时不够灵敏，且不能监听插槽元素的移除
    this.observer = new MutationObserver(() => {
      this.host.requestUpdate();
    });

    this.observer.observe(this.host, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  hostDisconnected() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
