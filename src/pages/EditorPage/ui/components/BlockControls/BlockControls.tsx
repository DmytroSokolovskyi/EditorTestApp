import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { moveBlock, removeBlock, copyBlock } from '@/pages/EditorPage/api/blocksSlice.ts';
import './BlockControls.scss';
import { useAppSelector } from '@/app/providers/store/store.ts';
import { Button } from '@/shared/UI/Button';
import { Icon } from '@/shared/UI/Icon';
import { ArrowIcon, CopyIcon, TrashIcon } from '@/shared/assets/icons/icons.ts';

interface BlockControlsProps {
  blockId: string;
}

export const BlockControls: FC<BlockControlsProps> = ({ blockId }) => {
  const dispatch = useDispatch();
  const { blocks } = useAppSelector((state) => state.editor);

  const blockIndex = blocks.findIndex((b) => b.id === blockId);
  const isFirstBlock = blockIndex === 0;
  const isLastBlock = blockIndex === blocks.length - 1;

  const handleMoveBlock = (direction: 'up' | 'down') => {
    if ((direction === 'up' && !isFirstBlock) || (direction === 'down' && !isLastBlock)) {
      dispatch(moveBlock({ id: blockId, direction }));
    }
  };

  const handleRemoveBlock = () => {
    dispatch(removeBlock(blockId));
  };

  const handleCopyBlock = () => {
    dispatch(copyBlock(blockId));
  };

  return (
    <div className="block-controls">
      <div className="block-controls__buttons">
        <Button onClick={() => handleMoveBlock('up')} disabled={isFirstBlock} className="arrowUp">
          <Icon Svg={ArrowIcon} height={15} width={12} />
        </Button>
        <Button onClick={() => handleMoveBlock('down')} disabled={isLastBlock}>
          <Icon Svg={ArrowIcon} height={15} width={12} />
        </Button>
      </div>
      <div className="block-controls__buttons second">
        <Button onClick={handleCopyBlock}>
          <Icon Svg={CopyIcon} height={15} width={12} />
        </Button>
        <Button onClick={handleRemoveBlock}>
          <Icon Svg={TrashIcon} height={15} width={12} />
        </Button>
      </div>
    </div>
  );
};
