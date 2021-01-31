import firebase from "firebase/app";

class Page {
  private storageReference: firebase.storage.Reference;
  private fileUrl: string = '';

  constructor(storageReference: firebase.storage.Reference) {
    this.storageReference = storageReference;
  }

  preload(): Promise<string> {
    return new Promise((resolve) => {
      if (this.fileUrl.length) {
        resolve(this.fileUrl);
        return;
      }

      this.storageReference.getDownloadURL().then((imageUrl) => {
        this.fileUrl = imageUrl;

        const image = new Image();
        image.addEventListener('load', () => {
          resolve(this.fileUrl);
        }, {once: true});
        image.src = this.fileUrl;
      });
    });
  }

  async getPictureUrl(): Promise<string> {
    return await this.preload();
  }
}

export default Page;