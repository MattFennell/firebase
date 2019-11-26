import { functionToCall } from '../api/api';

export const submitVideo = request => functionToCall('submitHighlightForApproval')(request);
export const getHighlights = request => functionToCall('getHighlights')(request).then(response => response.data);
export const upvoteHighlight = request => functionToCall('upvoteHighlight')(request).then(response => response.data);
export const downvoteHighlight = request => functionToCall('downvoteHighlight')(request).then(response => response.data);
