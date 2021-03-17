import Hammer from "hammerjs";

class ImageViewer {
  hammerTime: HammerManager;
  wrapperEl: HTMLDivElement;
  imageEl: HTMLImageElement;
  setImageWidthHandler: Function;

  eventStartState = {
    scroll: {
      top: 0,
      left: 0
    },
    pointer: {
      x: 0,
      y: 0
    }
  };
  imageOriginalWidth: number;

  intervalObj: NodeJS.Timeout | null;
  isZooming: boolean;
  wrapperWidth: number;
  imageCurrentWidth: number;

  /**
   * @param wrapperEl Image's wrapper element
   * @param imageEl Image element
   * @param setImageWidth React's useState update function
   */
  constructor(wrapperEl: HTMLDivElement, imageEl: HTMLImageElement, setImageWidth: Function) {
    this.wrapperEl = wrapperEl;
    this.imageEl = imageEl;
    this.setImageWidthHandler = setImageWidth;
    this.imageOriginalWidth = imageEl.naturalWidth;

    this.intervalObj = null;
    this.isZooming = false;
    this.wrapperWidth = wrapperEl.offsetWidth;
    this.imageCurrentWidth = this.wrapperWidth;

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
    this.wrapperEl.addEventListener("wheel", this.wheelEventHandler);

    // double click zoom
    this.hammerTime.on('zoomDoubleTap', this.zoomDoubleTapEventHandler);
  }

  /**
   * Stop all listeners
   */
  stop() {
    this.hammerTime.destroy();
  }

  private zoomTo(newImageWidth: number, pointerX: number, pointerY: number) {
    const scrollTopOrigin =
      (this.wrapperEl.scrollTop + pointerY) / this.wrapperEl.scrollHeight;
    const scrollLeftOrigin =
      (this.wrapperEl.scrollLeft + pointerX) / this.wrapperEl.scrollWidth;

    if (newImageWidth >= this.wrapperWidth && newImageWidth <= this.imageOriginalWidth) {
      this.imageCurrentWidth = newImageWidth;
      this.setImageWidthHandler(newImageWidth);

      this.wrapperEl.scrollTo({
        behavior: "auto",
        top: Math.round(this.wrapperEl.scrollHeight * scrollTopOrigin) - pointerY,
        left: Math.round(this.wrapperEl.scrollWidth * scrollLeftOrigin) - pointerX
      });
    }
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

    const newWidth = this.imageCurrentWidth - Math.round(50 * event.deltaY);

    this.zoomTo(newWidth, event.x, event.y);
  }

  /**
   * Double click zoom
   * @param event
   */
  private zoomDoubleTapEventHandler = (event: HammerInput) => {
    const newWidth =
      this.imageCurrentWidth > ((this.imageOriginalWidth - this.wrapperWidth) / 2) + this.wrapperWidth
        ? this.wrapperWidth
        : this.imageOriginalWidth;

    this.zoomTo(newWidth, event.center.x, event.center.y);
  };

}

export default ImageViewer;