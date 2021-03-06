import React from 'react';
import { Store } from "redux";

export function waitAndGetState(store: Store){
    return new Promise(resolve => {
        const unSubscribe = store.subscribe(() => {
          const state = store.getState();
          unSubscribe();
          return resolve(state);
        });
    });
}

export function getInputCursorCoordinate(element: HTMLInputElement, position: number | null){
    if(!element || position === null) return;
    const properties = [
        'direction',
        'boxSizing',
        'width',  
        'height',
        'overflowX',
        'overflowY', 
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'borderStyle',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'fontStyle',
        'fontVariant',
        'fontWeight',
        'fontStretch',
        'fontSize',
        'fontSizeAdjust',
        'lineHeight',
        'fontFamily',
        'textAlign',
        'textTransform',
        'textIndent',
        'textDecoration',
        'letterSpacing',
        'wordSpacing',
        'tabSize',
        'MozTabSize'
      ];

      const div = document.createElement('div');
      div.id = 'input-mirror-div';
      document.body.appendChild(div);
      
      const style = div.style;
      const computed = getComputedStyle(element);
      
      style.whiteSpace = 'pre-wrap';
      style.position = 'absolute';
      style.visibility = 'hidden';
      properties.forEach(function (prop) {
        style[prop as any] = computed[prop as any];
      });
      style.overflow = 'hidden';

      div.textContent = element.value.substring(0, position);
      div.textContent = div.textContent.replace(/\s/g, '\u00a0');

      const span = document.createElement('span');
      span.textContent = element.value.substring(position) || '.';
      div.appendChild(span);

      const coordinates = {
          top : span.offsetTop + parseInt(computed['borderTopWidth']),
          left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
      }

      document.body.removeChild(div);

      return coordinates;
}

export function deepArrayCopy<T>(arr: Array<T>): Array<T>{
  return JSON.parse(JSON.stringify(arr));
}

export function classFor(class_names: Array<string>): string{
	return class_names.join(" ");
}

export function generateGetCssFunction(styles: Styles, styles_mobile: Styles) {
    return function getCss(is_mobile: boolean) {
        return is_mobile ? styles_mobile : styles
    }
}
