import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './EditorBlock.scss';
import { updateBlockContent } from '@/pages/EditorPage/api/blocksSlice.ts';
import { Icon } from '@/shared/UI/Icon';
import { HeadlineIcon, ParagraphIcon, ImageIcon } from '@/shared/assets/icons/icons.ts';
import Input from '@/shared/UI/Input/Input.tsx';
import { useDebounce } from '@/shared/hooks/useDebounce.ts';
import useOnClickOutside from '@/shared/hooks/useClickOutside.ts';
import { BlockControls } from '@/pages/EditorPage/ui/components/BlockControls/BlockControls.tsx';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { ImageUploader } from '@/pages/EditorPage/ui/components/ImageUploader/ImageUploader.tsx';
import { IBlock, IBlockType } from '@/shared/types/types.ts';

interface IBlockProps {
  block: IBlock;
}

const getIconByType = (type: IBlockType) => {
  const iconMap = {
    Headline: HeadlineIcon,
    Paragraph: ParagraphIcon,
    Button: ImageIcon,
    Image: ImageIcon,
  };

  return iconMap[type] || null;
};

export const EditorBlock: FC<IBlockProps> = ({ block }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(block.content);

  const debouncedContent = useDebounce(inputValue, 500);

  const handleSaveContent = () => {
    dispatch(updateBlockContent({ id: block.id, content: inputValue }));
    setIsEditing(false);
  };

  useEffect(() => {
    if (debouncedContent !== block.content) {
      dispatch(updateBlockContent({ id: block.id, content: debouncedContent }));
    }
  }, [debouncedContent, block.content, dispatch]);

  const ref = useOnClickOutside(() => {
    if (isEditing) {
      handleSaveContent();
    }
  });

  const icon = getIconByType(block.type);

  return (
    <div className={classNames('editorBlock', { edit: isEditing })} ref={ref} onClick={() => setIsEditing(true)}>
      {icon && <Icon Svg={icon} />}
      <p>{block.type}</p>

      {isEditing && block.type === 'Image' ? (
        <ImageUploader block={block} changeUrl={(url) => setInputValue(url)} />
      ) : isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveContent()}
          autoFocus
        />
      ) : null}

      {isEditing && <BlockControls blockId={block.id} />}
    </div>
  );
};
