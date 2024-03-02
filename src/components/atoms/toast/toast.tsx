import "./toast.styles.scss";

import clsx from "clsx";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { MdError } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { hideToast } from "@/store/globalSlice";

export const Toast = () => {
  const dispatch = useAppDispatch();
  const showToast = useAppSelector((state) => state.global.showToast);
  const title = showToast?.title || "Title";
  const message = showToast?.message || "";
  const type = showToast?.type || "success";

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (showToast) {
      timeoutId = setTimeout(() => {
        dispatch(hideToast());
      }, 3500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showToast]);

  const handleHideToast = () => {
    dispatch(hideToast());
  };

  return (
    <div
      id="toast"
      className={clsx(
        "toast",
        showToast?.show ? "show" : "hide",
        `toast--${type}`
      )}
    >
      <div className="toast__icon">
        <MdError />
      </div>
      <div className="toast__body">
        <h3 className="toast__title">{title}</h3>
        {message && <p className="toast__msg">{message}</p>}
      </div>
      <div className="toast__close" onClick={handleHideToast}>
        <IoClose />
      </div>
    </div>
  );
};
