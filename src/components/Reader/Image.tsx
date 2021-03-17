import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import ImageViewer from "../../models/ImageViewer";

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    background: '#000',
  },
  image: {
    height: 'auto',
    minHeight: '100%',
    display: 'block',
    pointerEvents: 'none',
    objectFit: 'contain',
    margin: 'auto'
  }
});

interface ImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({src}) => {
  const classes = useStyles();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    let imageViewer: ImageViewer | null = null;

    if (imgRef && wrapperRef) {
      imageViewer = new ImageViewer(
        wrapperRef.current as HTMLDivElement,
        imgRef.current as HTMLImageElement,
        setImageWidth
      );

      setImageWidth(wrapperRef.current?.offsetWidth ?? 0);
      imageViewer.start();
    }

    return () => {
      if (imageViewer) {
        imageViewer.stop();
      }
    }
  }, [imgRef, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className={classes.root}
    >
      <img
        ref={imgRef}
        className={classes.image}
        src={src}
        alt=""
        width={imageWidth}
      />
    </div>
  );
};

export default Image;