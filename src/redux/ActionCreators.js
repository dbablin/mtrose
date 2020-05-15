import * as ActionTypes from './ActionTypes';

export const addComment = (roomId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        roomId: roomId,
        rating: rating,
        author: author,
        text: text
    }
});