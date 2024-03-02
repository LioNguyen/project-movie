import React, { HTMLAttributes, ImgHTMLAttributes, memo } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image = memo(({ ...props }: ImageProps) => {
  return <img {...props} />;
});
