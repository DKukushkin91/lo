export const PostsFeedContents = {
    All: null,
    Photos: 'photos',
    Videos: 'videos',
} as const;

export type TPostsFeedContents = (typeof PostsFeedContents)[keyof typeof PostsFeedContents];
