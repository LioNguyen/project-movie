export const getImageUrl = (imagePath: string) => {
  return `${import.meta.env.VITE_API_IMAGE_URL}${imagePath}`;
};

export const isImgUrlValid = (imageUrl: string) => {
  const img = new Image();
  img.src = imageUrl;

  return new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const checkAllImgUrl = async (urlList: string[]) => {
  const promises = urlList.map((url) => isImgUrlValid(url));
  const results = await Promise.all(promises);

  return results;
};
