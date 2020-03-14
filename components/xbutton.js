import React from 'react';
import { connect }  from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function XButton(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    }
    
    const handleClose = () => {
      setOpen(false);
    }

    const handleOK = () => {
      props.deleteNote(props.id);
      setOpen(false);
    }

    return (
        <>
        <div className="xbutton">
            <div className="contents" onClick={ handleClickOpen }>
              <span>&#215;</span>
            </div>
        </div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={ handleClose }
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        
          <DialogTitle id="alert-dialog-slide-title">{"Delete this memo?"}</DialogTitle>
        
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this memo?
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={() => handleOK()} color="primary">OK</Button>
          </DialogActions>

        </Dialog>
        <style jsx>
        {`
          div.xbutton {
            position: relative;    
          }
          .contents {
            position: absolute;
            left: 2px;
            top: 2px;
            background-color: transparent;
            color: #5e7a87;
            border-radius: 10px;
            cursor: pointer;
          }
          span {
            font-family: 'Roboto','Helvetica Neue', Helvetica, sans-serif;
            padding: 5px;
            font-size: 1.0em;
            line-height: 100%;
          }
          .contents:hover {
            color: #2a363c;
          }
          .contents:active {
            color: #fff;
          }
          @media only screen and (max-width: 600px) {
            span {
              font-size: 1.1em;
              padding: 6px 5px 5px 4px;
            }
          }
        `}
        </style>
        </>
    )
}

const deleteNote = (id) => {
  return {
    type: 'DELETE_MEMO',
    payload: id
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.memo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (id) => {
      dispatch(deleteNote(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(XButton);
