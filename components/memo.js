import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import XButton from './xbutton';

const useStyles = makeStyles(theme => ({
    note: {
        width: '100%',
        height: '100%',
    },
}));

const getFontFamily = (index) => {
    switch(index) {
        case 1:
            return '"Comic Sans MS", cursive, sans-serif';
        case 2:
            return '"Courier New", Courier, monospace';
        case 3:
            return '"Times New Roman", Times, serif';
        default:
            return '"Roboto","Helvetica Neue", Helvetica, sans-serif';
    }
}

const getWeekDay = (date) => {
    const weekday = [
        "Sun", 
        "Mon", 
        "Tue", 
        "Wed", 
        "Thu", 
        "Fri", 
        "Sat"
    ];
    return weekday[date.getDay()];
}

export default function Memo(props) {
    
    const classes = useStyles();
    
    const odate = new Date(props.date);
    var sdate = parseInt(odate.getDate());
    sdate = (sdate < 10)?'0'+sdate:sdate;
    var smonth = (1 + parseInt(odate.getMonth()));
    smonth = (smonth < 10)?'0'+smonth:smonth;
    const syear = odate.getFullYear();
    const sday = getWeekDay(odate);
    const strdate = `${sday} ${syear}/${smonth}/${sdate}`;
    
    const stitle = props.title;
    const sangle = props.angle;
    const scolor = props.color || 'cornsilk';
    const sfont = getFontFamily(props.font);

    return (
        <>
        <div className="item">
            <div className="contents">
                <Paper style={{
                    fontFamily: sfont,
                    backgroundColor: scolor, 
                }} className={classes.note} elevation={3}>
                <div className="delete-button">
                    <XButton id={ props.id } />
                </div>
                <div className="note-date">{ strdate }</div>
                <h4 className="note-title">{ stitle }</h4>
                <div className="note-text">
                {
                props.children
                }
                </div>
                </Paper>
            </div>
        </div>
        <style jsx>
        {`
        .item {
            background-color: transparent;
        }
        .contents {
            width: 100%;
            height: 100%;
            transform: rotate(${sangle}deg);
            transition: 0.2s;
        }
        .delete-button {
            position: relative;
            z-index: 5;
            display: none;
        }

        .note-date {
            font-size: 0.8em;
            color: #455a64;
            text-align: right;
            padding: 8px 8px 0px 8px;
        }
        .note-title {
            font-size: 1.1em;
            color: #2a363c;
            padding: 5px 8px 5px 8px;
            margin: 0px;
        }
        .note-text {
            margin: 0px;
            padding: 0px 8px 0px 8px;
            font-size: 0.9em;
            color: #455a64;
            overflow: hidden;
            min-height: 88px;
        }

        .contents:hover {
            transform: rotate(0deg);
            transform: scale(1.2);
        }
        .contents:hover .delete-button{
            display: block;
        }

        @media only screen and (max-width: 600px) {
            .note-date {
                font-size: 1.0em;
                padding: 10px 10px 0px 10px;
            }
            .note-title {
                font-size: 1.3em;
                padding: 8px 10px 8px 10px;
                margin: 0px;
            }
            .note-text {
                font-size: 1.1em;
                padding: 0px 10px 0px 10px;
                margin: 0px;
            }
        }
        `}
        </style>
        </>
    )
}

Memo.defaultProps = {
    font: 0,
    title: 'Untitled',
    angle: -7,
    color: 'cornsilk',
}