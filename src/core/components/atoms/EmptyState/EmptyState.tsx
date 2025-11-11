import "./EmptyState.styles.scss";

import { FaFaceSadTear } from "react-icons/fa6";

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <FaFaceSadTear />
      <p>No Results Found</p>
    </div>
  );
};
