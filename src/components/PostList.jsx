import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredPosts,
  selectAllPlatforms,
} from "../features/posts/postsSelectors";
import { postRemoved, postStatusChanged } from "../features/posts/postsSlice";
import PlatformFilter from "./PlatformFilter";

const slugify = (name) =>
  name.toLowerCase().split("/")[0].trim().replace(/\s+/g, "-");

const PostRow = React.memo(function PostRow({
  post,
  platformName,
  platformSlug,
  onRemove,
  onStatusChange,
}) {
  return (
    <li className="cue-card" data-platform={platformSlug}>
      <div className="cue-card__accent" aria-hidden="true" />
      <div className="cue-card__body">
        <div className="cue-card__meta">
          <span
            className={`status-dot status-dot--${post.status}`}
            aria-hidden="true"
          />
          <span className="cue-card__platform">{platformName}</span>
        </div>
        <h3 className="cue-card__title">{post.title}</h3>
        <p className="cue-card__excerpt">{post.body}</p>
        <div className="cue-card__controls">
          <select
            className="select select--status"
            value={post.status}
            onChange={(e) => onStatusChange(post.id, e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
          <button className="btn btn--ghost-danger" onClick={() => onRemove(post.id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
});

export default function PostList() {
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState(null);

  const filteredPosts = useSelector((state) =>
    selectFilteredPosts(state, statusFilter, platformFilter)
  );
  const platforms = useSelector(selectAllPlatforms);

  const platformById = useMemo(
    () =>
      Object.fromEntries(
        platforms.map((p) => [p.id, { name: p.name, slug: slugify(p.name) }])
      ),
    [platforms]
  );

  const handleRemove = useCallback((id) => dispatch(postRemoved(id)), [dispatch]);
  const handleStatusChange = useCallback(
    (id, status) => dispatch(postStatusChanged({ id, status })),
    [dispatch]
  );

  const statusOptions = useMemo(
    () => ["all", "draft", "scheduled", "published"],
    []
  );

  return (
    <div className="board">
      <div className="board__controls">
        <label className="control">
          <span className="control__label">Status</span>
          <select
            className="select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All statuses" : s}
              </option>
            ))}
          </select>
        </label>
        <label className="control">
          <span className="control__label">Platform</span>
          <PlatformFilter value={platformFilter} onChange={setPlatformFilter} />
        </label>
      </div>

      <ul className="cue-sheet">
        {filteredPosts.map((post) => {
          const platform = platformById[post.platformId];
          return (
            <PostRow
              key={post.id}
              post={post}
              platformName={platform?.name ?? "Unknown"}
              platformSlug={platform?.slug}
              onRemove={handleRemove}
              onStatusChange={handleStatusChange}
            />
          );
        })}
      </ul>
    </div>
  );
}