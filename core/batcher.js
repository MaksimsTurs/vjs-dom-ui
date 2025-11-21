let STATES_TO_NOTIFY = new Set();
let BATCHER_ID       = null;

function batch() {
  if(STATES_TO_NOTIFY.size) {
    STATES_TO_NOTIFY.forEach(state => state.notify());
    STATES_TO_NOTIFY.clear();

    BATCHER_ID = null;
  }
};

function initWhenNotInitialized() {
  if(!BATCHER_ID) {
    BATCHER_ID = requestAnimationFrame(batch);
  }
};

function addState(state) {
  if(!STATES_TO_NOTIFY.has(state)) {
    STATES_TO_NOTIFY.add(state);
  }
};

const batcher = {
  initWhenNotInitialized,
  addState
};

export default batcher;