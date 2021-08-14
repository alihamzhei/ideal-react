function reducer(state = [], action) {
    switch (action.type) {
        case 'CREATE_GROUPE':
            return [
                ...state,
                {
                    name: action.text, id: action.id, links: []
                }
            ]
        case 'CREATE_LINK':

            let newState = state.filter(item => {
                if (item.id == action.group_id) {
                    item.links = [...item.links, { id: action.id, title: action.title, link: action.link, group_id: action.group_id }]

                }
                return item;
            })
            return newState;
        case 'SORT_CHILD':
            let newS = state.filter(item => {

                let newGroup = action.data.filter(child => {

                    if (item.id == child.group_id) {
                        item.links = action.data;
                    }

                    return item;
                })
                return newGroup;

            })

            return newS;
        case 'SET_LINK_GROUPE':

            return action.data;
        case 'DELETE_LINK':
            return state.filter(item => item.id != action.id ? item : false)
        case 'EDIT_LINK':
            return state.filter(item => {
                if (item.id == action.id) {
                    item.name = action.name;
                }
                return item;

            }
            )
        default:
            return state;
    }
}
export default reducer;