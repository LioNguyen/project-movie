import { useAppDispatch, useAppSelector } from "@/core/hooks";
import "./Loader.styles.scss";

export const Loader = () => {
  const dispatch = useAppDispatch();
  const showLoader = useAppSelector((state) => state.global.showLoader);

  if (!showLoader) {
    return <></>;
  }

  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
};
