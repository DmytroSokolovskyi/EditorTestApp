export enum BlockTypeEnum {
  HEADLINE = 'Headline',
  PARAGRAPH = 'Paragraph',
  BUTTON = 'Button',
  IMAGE = 'Image',
}

export type IBlockType = BlockTypeEnum;

export interface IBlock {
  id: string;
  type: IBlockType;
  content: string;
}
