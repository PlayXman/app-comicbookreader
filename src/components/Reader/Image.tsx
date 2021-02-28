import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Hammer from 'hammerjs';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    background: '#000',
  },
  image: {
    width: '100%',
    height: 'auto'
  }
});

interface ImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({src}) => {
  const classes = useStyles();
  const wrapperEl = useRef<HTMLDivElement | null>(null);
  const imgEl = useRef<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleTouch = (e: React.TouchEvent) => {
    console.log(e);
    if (e.touches.length > 1) {
      console.log(e);

      //todo use: http://hammerjs.github.io/api/
    }
  };

  useEffect(() => {
    let hammertime: HammerManager | null = null;

    if (imgEl && wrapperEl) {
      console.log('Event start');

      window.addEventListener('resize', handleResize);

      hammertime = new Hammer(imgEl.current as HTMLElement);
      hammertime.get('pan').set({direction: Hammer.DIRECTION_ALL});
      hammertime.get('pinch').set({enable: true});

      let initScrollTop = 0;
      let initScrollLeft = 0;
      hammertime.on('pan', (ev) => {
        const el = wrapperEl.current as HTMLDivElement;

        el.scrollTo({
          top: initScrollTop - ev.deltaY,
          left: initScrollLeft - ev.deltaX
        });

        if (ev.isFinal) {
          initScrollTop = el.scrollTop;
          initScrollLeft = el.scrollLeft;
        }
      });

      hammertime.on('pinch', function (ev) {
        console.log({
          type: 'pinch',
          event: ev
        });
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (hammertime) {
        hammertime.destroy();
      }
    }
  }, [imgEl, wrapperEl]);

  return (
    <div
      ref={wrapperEl}
      className={classes.root}
    >
      <img
        ref={imgEl}
        // className={classes.image}
        src={src}
        alt=""
      />
    </div>
  );
};

export default Image;