import { FC, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

interface MediaProps {
  link: string;
  width?: string;
  height?: string;
  className?: string;
}

const Media: FC<MediaProps> = ({ link = '', width = 'auto', height = 'auto', className = '' }) => {
  const [mediaElement, setMediaElement] = useState<JSX.Element | null>(null);
  const [errorElement, setErrorElement] = useState<JSX.Element | null>(null);

  const checkImageLink = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error('Bad Media URL'));
      img.src = url;
    });
  };

  const checkVideoLink = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.onloadeddata = () => resolve(url);
      video.onerror = () => reject(new Error('Bad Video URL'));
      video.src = url;
    });
  };

  const createYouTubeEmbedUrl = (url: string): string => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    setMediaElement(null);
    setErrorElement(null);

    if (!link) {
      setErrorElement(<span>error</span>);
      return;
    }

    if (link.startsWith('data:image')) {
      const newImageElement = <img loading="lazy" src={link} alt="media" style={{ width, height }} />;
      setMediaElement(newImageElement);
      return;
    }

    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      const embedUrl = createYouTubeEmbedUrl(link);
      const newIframeElement = (
        <iframe
          width={width}
          height={height}
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      );
      setMediaElement(newIframeElement);
    } else {
      checkImageLink(link)
        .then((url) => {
          const newImageElement = <img loading="lazy" src={url} alt="media" style={{ width, height }} />;
          setMediaElement(newImageElement);
        })
        .catch(() => {
          checkVideoLink(link)
            .then((url) => {
              const newVideoElement = (
                <video controls style={{ width, height }}>
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
              setMediaElement(newVideoElement);
            })
            .catch(() => {
              const newErrorElement = <span>error</span>;
              setErrorElement(newErrorElement);
            });
        });
    }
  }, [link, width, height]);

  return <div className={classNames('', {}, [className])}>{mediaElement || errorElement}</div>;
};

export default Media;
