import React from 'react';
import { connect }  from 'react-redux';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles, withStyles  } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textTitle: {
        width: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectItem: {
        width: 150,
    },
    selectItemLong: {
        width: 175,
    }
});

class AddMemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            open: false,
            color: 'cornsilk',
            font: 0,
            date: new Date(),
            error: false,
        }
    }
    
    handleFontChange = event => {
        this.setState({
            font: event.target.value
        })
    };

    handleChange(event) {
        this.setState({
            color: event.target.value
        })
    }

    handleClickOpen() {
        this.resetState(true);
    };

    handleClose() {
        this.resetState(false);
    };

    resetState(flag) {
        this.setState({
            open: flag,
            title: "",
            text: "",
            color: 'cornsilk',
            font: 0,
            date: new Date(),
        })
    }

    handleAdd() {
        
        if(this.state.text.length === 0) {
            this.setState({
                error: true
            })
        } else {
            
            this.props.addNewMemo({
                title: this.state.title,
                text: this.state.text,
                color: this.state.color,
                font: this.state.font,
                date: this.state.date,
            })
    
            this.setState({
                open: false
            })
        }
        
    };

    handleTitle(event) {
        var stitle = event.target.value;
        stitle = (stitle.length > 24)?stitle.substr(0, 24):stitle;
        this.setState({
            title: stitle
        })
    }

    handleText(event) {
        var stext = event.target.value;
        stext = (stext.length > 64)?stext.substr(0, 64):stext;
        this.setState({
            text: stext,
            error: (event.target.value.length > 0)?false:true,
        })
    }

    handleDateChange(date) {
        this.setState({
            date: date,
        })
    }

    render() {
        const { classes } = this.props;
        const sErrorMsg = (this.state.error)?'You need to put message.':'max 64 chars';
        return (
            <>
            <div className="control-panel">
            
            <Fab onClick={this.handleClickOpen.bind(this)} color="secondary" aria-label="add">
                <AddIcon />
            </Fab>

            <Dialog 
                fullWidth={true}
                maxWidth={'md'}
                open={this.state.open} 
                onClose={this.handleClose.bind(this)} 
                aria-labelledby="form-dialog-title"
            >

                <DialogTitle id="form-dialog-title">New Memo</DialogTitle>
                
                <DialogContent>

                <DialogContentText>What do you want to write?</DialogContentText>
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        KeyboardButtonProps={{
                            'aria-label': 'select date',
                        }}
                        value={this.state.date}
                        onChange={this.handleDateChange.bind(this)}
                    />
                    </Grid>                    
                </MuiPickersUtilsProvider>

                <TextField
                    className={classes.textTitle}
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleTitle.bind(this)}
                    helperText="max 24 chars"
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Note"
                    type="text"
                    value={this.state.text}
                    onChange={this.handleText.bind(this)}
                    error={this.state.error}
                    helperText={sErrorMsg}
                    fullWidth
                />

                <div className="select-container">
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.color}
                        onChange={this.handleChange.bind(this)}
                        className={classes.selectItem}
                    >
                        <MenuItem value={'cornsilk'}>Default</MenuItem>
                        <MenuItem value={'aquamarine'}>Aquamarine</MenuItem>
                        <MenuItem value={'greenyellow'}>Green Yellow</MenuItem>
                        <MenuItem value={'khaki'}>Khaki</MenuItem>
                        <MenuItem value={'lightpink'}>Light Pink</MenuItem>
                        <MenuItem value={'lightsalmon'}>Light Salmon</MenuItem>
                        <MenuItem value={'palegreen'}> Pale Green</MenuItem>
                        <MenuItem value={'powderblue'}>Powder Blue</MenuItem>
                    </Select>
                </div>
                
                <div className="select-container">
                    <InputLabel id="font-simple-select-label">Font</InputLabel>
                    <Select
                        labelId="font-simple-select-label"
                        id="font-simple-select"
                        value={this.state.font}
                        onChange={this.handleFontChange.bind(this)}
                        className={classes.selectItemLong}
                    >
                        <MenuItem value={0}>Default</MenuItem>
                        <MenuItem value={1}>Comic Sans</MenuItem>
                        <MenuItem value={2}>Courier</MenuItem>
                        <MenuItem value={3}>Times New Roman</MenuItem>
                    </Select>
                </div>
                
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAdd.bind(this)} color="primary">
                        Add Memo
                    </Button>
                </DialogActions>

            </Dialog>

        </div>
        <style jsx>
        {`
        .control-panel {
            position: fixed;
            bottom: 15px;
            right:15px;
            z-index: 2;
        }
        .select-container {
            display: inline-block;
            margin-top: 15px;
            margin-right: 20px;
        }
        `}
        </style>
            </>
        )
    }
}

const addNewMemo = (memo) => {
    return {
      type: 'ADD_MEMO',
      payload: memo
    }
}
  
const mapStateToProps = (state) => {
    return {
      ...state.memo
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      addNewMemo: (memo) => {
        dispatch(addNewMemo(memo));
      }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddMemo));