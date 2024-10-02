import { FC } from 'react';
import './ViewBlock.scss';
import { Button } from '@/shared/UI/Button';
import Media from '@/shared/UI/Media/Media.tsx';
import { BlockTypeEnum, IBlock } from '@/shared/types/types.ts';

interface ViewBlockProps {
  block: IBlock;
}

export const ViewBlock: FC<ViewBlockProps> = ({ block }) => {
  return (
    <div className="viewBlock">
      {block.type === BlockTypeEnum.HEADLINE && <h1>{block.content || 'Headline'}</h1>}
      {block.type === BlockTypeEnum.PARAGRAPH && <p>{block.content || 'Paragraph'}</p>}
      {block.type === BlockTypeEnum.BUTTON && (
        <Button className="viewBlock__button">{block.content || 'Button'}</Button>
      )}
      {block.type === BlockTypeEnum.IMAGE && <Media className="viewBlock__media" link={block.content || ''} />}
    </div>
  );
};
