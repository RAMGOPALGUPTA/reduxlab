import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchPlatforms } from "./features/platforms/platformsSlice";
import PostList from "./components/PostList";
import PostStats from "./components/PostStats";

export default function App() {
  const dispatch = useDispatch();
  const postsStatus = useSelector((state) => state.posts.status);
  const platformsStatus = useSelector((state) => state.platforms.status);

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
    if (platformsStatus === "idle") dispatch(fetchPlatforms());
  }, [postsStatus, platformsStatus, dispatch]);

  const loading = postsStatus === "loading" || platformsStatus === "loading";

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">Content Desk</p>
        <h1 className="app__title">Post Manager</h1>
        <p className="app__subtitle">
          Redux Toolkit · Normalized State · Memoized Selectors
        </p>
      </header>

      {loading ? (
        <p className="app__loading">Loading feed…</p>
      ) : (
        <main className="app__main">
          <PostStats />
          <PostList />
        </main>
      )}
    </div>
  );
}