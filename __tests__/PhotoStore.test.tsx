import { PhotoList } from "../src/mobx/store";
test("создает стор и фетчит новые фотки", () => {
  const store = new PhotoList();
  store.fetchPhotos().then(() => {
    expect(store.photos.length).toBe(20);
  });
});

test("удаление фото", () => {
  const store = new PhotoList();
  store.fetchPhotos().then(() => {
    store.deletePhoto(store.photos[0].id);
    expect(store.photos.length).toBe(19);
  });
});
