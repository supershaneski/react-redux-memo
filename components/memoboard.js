import React,{ useEffect } from 'react';
import { connect }  from 'react-redux';
import Memo from './memo';

function MemoBoard(props){
    
    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
    })

    //const memos = props.data;
    const memos = props.list.memos;
    
    return (
        <>
        <div className="container">
            {
                memos.map((item, index) => {
                    
                    const id = item.get('id');
                    const title = item.get('title');
                    const date = item.get('date');
                    const angle = item.get('angle');
                    const color = item.get('color');
                    const font = item.get('font');
                    const textContent = item.get('text');

                    return (
                        <Memo key={index}
                            id={id}
                            title={title} 
                            date={date}
                            angle={angle}
                            color={color}
                            font={font}  
                        >
                        { textContent }
                        </Memo>
                    )
                })
            }
        </div>
        <style jsx>
        {`
        .container {
            background-color: transparent;
            display: grid;
            grid-template-columns: repeat(auto-fill, 150px);
            grid-auto-rows: 150px;
            grid-gap: 8px 8px;
            justify-content: center;
            padding: 10px;
            z-index: 1;
        }
        
        @media only screen and (max-width : 600px) {
            .container {
                grid-template-columns: repeat(auto-fill, 200px);
                grid-auto-rows: 200px;
                grid-gap: 10px 10px;
            }
        }
        `}
        </style>
        </>
    )    
}


const mapStateToProps = (state) => {
    return {
      ...state.memo
    }
}

export default connect(mapStateToProps)(MemoBoard);