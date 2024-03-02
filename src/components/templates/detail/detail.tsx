import { memo } from "react";
import "./detail.styles.scss";

import { Container, Navbar, NavbarProps } from "@/components";

interface DetailProps extends NavbarProps {}

export const Detail = memo(({ onBack }: DetailProps) => {
  return (
    <>
      <Navbar onBack={onBack} />
      <Container id="detail">Detail</Container>
    </>
  );
});
