import { ROOMS } from '../shared/rooms';
import { COMMENTS } from '../shared/comments';
import { AMENITIES } from '../shared/amenities';
import { RECREATIONITEMS } from '../shared/recreationItems';

export const initialState = {
    rooms: ROOMS,
    comments: COMMENTS,
    amenities: AMENITIES,
    recreationItems: RECREATIONITEMS
};

export const Reducer = (state = initialState, action) => {
    return state;
};