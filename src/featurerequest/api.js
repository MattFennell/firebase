import { functionToCall } from '../api/api';

export const submitFeature = request => functionToCall('submitFeature')(request);

export const addCommentToFeature = request => functionToCall('addCommentToFeature')(request);
export const addReplyToComment = request => functionToCall('addReplyToComment')(request);
