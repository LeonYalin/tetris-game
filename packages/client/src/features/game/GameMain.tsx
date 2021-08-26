import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { selectGameState } from '../../store/selectors/game.selectors';
import { useAppDispatch, useAppState } from '../../store/StoreProvider';
import GameCenterSection from './GameCenterSection';
import GameLeftSection from './GameLeftSection';
import GameRightSection from './GameRightSection';
import { gameManager } from '@tetris-game/lib/src';
import * as gameActions from '../../store/actions/game.actions';
import { useEffect } from 'react';

export interface GameConfig {
  cellSize: number;
}

export const config: GameConfig = {
  cellSize: 30,
};

const useStyles = createUseStyles({
  wrapper: {
    height: 'calc(100% - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWrapper: {
    width: '600px',
    height: '600px',
    display: 'grid',
    gridTemplateAreas: `
    'left center right'
    `,
    gridTemplateColumns: '150px 300px 150px',
    gridTemplateRows: '600px',
  },
  left: {
    gridArea: 'left',
  },
  center: {
    gridArea: 'center',
  },
  right: {
    gridArea: 'right',
  },
});

function GamePage() {
  const dispatch = useAppDispatch();
  const { board, level, score, next } = selectGameState(useAppState());
  const classes = useStyles();

  useEffect(() => {
    document.addEventListener('keydown', e => {
      gm.handleKeyboardEvent(e.keyCode);
    });

    const gm = gameManager.getInstance();
    gm.startGame();
    gm.gameState$.subscribe(data => {
      // console.log(data);
      setTimeout(() => {
        dispatch(gameActions.setGameState(data));
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.gameWrapper}>
        <div className={classes.left}>
          <GameLeftSection level={level} score={score}></GameLeftSection>
        </div>
        <div className={classes.center}>
          <GameCenterSection board={board} config={config}></GameCenterSection>
        </div>
        <div className={classes.right}>
          <GameRightSection config={config} next={next}></GameRightSection>
        </div>
      </div>
    </div>
  );
}

export default memo(GamePage);
