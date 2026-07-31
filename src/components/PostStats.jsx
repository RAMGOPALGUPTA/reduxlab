import React from "react";
import { useSelector } from "react-redux";
import { selectPostStats } from "../features/posts/postsSelectors";

export default function PostStats() {
  const stats = useSelector(selectPostStats);

  return (
    <div className="stats">
      <div className="stats__item">
        <span className="stats__value">{stats.total}</span>
        <span className="stats__label">Total</span>
      </div>
      <div className="stats__item" data-status="published">
        <span className="stats__value">{stats.published}</span>
        <span className="stats__label">Published</span>
      </div>
      <div className="stats__item" data-status="scheduled">
        <span className="stats__value">{stats.scheduled}</span>
        <span className="stats__label">Scheduled</span>
      </div>
      <div className="stats__item" data-status="draft">
        <span className="stats__value">{stats.draft}</span>
        <span className="stats__label">Draft</span>
      </div>
    </div>
  );
}