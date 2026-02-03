/**
 * Event handler detection utilities
 *
 * Provides functions to detect event handlers on JSX and Vue elements
 * for accessibility validation rules.
 */

import { hasJSXAttribute } from './jsx-ast-utils'

/**
 * JSX click event handler names
 */
const JSX_CLICK_HANDLERS = [
  'onClick',
  'onClickCapture',
]

/**
 * JSX keyboard event handler names
 */
const JSX_KEYBOARD_HANDLERS = [
  'onKeyDown',
  'onKeyDownCapture',
  'onKeyUp',
  'onKeyUpCapture',
  'onKeyPress',
  'onKeyPressCapture',
]

/**
 * JSX mouse event handler names (excluding click)
 */
const JSX_MOUSE_HANDLERS = [
  'onMouseDown',
  'onMouseDownCapture',
  'onMouseUp',
  'onMouseUpCapture',
  'onMouseOver',
  'onMouseOverCapture',
  'onMouseOut',
  'onMouseOutCapture',
  'onMouseEnter',
  'onMouseLeave',
]

/**
 * JSX focus event handler names
 */
const JSX_FOCUS_HANDLERS = [
  'onFocus',
  'onFocusCapture',
  'onBlur',
  'onBlurCapture',
]

/**
 * Vue click event handler names
 */
const VUE_CLICK_HANDLERS = [
  'click',
  '@click',
  'v-on:click',
]

/**
 * Vue keyboard event handler names
 */
const VUE_KEYBOARD_HANDLERS = [
  'keydown',
  'keyup',
  'keypress',
  '@keydown',
  '@keyup',
  '@keypress',
  'v-on:keydown',
  'v-on:keyup',
  'v-on:keypress',
]

/**
 * Vue mouse event handler names (excluding click)
 */
const VUE_MOUSE_HANDLERS = [
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
  '@mousedown',
  '@mouseup',
  '@mouseover',
  '@mouseout',
  '@mouseenter',
  '@mouseleave',
  'v-on:mousedown',
  'v-on:mouseup',
  'v-on:mouseover',
  'v-on:mouseout',
  'v-on:mouseenter',
  'v-on:mouseleave',
]

/**
 * Vue focus event handler names
 */
const VUE_FOCUS_HANDLERS = [
  'focus',
  'blur',
  '@focus',
  '@blur',
  'v-on:focus',
  'v-on:blur',
]

/**
 * Check if a JSX element has a click handler
 */
export function hasJSXClickHandler(node: any): boolean {
  return JSX_CLICK_HANDLERS.some(handler => hasJSXAttribute(node, handler))
}

/**
 * Check if a JSX element has a keyboard handler
 */
export function hasJSXKeyboardHandler(node: any): boolean {
  return JSX_KEYBOARD_HANDLERS.some(handler => hasJSXAttribute(node, handler))
}

/**
 * Check if a JSX element has a mouse handler (excluding click)
 */
export function hasJSXMouseHandler(node: any): boolean {
  return JSX_MOUSE_HANDLERS.some(handler => hasJSXAttribute(node, handler))
}

/**
 * Check if a JSX element has a focus handler
 */
export function hasJSXFocusHandler(node: any): boolean {
  return JSX_FOCUS_HANDLERS.some(handler => hasJSXAttribute(node, handler))
}

/**
 * Check if a JSX element has any event handler
 */
export function hasJSXEventHandler(node: any): boolean {
  return hasJSXClickHandler(node) ||
         hasJSXKeyboardHandler(node) ||
         hasJSXMouseHandler(node) ||
         hasJSXFocusHandler(node)
}

/**
 * Helper to check Vue attribute with various prefixes
 */
function hasVueEventAttribute(node: any, handlers: string[]): boolean {
  const startTag = node.startTag
  if (!startTag?.attributes) return false

  return startTag.attributes.some((attr: any) => {
    // Check key.name for regular attributes
    if (attr.key?.name && handlers.includes(attr.key.name)) {
      return true
    }
    // Check for directive attributes (@click, v-on:click)
    if (attr.directive && attr.key?.name?.name === 'on') {
      const argument = attr.key?.argument?.name
      return argument && handlers.some(h => {
        const eventName = h.replace(/^(@|v-on:)/, '')
        return eventName === argument
      })
    }
    return false
  })
}

/**
 * Check if a Vue element has a click handler
 */
export function hasVueClickHandler(node: any): boolean {
  return hasVueEventAttribute(node, VUE_CLICK_HANDLERS)
}

/**
 * Check if a Vue element has a keyboard handler
 */
export function hasVueKeyboardHandler(node: any): boolean {
  return hasVueEventAttribute(node, VUE_KEYBOARD_HANDLERS)
}

/**
 * Check if a Vue element has a mouse handler (excluding click)
 */
export function hasVueMouseHandler(node: any): boolean {
  return hasVueEventAttribute(node, VUE_MOUSE_HANDLERS)
}

/**
 * Check if a Vue element has a focus handler
 */
export function hasVueFocusHandler(node: any): boolean {
  return hasVueEventAttribute(node, VUE_FOCUS_HANDLERS)
}

/**
 * Check if a Vue element has any event handler
 */
export function hasVueEventHandler(node: any): boolean {
  return hasVueClickHandler(node) ||
         hasVueKeyboardHandler(node) ||
         hasVueMouseHandler(node) ||
         hasVueFocusHandler(node)
}

export {
  JSX_CLICK_HANDLERS,
  JSX_KEYBOARD_HANDLERS,
  JSX_MOUSE_HANDLERS,
  JSX_FOCUS_HANDLERS,
  VUE_CLICK_HANDLERS,
  VUE_KEYBOARD_HANDLERS,
  VUE_MOUSE_HANDLERS,
  VUE_FOCUS_HANDLERS,
}
