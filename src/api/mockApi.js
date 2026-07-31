// Simulated backend — replace with real fetch() calls when ready.
const PLATFORMS = [
  { id: "p1", name: "Twitter/X", charLimit: 280 },
  { id: "p2", name: "LinkedIn", charLimit: 3000 },
  { id: "p3", name: "Instagram", charLimit: 2200 },
];

const POSTS = [
  { id: "1", title: "Launch day!", body: "We just shipped v2.", platformId: "p1", status: "published", createdAt: "2026-07-20T09:00:00Z" },
  { id: "2", title: "Behind the scenes", body: "How we built it.", platformId: "p2", status: "draft", createdAt: "2026-07-22T11:30:00Z" },
  { id: "3", title: "New feature teaser", body: "Something cool is coming.", platformId: "p1", status: "scheduled", createdAt: "2026-07-25T14:00:00Z" },
  { id: "4", title: "Team spotlight", body: "Meet our engineers.", platformId: "p3", status: "published", createdAt: "2026-07-26T08:15:00Z" },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function fetchPlatformsApi() {
  await delay(300);
  return PLATFORMS;
}

export async function fetchPostsApi() {
  await delay(400);
  return POSTS;
}

export async function createPostApi(post) {
  await delay(250);
  return { ...post, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
}
