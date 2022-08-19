export const initialState = null;
export const reducer = (state, action) => {
    if (action.type === "MANAGER") {
        return action.payload;
    } else {
        return state;
    }
}