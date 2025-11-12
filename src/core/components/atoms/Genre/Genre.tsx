import "./Genre.styles.scss";

interface Props {
  text: string;
  id?: number;
  onClick?: (id: number | undefined, text: string) => void;
}

export const Genre = ({ text, id, onClick }: Props) => {
  return (
    <div
      className="genre"
      onClick={() => onClick?.(id, text)}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {text}
    </div>
  );
};
