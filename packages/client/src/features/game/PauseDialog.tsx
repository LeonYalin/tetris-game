import { Button, Dialog } from '@material-ui/core';
import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';

const useStyles = createUseStyles({
  wrapper: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    textTransform: 'uppercase',
    color: '#3f51b5',
    marginBottom: '30px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    justifyContent: 'flex-start !important',
    width: '200px',
    margin: '5px !important',
  },
});

type Props = {
  open: boolean;
  onClose: () => void;
  onResume: () => void;
  onQuit: () => void;
};

function PauseDialog({ open, onClose, onResume, onQuit }: Props) {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={classes.wrapper}>
        <div className={classes.title}>Paused</div>
        <div className={classes.content}>
          <Button
            className={classes.menuButton}
            onClick={onResume}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayCircleFilledTwoToneIcon />}
          >
            Resume
          </Button>
          <Button
            className={classes.menuButton}
            onClick={onQuit}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<ExitToAppTwoToneIcon />}
          >
            Quit
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(PauseDialog);
