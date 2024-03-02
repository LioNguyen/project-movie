import { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image = ({ ...props }: ImageProps) => {
  return <img {...props} />;
};
