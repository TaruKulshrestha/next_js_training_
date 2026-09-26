// Lesson 70 — Paths File: one place for URLs.
// Call these instead of writing "/topics/..." by hand.
const paths = {
  home() {
    return "/";
  },
  // Topic page, e.g. /topics/react
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  // New-post form for that topic
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  // One post, e.g. /topics/react/posts/abc123
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};

export default paths;
