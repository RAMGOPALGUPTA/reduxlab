import React from "react";
import { useSelector } from "react-redux";
import { selectAllPlatforms } from "../features/posts/postsSelectors";

const PlatformFilter = React.memo(function PlatformFilter({ value, onChange }) {
  const platforms = useSelector(selectAllPlatforms);

  return (
    <select
      className="select"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="">All platforms</option>
      {platforms.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
});

export default PlatformFilter;