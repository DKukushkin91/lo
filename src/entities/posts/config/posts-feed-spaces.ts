export const PostsFeedSpaces = {
    All: null,
    Contacts: 'contacts',
    Communities: 'communities',
    Places: 'places',
    Events: 'events',
} as const;

export type TPostsFeedSpaces = (typeof PostsFeedSpaces)[keyof typeof PostsFeedSpaces];
