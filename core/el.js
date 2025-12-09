import NUMBERS from "./const/NUMBERS.const.js";

export default function el(tag) {
  let commands = [[NUMBERS.DOM_COMMANDS.CREATE_ELEMENT, tag]];
  
  return {
    // API
    text: function(text) {
      commands.push([NUMBERS.DOM_COMMANDS.SET_TEXT, text]);
    
      return this;
    },
    attr: function(attrs) {
      commands.push([NUMBERS.DOM_COMMANDS.SET_ATTR, attrs]);
    
      return this;
    },
    children: function(...children) {
      commands.push([NUMBERS.DOM_COMMANDS.APPEND_CHILD, children]);
    
      return this;
    },
    event: function(event, callback) {
      commands.push([NUMBERS.DOM_COMMANDS.ADD_EVENT, event, callback]);
    
      return this;
    },
    // Should not be used or overriden from user.
    _type: NUMBERS.OBJECT_TYPES.DOM_COMMANDS,
    _commands: function() {
      return commands;
    },
    _clear: function() {
      commands = null;
    }
  };
};