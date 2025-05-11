import IPostFeed from './post-feed';

export default interface IGetPostsFeedResponse {
    pageParams: number[];
    pages: {
        items: IPostFeed[];
        count: number;
    }[];
}
