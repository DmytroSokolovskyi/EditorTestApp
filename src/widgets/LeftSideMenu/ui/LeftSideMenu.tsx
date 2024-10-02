import './LeftSideMenu.scss';
import { HeadlineIcon, ImageIcon, ParagraphIcon } from '@/shared/assets/icons/icons.ts';
import { LeftSideButton } from '@/widgets/LeftSideMenu/ui/components/LeftSideButton/LeftSideButton.tsx';
import { FC, memo, SVGProps } from 'react';
import { BlockTypeEnum } from '@/shared/types/types.ts';

const BUTTON_TEXTS = {
  HEADLINE: 'Headline',
  PARAGRAPH: 'Paragraph',
  BUTTON: 'Button',
  IMAGE: 'Image',
} as const;

interface ButtonData {
  icon: FC<SVGProps<SVGSVGElement>>;
  text: string;
  type: BlockTypeEnum;
}

const BUTTON_DATA: ButtonData[] = [
  { icon: HeadlineIcon, text: BUTTON_TEXTS.HEADLINE, type: BlockTypeEnum.HEADLINE },
  { icon: ParagraphIcon, text: BUTTON_TEXTS.PARAGRAPH, type: BlockTypeEnum.PARAGRAPH },
  { icon: ImageIcon, text: BUTTON_TEXTS.BUTTON, type: BlockTypeEnum.BUTTON },
  { icon: ImageIcon, text: BUTTON_TEXTS.IMAGE, type: BlockTypeEnum.IMAGE },
];

export const LeftSideMenu = memo(() => {
  return (
    <div className="leftSideMenu">
      {BUTTON_DATA.map((buttonData) => (
        <LeftSideButton key={buttonData.text} icon={buttonData.icon} text={buttonData.text} type={buttonData.type} />
      ))}
    </div>
  );
});
