import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import './EditorPage.scss';
import { addBlock } from '@/pages/EditorPage/api/blocksSlice';
import { EditorBlock } from '@/pages/EditorPage/ui/components/EditorBlock/EditorBlock.tsx';
import { useAppSelector } from '@/app/providers/store/store.ts';
import { ViewBlock } from '@/pages/EditorPage/ui/components/ViewBlock/ViewBlock.tsx';
import { IBlock, IBlockType } from '@/shared/types/types.ts';

const NO_BLOCKS_TEXT = 'Drag items here';

export const EditorPage: FC = () => {
  const dispatch = useDispatch();
  const { blocks } = useAppSelector((state) => state.editor);

  const [, drop] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item: { type: IBlockType }) => {
      dispatch(addBlock({ id: Date.now().toString(), type: item.type, content: '' }));
    },
  }));

  return (
    <div className="editorPage">
      <div className="editorPage__blocks" ref={drop}>
        {blocks.length === 0 && <p>{NO_BLOCKS_TEXT}</p>}
        {blocks.map((block: IBlock) => (
          <EditorBlock key={block.id} block={block} />
        ))}
      </div>
      <div className="editorPage__view">
        {blocks.map((block: IBlock) => (
          <ViewBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};
