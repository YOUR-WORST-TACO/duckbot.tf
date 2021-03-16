import * as axios from 'axios';

export const getInventory = (app_id, steam_id, context_id, count?, all?) => {
    return new Promise((resolve, reject) => {
        if (typeof app_id !== 'number') {
            throw "app_id must be a number";
        }
        if (typeof steam_id !== 'string') {
            throw "steam_id must be a string";
        }
        if (!context_id) {
            throw "context_id must be provided";
        }
        if (typeof context_id === 'string') {
            context_id = parseInt(context_id);
        }
        if (count) {
            if (typeof count !== 'number') {
                throw "count must be a number";
            }
            if (count > 2000) {
                throw "count cannot be larger than 2000";
            }
        }
        axios.get({})
    })
}
