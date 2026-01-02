import NUMBERS from "./const/NUMBERS.const.js";

/**
 *  @param   {HTMLElementTagNameMap} tag 
 *  @returns {object}
 */
export default function el(tag) {
  let commands = [[NUMBERS.DOM_COMMANDS.CREATE_ELEMENT, tag]];
  
  return {
    //#########################
    //########## API ##########
    //#########################
    /**
     *  @param   {string} text
     */
    text: function(text) {
      commands.push([NUMBERS.DOM_COMMANDS.SET_TEXT, text]);
    
      return this;
    },
    /**
     *  @param {object} styles 
     */
    style: function(styles) {
      commands.push([NUMBERS.DOM_COMMANDS.SET_STYLE, styles]);

      return this;
    },
    /**
     *  @param {object} attrs 
     */
    attr: function(attrs) {
      commands.push([NUMBERS.DOM_COMMANDS.SET_ATTR, attrs]);
    
      return this;
    },
    /**
     *  @param {any[][]} children 
     */
    children: function(...children) {
      commands.push([NUMBERS.DOM_COMMANDS.APPEND_CHILD, children]);
    
      return this;
    },
    /**
     *  @param {GlobalEventHandlersEventMap} event
     *  @param {any} callback 
     */  
    event: function(event, callback) {
      commands.push([NUMBERS.DOM_COMMANDS.ADD_EVENT, event, callback]);
    
      return this;
    },
    //#############################
    //########## Utility ##########
    //#############################
    /** Should not be overriten/removed/used! */
    _type: NUMBERS.OBJECT_TYPES.DOM_COMMANDS,
    /** Should not be overriten/removed/used! */
    _commands: function() {
      return commands;
    },
    /** Should not be overriten/removed/used! */
    _clear: function() {
      commands = null;
    }
  };
};