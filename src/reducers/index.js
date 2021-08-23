import { combineReducers } from "redux";
import themeReducer from './themeReucer';
import LinkReducer from './LinkReducer';
import Upload from './Upload';
import PortofiloReucer from './PortofiloReducer';
import PostCategory from './CateGoryPost';
import PostReducer from './PostReducer';

let reducer = combineReducers({
    theme: themeReducer,
    links: LinkReducer,
    files: Upload,
    portofilos: PortofiloReucer,
    post_category : PostCategory,
    posts : PostReducer
})

export default reducer;