import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlock } from '@/shared/types/types.ts';

interface MoveBlockPayload {
  id: string;
  direction: 'up' | 'down';
}

interface UpdateBlockContentPayload {
  id: string;
  content: string;
}

interface BlocksState {
  blocks: IBlock[];
}

const initialState: BlocksState = {
  blocks: [],
};

const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    addBlock(state, action: PayloadAction<IBlock>) {
      state.blocks.push(action.payload);
    },
    removeBlock(state, action: PayloadAction<string>) {
      state.blocks = state.blocks.filter((block) => block.id !== action.payload);
    },
    moveBlock(state, action: PayloadAction<MoveBlockPayload>) {
      const { id, direction } = action.payload;
      const index = state.blocks.findIndex((block) => block.id === id);

      if (index === -1) return;

      const toIndex = direction === 'up' ? index - 1 : index + 1;
      if (toIndex >= 0 && toIndex < state.blocks.length) {
        const [movedBlock] = state.blocks.splice(index, 1);
        state.blocks.splice(toIndex, 0, movedBlock);
      }
    },
    updateBlockContent(state, action: PayloadAction<UpdateBlockContentPayload>) {
      const { id, content } = action.payload;
      const block = state.blocks.find((block) => block.id === id);
      if (block) {
        block.content = content;
      }
    },
    copyBlock(state, action: PayloadAction<string>) {
      const blockToCopy = state.blocks.find((block) => block.id === action.payload);
      if (blockToCopy) {
        const newBlock: IBlock = { ...blockToCopy, id: Date.now().toString() };
        state.blocks.splice(state.blocks.findIndex((block) => block.id === action.payload) + 1, 0, newBlock);
      }
    },
  },
});

export const { addBlock, removeBlock, moveBlock, updateBlockContent, copyBlock } = blocksSlice.actions;
export default blocksSlice.reducer;
