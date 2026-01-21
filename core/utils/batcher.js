let STATES_TO_NOTIFY = new Set();
let BATCHER_ID       = null;

function batch() {
  if(STATES_TO_NOTIFY.size) {
    STATES_TO_NOTIFY.forEach(state => state.notify());
    STATES_TO_NOTIFY.clear();

    BATCHER_ID = null;
  }
};

const batcher = {
  initIfNotInitialized: function() {
    if(!BATCHER_ID) {
      BATCHER_ID = requestAnimationFrame(batch);
    }
  },
  add: function(state) {
    if(!STATES_TO_NOTIFY.has(state)) {
      STATES_TO_NOTIFY.add(state);
    }
  }
};

export default batcher;