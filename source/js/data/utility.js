'use strict';

export function selector(selector) {
  return document.querySelector(selector);
} 

export function selectorAll(selector) {
  return document.querySelectorAll(selector);
} 

export function listener(selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

export function style(selector, styleType, type) {
  return selector.style[styleType] = type
}