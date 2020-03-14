import React,{ useEffect } from 'react';
import { connect }  from 'react-redux';
import Memo from './memo';

function MemoBoard(props){
    
    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
    })

    const memos = props.data;
    return (
        <>
        <div className="container">
            {
                memos.map((item, index) => {
                    return (
                        <Memo key={index}
                            id={item.id}
                            title={item.title} 
                            date={item.date}
                            angle={item.angle}
                            color={item.color}
                            font={item.font}  
                        >
                        { item.text }
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