export default {
  OBJECT_TYPES: {
    DOM_COMMANDS: 0,
    COMPONENT:    1
  },
  PATCH_STATES: {
    CHECK_NEXT_PATCH_STATE: 0,
    CHANGE_ATTRIBUTES:      1,
    APPEND_CHILDREN:        2,
    SKIP_ELEMENT:           3,
    GO_DEEPER:              4,
    REPLACE:                5,
    REMOVE:                 6,
    END:                    7,
    POP_STACK:              8
  },
  INDEX_TYPES: {
    OLD_NODES: 2,
    NEW_NODES: 3
  },
  DOM_COMMANDS: {
    CREATE_ELEMENT: 0,
    SET_TEXT:       1,
    SET_ATTR:       2,
    ADD_EVENT:      3,
    SET_STYLE:      4,
    APPEND_CHILD:   5 
  }
};