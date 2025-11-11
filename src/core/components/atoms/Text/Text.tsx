import "./Text.styles.scss";

import React, { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  content: string;
  maxLength?: number;
}

export const Text = ({ content, maxLength, ...props }: TextProps) => {
  const __renderContent = () => {
    if (!maxLength || (!!maxLength && content.length <= maxLength)) {
      return content;
    }

    return (
      <>
        <span>{content.slice(0, maxLength)}... </span>
        <span className="read-more">Read more</span>
      </>
    );
  };

  return <p {...props}>{__renderContent()}</p>;
};
