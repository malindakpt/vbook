import React, { useEffect, useRef } from 'react';
import lottieWeb from 'lottie-web';

interface Props {
  src: object;
}

export const Animation: React.FC<Props> = ({ src }: Props) => {
  const ele = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('src', src);

    if (ele.current) {
      lottieWeb.loadAnimation({
        container: ele.current,
        // path: 'https://assets8.lottiefiles.com/packages/lf20_5oddov0y.json',
        animationData: src,
        renderer: 'svg',
        loop: true,
        autoplay: true
      });
    }
  }, []);

  return <div ref={ele} />;
};
