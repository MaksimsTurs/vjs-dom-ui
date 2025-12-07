import { COMPONENTS, STATES } from "./component.js";
import { isObject, isHTMLElement } from "./utils/is.js";

export const COMMANDS = {
  ROOT:     0,
  TEXT:     1,
  ATTR:     2,
  EVENT:    3,
  CHILDREN: 4
}

export default function el(tag) {
  const commands = [[COMMANDS.ROOT, tag]];

  return {
    text: function(text) {
      commands.push([COMMANDS.TEXT, text]);

      return this;
    },
    attr: function(attrs) {
      commands.push([COMMANDS.ATTR, attrs]);

      return this;
    },
    children: function(...children) {
      commands.push([COMMANDS.CHILDREN, children]);

      return this;
    },
    on: function(event, callback) {
      commands.push([COMMANDS.EVENT, event, callback]);

      return this;
    },
    dom: function() {
      return commands

      return dom;
    },
  };
};