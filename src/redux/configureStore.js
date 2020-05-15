import { createStore, combineReducers } from 'redux';
import { Rooms } from './rooms';
import { Comments } from './comments';
import { Amenities } from './amenities';
import { RecreationItems } from './recreationItems';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            rooms: Rooms,
            comments: Comments,
            amenities: Amenities,
            recreationItems: RecreationItems
        })
    );
    return store;
}