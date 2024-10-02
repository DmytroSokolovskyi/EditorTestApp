import { ChangeEvent, FC, useState } from 'react';
import './ImageUploader.scss';
import Input from '@/shared/UI/Input/Input.tsx';
import { IBlock } from '@/shared/types/types.ts';

interface ImageUploaderProps {
  block: IBlock;
  changeUrl: (url: string) => void;
}

export const ImageUploader: FC<ImageUploaderProps> = ({ block, changeUrl }) => {
  const [uploadType, setUploadType] = useState<'FILE' | 'URL'>('FILE');
  const [imageUrl, setImageUrl] = useState(block.content || '');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setImageUrl('');
    changeUrl('');
    if (selectedFile) {
      const content = URL.createObjectURL(selectedFile);
      changeUrl(content);
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);
    changeUrl(url);
  };

  const handleSwitch = (type: 'FILE' | 'URL') => {
    setUploadType(type);
    setImageUrl('');
    changeUrl('');
  };

  return (
    <div className="imageUploader">
      <div className="imageUploader__switcher">
        <div
          className={`imageUploader__switcher-button ${uploadType === 'FILE' ? 'active' : ''}`}
          onClick={() => handleSwitch('FILE')}
        >
          File
        </div>
        <div
          className={`imageUploader__switcher-button ${uploadType === 'URL' ? 'active' : ''}`}
          onClick={() => handleSwitch('URL')}
        >
          Url
        </div>
      </div>
      {uploadType === 'FILE' && (
        <div className="image-upload">
          <label className="custom-file-upload">
            <input type="file" onChange={handleFileChange} />
            <span>Choose file</span>
          </label>
          <p className="file-preview">{block?.content || 'No file'}</p>
        </div>
      )}
      {uploadType !== 'FILE' && (
        <div className="image-upload">
          <Input type="text" value={imageUrl} onChange={handleUrlChange} placeholder="Вставте URL зображення" />
        </div>
      )}
    </div>
  );
};
