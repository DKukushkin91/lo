import {TPostsFeedContents} from '../config/posts-feed-contents';
import {TPostsFeedSpaces} from '../config/posts-feed-spaces';

export default interface IGetPostsFeedResponseParams {
    offset?: number;
    count?: number;
    space?: TPostsFeedSpaces;
    content?: TPostsFeedContents;
}
