import { createSelector } from "@reduxjs/toolkit";
import { postsSelectors } from "./postsSlice";
import { platformsSelectors } from "../platforms/platformsSlice";

// --- Basic (input) selectors ---------------------------------------------
export const selectAllPosts = postsSelectors.selectAll;
export const selectAllPlatforms = platformsSelectors.selectAll;
const selectStatusFilter = (state, statusFilter) => statusFilter;
const selectPlatformFilter = (state, statusFilter, platformFilter) => platformFilter;

// --- Memoized derived selectors -------------------------------------------
// Recomputes ONLY when posts or the filter args actually change,
// not on every store update (e.g. drafts changing won't re-run this).
export const selectFilteredPosts = createSelector(
  [selectAllPosts, selectStatusFilter, selectPlatformFilter],
  (posts, statusFilter, platformFilter) => {
    return posts.filter((post) => {
      const statusMatch = statusFilter === "all" || post.status === statusFilter;
      const platformMatch = !platformFilter || post.platformId === platformFilter;
      return statusMatch && platformMatch;
    });
  }
);

// Grouped/derived data: posts bucketed by platform name, joining two slices
export const selectPostsGroupedByPlatform = createSelector(
  [selectAllPosts, selectAllPlatforms],
  (posts, platforms) => {
    const platformNameById = Object.fromEntries(
      platforms.map((p) => [p.id, p.name])
    );
    return posts.reduce((groups, post) => {
      const name = platformNameById[post.platformId] ?? "Unknown";
      (groups[name] ??= []).push(post);
      return groups;
    }, {});
  }
);

// Aggregate stats — cheap here, but demonstrates the pattern for expensive
// derived computations (counts, sums, sorts) you don't want on every render.
export const selectPostStats = createSelector([selectAllPosts], (posts) => ({
  total: posts.length,
  published: posts.filter((p) => p.status === "published").length,
  draft: posts.filter((p) => p.status === "draft").length,
  scheduled: posts.filter((p) => p.status === "scheduled").length,
}));

// Selector factory pattern — use when each component instance needs its
// own memoization cache (e.g. a list rendering per-platform post counts).
export const makeSelectPostCountForPlatform = () =>
  createSelector(
    [selectAllPosts, (state, platformId) => platformId],
    (posts, platformId) => posts.filter((p) => p.platformId === platformId).length
  );
