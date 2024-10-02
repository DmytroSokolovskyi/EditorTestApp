import { FC, SVGProps } from 'react';
import './LeftSideButton.scss';
import { Icon } from '@/shared/UI/Icon';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addBlock } from '@/pages/EditorPage/api/blocksSlice.ts';

interface LeftSideButtonProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  text: string;
  type: string;
}

export const LeftSideButton: FC<LeftSideButtonProps> = ({ icon, text, type }) => {
  const dispatch = useDispatch();

  const [_, drag] = useDrag(
    () => ({
      type: 'BLOCK',
      item: () => ({ type }),
    }),
    [type],
  );

  const handleClick = () => {
    dispatch(addBlock({ id: Date.now().toString(), type, content: '' }));
  };

  return (
    <div ref={drag} className="leftSideButton" onClick={handleClick}>
      <Icon Svg={icon} height={20} width={20} />
      <span className="leftSideButton__text">{text}</span>
    </div>
  );
};
