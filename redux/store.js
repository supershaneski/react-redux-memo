import { createStore, combineReducers } from 'redux';
import Immutable, { Record } from 'immutable';
import Lib from '../lib/utils';

const initialMemo = () => {
    return {
        data: [],
    }
}

const setMemo = (state, action) => {
    Lib.saveToLocalStorage('my-memo', action.payload);
    
    return {
        ...state,
        data: action.payload
    }
}

const addMemo = (state, action) => {
    let list = state.data.splice(0);
    
    const item = action.payload;
    
    const now = new Date(item.date);
    const sdate = now.getDate();
    const smonth = 1 + parseInt(now.getMonth());
    const syear = now.getFullYear();
    
    const prevAngle = list[list.length - 1].angle;
    var angle = (prevAngle > 0)?Lib.getRandomInt(-10, -3):Lib.getRandomInt(3, 10);

    const id = Lib.getSimpleId();
    list.push({
        id: id,
        date: `${syear}-${smonth}-${sdate}`,
        title: item.title,
        text: item.text,
        color: item.color,
        font: item.font,
        angle: angle
    })
    
    Lib.saveToLocalStorage('my-memo', list);

    return {
        ...state,
        data: list
    }
}

const deleteMemo = (state, action) => {
    const id = action.payload;
    const newlist = state.data.filter(memo => {
        return memo.id.indexOf(id) < 0;
    })
    
    Lib.saveToLocalStorage('my-memo', newlist);
    
    return {
        ...state,
        data: newlist
    }
}

const memo = (state = initialMemo(), action) => {
    switch (action.type) {
        case 'INIT_MEMO':
            return setMemo(state, action);
        case 'ADD_MEMO':
            return addMemo(state, action);
        case 'DELETE_MEMO':
            return deleteMemo(state, action);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    memo,
});

export default createStore(rootReducer);