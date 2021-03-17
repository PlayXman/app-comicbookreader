import Hammer from "hammerjs";

class ImageViewer {
  private hammerTime: HammerManager;
  private wrapperEl: HTMLDivElement;
  private imageEl: HTMLImageElement;
  private setImageWidthHandler: Function;

  private eventStartState = {
    scroll: {
      top: 0,
      left: 0
    },
    pointer: {
      x: 0,
      y: 0
    }
  };
  private intervalObj: NodeJS.Timeout | null;
  private isZooming: boolean;
  private imageCurrentWidth: number;

  private minimalWidth: number;
  private maximalWidth: number;

  /**
   * @param wrapperEl Image's wrapper element
   * @param imageEl Image element
   * @param setImageWidth React's useState update function
   */
  constructor(wrapperEl: HTMLDivElement, imageEl: HTMLImageElement, setImageWidth: Function) {
    this.wrapperEl = wrapperEl;
    this.imageEl = imageEl;
    this.setImageWidthHandler = setImageWidth;
    this.intervalObj = null;
    this.isZooming = false;
    this.minimalWidth = this.calculateMinimalWidth();
    this.maximalWidth = imageEl.naturalWidth;
    this.imageCurrentWidth = this.minimalWidth;

    // hammer init
    this.hammerTime = new Hammer.Manager(this.wrapperEl);
    this.hammerTime.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL}));
    this.hammerTime.add(new Hammer.Press({event: "zoomPress", time: 300}));
    this.hammerTime.add(new Hammer.Tap({event: "zoomDoubleTap", taps: 2}));
  }

  /**
   * Start pointer pan and zoom, wheel zoom, and double click/tap zoom
   */
  start() {
    // pointer pan & zoom
    this.hammerTime.on('panstart', this.panstartEventHandler);
    this.hammerTime.on('pan', this.panEventHandler);
    this.hammerTime.on('panend pancancel', this.panendEventHandler);
    this.hammerTime.on('zoomPress', this.zoomPressEventHandler);
    this.hammerTime.on('zoomPressup', this.zoomPressupEventHandler);

    // wheel zoom
    this.wrapperEl.addEventListener('wheel', this.wheelEventHandler);

    // double click zoom
    this.hammerTime.on('zoomDoubleTap', this.zoomDoubleTapEventHandler);

    // wrapper size fix
    window.addEventListener("resize", this.windowResizeEventHandler);
  }

  /**
   * Stop all listeners
   */
  stop() {
    this.hammerTime.destroy();
    this.wrapperEl.removeEventListener('wheel', this.wheelEventHandler);
    window.removeEventListener('resize', this.windowResizeEventHandler);
  }

  private zoomTo(newImageWidth: number, pointerX: number, pointerY: number) {
    const scrollTopOrigin =
      (this.wrapperEl.scrollTop + pointerY) / this.wrapperEl.scrollHeight;
    const scrollLeftOrigin =
      (this.wrapperEl.scrollLeft + pointerX) / this.wrapperEl.scrollWidth;

    if (newImageWidth >= this.minimalWidth && newImageWidth <= this.maximalWidth) {
      this.imageCurrentWidth = newImageWidth;
      this.setImageWidthHandler(newImageWidth);

      this.wrapperEl.scrollTo({
        behavior: "auto",
        top: Math.round(this.wrapperEl.scrollHeight * scrollTopOrigin) - pointerY,
        left: Math.round(this.wrapperEl.scrollWidth * scrollLeftOrigin) - pointerX
      });
    }
  }

  private calculateMinimalWidth(): number {
    const wrapperW = this.wrapperEl.offsetWidth;
    const wrapperH = this.wrapperEl.offsetHeight;
    const imageW = this.imageEl.naturalWidth;
    const imageH = this.imageEl.naturalHeight;

    if ((wrapperW / imageW * imageH) > wrapperH) {
      return Math.floor(wrapperH / imageH * imageW);
    }

    return wrapperW;
  }

  private panstartEventHandler = (event: HammerInput) => {
    if (this.intervalObj) {
      clearInterval(this.intervalObj);
    }

    this.eventStartState.scroll.top = this.wrapperEl.scrollTop;
    this.eventStartState.scroll.left = this.wrapperEl.scrollLeft;
    this.eventStartState.pointer.x = event.center.x;
    this.eventStartState.pointer.y = event.center.y;
  };

  private panEventHandler = (event: HammerInput) => {
    if (this.isZooming) {
      //zoom
      const newWidth = this.imageCurrentWidth - Math.round(80 * event.velocityY);

      this.zoomTo(newWidth, this.eventStartState.pointer.x, this.eventStartState.pointer.y);
    } else {
      //move
      this.wrapperEl.scrollTo({
        behavior: "auto",
        top: this.eventStartState.scroll.top - event.deltaY,
        left: this.eventStartState.scroll.left - event.deltaX
      });
    }
  }

  private panendEventHandler = (event: HammerInput) => {
    if (this.isZooming) {
      //zoom
      this.isZooming = false;
    } else {
      //move
      const ms = 9;
      let count = 30;

      this.intervalObj = setInterval(() => {
        if (count < 1 && this.intervalObj) {
          clearInterval(this.intervalObj);
        }

        this.wrapperEl.scrollTo({
          behavior: "auto",
          top: this.wrapperEl.scrollTop - (event.velocityY * ms * count) / 30,
          left: this.wrapperEl.scrollLeft - (event.velocityX * ms * count) / 30
        });

        count--;
      }, ms);
    }
  }

  private zoomPressEventHandler = () => {
    this.isZooming = true;
  };

  private zoomPressupEventHandler = () => {
    this.isZooming = false;
  };

  /**
   * Scroll wheel zoom
   * @param event
   */
  private wheelEventHandler = (event: WheelEvent) => {
    event.preventDefault();

    let newWidth = this.imageCurrentWidth - Math.round(50 * event.deltaY);
    if (newWidth > this.maximalWidth) {
      newWidth = this.maximalWidth;
    } else if (newWidth < this.minimalWidth) {
      newWidth = this.minimalWidth;
    }

    this.zoomTo(newWidth, event.x, event.y);
  }

  /**
   * Double click zoom
   * @param event
   */
  private zoomDoubleTapEventHandler = (event: HammerInput) => {
    const newWidth =
      this.imageCurrentWidth > ((this.maximalWidth - this.minimalWidth) / 2) + this.minimalWidth
        ? this.minimalWidth
        : this.maximalWidth;

    this.zoomTo(newWidth, event.center.x, event.center.y);
  };

  /**
   * Fixes size limits if viewport resizes
   */
  private windowResizeEventHandler = () => {
    this.minimalWidth = this.calculateMinimalWidth();
    this.zoomTo(this.minimalWidth, 0, 0);
  }

}

export default ImageViewer;