export default interface IPostFeed {
    id: number;
    postId: number | null;
    flowId: number | null;
    message: string | null;
    time: number;
    closeComments: boolean;
    contactsOnly: boolean;
    isPinned: boolean;
    likes: {
        count: number;
        canView: boolean;
        isLiked: boolean;
    };
    comments: {
        count: number;
        canView: boolean;
        canComment: boolean;
        isCommented: boolean;
    };
    reposts: {
        count: number;
        canView: boolean | null;
        canRepost: boolean;
        isReposted: boolean;
    };
    views: {
        count: number;
    };
    canEdit: boolean;
    canManage: boolean;
    canDelete: boolean;
    url: string;
    user: {
        id: number;
        screenName: string | null;
        firstName: string;
        lastName: string;
        verified: number;
        deactivated: number;
        sex: number;
        photo: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            original: string;
        };
        albumProfile: {
            id: number;
            photoId: number;
        };
        isOnline: number;
        lastVisit: number;
        rate: {
            total: number;
            info: number;
        };
        countryId: number;
        cityId: number;
        birthday: {
            date: number;
            year: number;
            month: number;
            day: number;
        };
        status: string | null;
        url: string;
    };
    union?: {
        id: number;
        screenName: string | null;
        type: number;
        ageLimit: number;
        membersHide: boolean;
        services: any[];
        name: string;
        status: string;
        description: string;
        website: string;
        photo: {
            xs: {
                src: string;
                width: number;
                height: number;
            };
            sm: {
                src: string;
                width: number;
                height: number;
            };
            md: {
                src: string;
                width: number;
                height: number;
            };
            lg: {
                src: string;
                width: number;
                height: number;
            };
            original: string;
        };
        albumProfile: {
            id: number;
            photoId: number;
        };
        cover: {
            xs: {
                src: string;
                width: number;
                height: number;
            };
            sm: {
                src: string;
                width: number;
                height: number;
            };
            md: {
                src: string;
                width: number;
                height: number;
            };
            lg: {
                src: string;
                width: number;
                height: number;
            };
            original: string;
        };
        countryId: number;
        cityId: number;
        categoryId: number;
        subcategoryId: number;
        verified: number;
        url: string;
        kind: number;
    };
    photos: {
        id: number;
        albumId: number;
        userId: number;
        unionId: number;
        photo: {
            xs: {
                src: string;
                width: number;
                height: number;
            };
            sm: {
                src: string;
                width: number;
                height: number;
            };
            md: {
                src: string;
                width: number;
                height: number;
            };
            lg: {
                src: string;
                width: number;
                height: number;
            };
            original: string;
        };
        description: string | null;
        time: number;
        likes: {
            count: number;
            canView: boolean | null;
            isLiked: boolean | null;
        };
        comments: {
            count: number;
            canView: boolean | null;
        };
        canEdit: boolean | null;
        canDelete: boolean | null;
    }[];
    audios: unknown[];
    videos: unknown[];
    flow: unknown | null;
    post: unknown | null;
}
