import NUMBERS from "./const/NUMBERS.const.js";

import execDomCommands from "./utils/exec-dom-commands.js";

/**
 *  @typedef {(text: string) => DOMCommandsBuilder}                                                 DOMCommandText
 *  @typedef {(style: object) => DOMCommandsBuilder}                                                DOMCommandStyle
 *  @typedef {(attrs: object) => DOMCommandsBuilder}                                                DOMCommandAttributes
 *  @typedef {(children: any[][]) => DOMCommandsBuilder}                                            DOMCommandChildren
 *  @typedef {(event: keyof GlobalEventHandlersEventMap, callback: Function) => DOMCommandsBuilder} DOMCommandEvent 
 */

/**
 *  @typedef  {object}               DOMCommandsBuilder
 *  @property {DOMCommandText}       text
 *  @property {DOMCommandStyle}      style
 *  @property {DOMCommandAttributes} attr
 *  @property {DOMCommandChildren}   children
 *  @property {DOMCommandEvent}      event
 */

const domCommandHelper = {
  //#########################
  //########## API ##########
  //#########################
  /**
   *  @param {string} text
   */
  text: function(text) {
    this._commands.push([NUMBERS.DOM_COMMANDS.SET_TEXT, text]);
  
    return this;
  },
  /**
   *  @param {object} styles 
   */
  style: function(styles) {
    this._commands.push([NUMBERS.DOM_COMMANDS.SET_STYLE, styles]);
    return this;
  },
  /**
   *  @param {object} attrs 
   */
  attr: function(attrs) {
    this._commands.push([NUMBERS.DOM_COMMANDS.SET_ATTR, attrs]);
  
    return this;
  },
  /**
   *  @param {any[][]} children 
   */
  children: function(...children) {
    this._commands.push([NUMBERS.DOM_COMMANDS.APPEND_CHILD, children]);
  
    return this;
  },
  /**
   *  @param {keyof GlobalEventHandlersEventMap} event
   *  @param {any} callback 
   */  
  event: function(event, callback) {
    this._commands.push([NUMBERS.DOM_COMMANDS.ADD_EVENT, event, callback]);
  
    return this;
  },
  //#############################
  //########## Utility ##########
  //#############################
  /** Should not be overriten/removed/used! */
  _commands: null,
  /** Should not be overriten/removed/used! */
  _type: NUMBERS.OBJECT_TYPES.DOM_COMMANDS,
  /** Should not be overriten/removed/used! */
  _toDOM: function() {
    const dom = execDomCommands(this._commands);
    this._clear();
    return dom;
  },
  /** Should not be overriten/removed/used! */
  _clear: function() {
    this._commands = null;
  },
}

/**
 *  @param   {keyof HTMLElementTagNameMap} tag
 *  @returns {DOMCommandsBuilder}
 */
export default function el(tag) {
  let commands = [[NUMBERS.DOM_COMMANDS.CREATE_NODE, tag]];
  const domCommandHelperInstance = Object.create(domCommandHelper);

  domCommandHelperInstance._commands = commands;
  
  return domCommandHelperInstance;
};