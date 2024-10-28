import { makeObservable, observable } from "mobx";

interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
  created_at: Date;
}

class PhotoItem {
  id: string;
  slug: string;
  url: string;
  created_at: Date;

  constructor(id: string, slug: string, url: string, created_at: Date) {
    this.slug = slug;
    this.id = id;
    this.url = url;
    this.created_at = created_at;
  }
}

export class PhotoList {
  photos: PhotoItem[];
  page: number;
  isLoading: boolean;
  constructor() {
    makeObservable(this, {
      photos: observable,
      isLoading: observable,
    });
    this.photos = [];
    this.page = 1;
    this.isLoading = false;
  }
  async fetchPhotos() {
    try {
      this.isLoading = !this.isLoading;
      const response = await fetch(
        `https://api.unsplash.com/photos/?page=${this.page}&per_page=20`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization:
              "Client-ID jlqC7LUDLi1vNh_Y2bAHDAN67csOclryjkFdiTPnkXA",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res: Photo[] = await response.json();
      this.page = this.page + 1;
      res.forEach((item: Photo) => {
        this._addPhotos(item);
      });
      this.isLoading = !this.isLoading;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  _addPhotos(item: Photo) {
    this.photos.push(
      new PhotoItem(
        item.id,
        item.alt_description,
        item.urls.small,
        item.created_at
      )
    );
  }

  deletePhoto(id: string) {
    const newList = this.photos.filter((item: PhotoItem) => {
      return id !== item.id;
    });
    this.photos = newList;
  }

  sortFromOldToNew() {
    console.log("old to new");
    this.photos.sort((a: PhotoItem, b: PhotoItem) => {
      return +new Date(a.created_at) - +new Date(b.created_at);
    });
  }

  sortFromNewToOld(): void {
    console.log("new to old");
    this.photos = this.photos.sort((a: PhotoItem, b: PhotoItem) => {
      return +new Date(b.created_at) - +new Date(a.created_at);
    });
  }
}
// export default PhotoList;
