import { createStore, combineReducers } from 'redux';
import Immutable, { Record } from 'immutable';
import Lib from '../lib/utils';

class MemoList extends Record({
    memos: Immutable.List()
}) {
    initMemo(memos) {
        return this.set('memos', Immutable.fromJS(memos));
    }
    addMemo(memo) {
        const newmap = Immutable.fromJS(memo);
        const list = this.memos.push(newmap);
        return this.set('memos', list);        
    }
    removeMemo(id) {
        const list = this.memos.filter(item => {
            const _id = item.get('id');
            return (_id.indexOf(id) < 0)
        })
        return this.set('memos', list);
    }
    getLastMemo() {
        return this.memos.last();
    }
}

const initialMemo = () => {
    return {
        list: new MemoList()
    }
}

const setMemo = (state, action) => {
    Lib.saveToLocalStorage('my-memo', action.payload);
    
    return {
        ...state,
        list: state.list.initMemo(action.payload)
    }
}

const addMemo = (state, action) => {
    
    const item = action.payload;
    const now = new Date(item.date);
    const sdate = now.getDate();
    const smonth = 1 + parseInt(now.getMonth());
    const syear = now.getFullYear();
    
    const lastItem = state.list.getLastMemo();
    const prevAngle = lastItem.get('angle'); //list[list.length - 1].angle;
    var angle = (prevAngle > 0)?Lib.getRandomInt(-10, -3):Lib.getRandomInt(3, 10);

    const id = Lib.getSimpleId();
    const newlist = state.list.addMemo({
        id: id,
        date: `${syear}-${smonth}-${sdate}`,
        title: item.title,
        text: item.text,
        color: item.color,
        font: item.font,
        angle: angle
    })
    
    Lib.saveToLocalStorage('my-memo', newlist.toJS().memos);

    return {
        ...state,
        list: newlist
    }
}

const deleteMemo = (state, action) => {
    
    const id = action.payload;
    const newlist = state.list.removeMemo(id);
    Lib.saveToLocalStorage('my-memo', newlist.toJS().memos);

    return {
        ...state,
        list: newlist,
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