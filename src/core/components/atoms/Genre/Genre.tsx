import "./Genre.styles.scss";

interface Props {
  text: string;
}

export const Genre = ({ text }: Props) => {
  return <div className="genre">{text}</div>;
};
