import blockReducer from '@/pages/EditorPage/api/blocksSlice.ts';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  editor: blockReducer,
});

export default rootReducer;
