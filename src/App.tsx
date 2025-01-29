import './App.css';
import { Field } from './components/Field';
import { PrimaryButton } from './components/PrimaryButton';
import { currentField } from './stores/FieldStore';
import { Box } from 'grommet';
import { Info } from './components/Info';
import { observer } from 'mobx-react-lite';
import { Battle } from './components/Battle';
import { currentBattle } from './stores/BattleStore';
import { GAME_STATE, WINNER } from './interfaces';
import { isFieldCorrect } from './utils/utilsForField';
import { Modal } from './components/Modal';
import { useState, useEffect } from 'react';
import { StartModal } from './components/StartModal';
import { DefeatModal, VictoryModal } from './components/VictoryModal';

export const App = observer(() => {

  const [modalOpen, setModalOpen] = useState(false);
  const [gameEndModalOpen, setGameEndModalOpen] = useState(false);
  const winner = currentBattle.winner

  const HandleModalClose = () => {
    setGameEndModalOpen(false);
    currentBattle.isGameStarted = false;
    currentBattle.moveCount = 0;
    currentBattle.userField.shotCount = 0;
    currentBattle.userField.clearField();
    currentBattle.opponentField.shotCount = 0;
    currentBattle.opponentField.clearField();
  }

  useEffect(() => {
    if (winner !== WINNER.NO_WINNER) {
      setGameEndModalOpen(true)
    }
  }, [winner])

  return (
    <div className="App">
      <Box direction="row">
        {winner === WINNER.USER ?
          <Modal open={gameEndModalOpen}>
            <VictoryModal battle={currentBattle} onClick={HandleModalClose} />
          </Modal> :
          winner === WINNER.OPPONENT ?
            <Modal open={gameEndModalOpen}>
              <DefeatModal battle={currentBattle} onClick={HandleModalClose} />
            </Modal> : ""
        }
        {currentBattle.isGameStarted ? <Battle /> : <Field viewField={currentField} />
        }
        {!currentBattle.isGameStarted && <Box justify="center">
          <Box width="35px"></Box>
          <PrimaryButton
            onClick={() => {
              currentField.gameState = GAME_STATE.INIT;
              currentField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
            }}
            label="Заполнить поле автоматически"
          />
          <PrimaryButton
            onClick={() => {
              currentField.gameState = GAME_STATE.ADD_SHIP;
            }}
            label="Заполнить поле вручную"
          />
          <PrimaryButton
            onClick={() => {
              currentField.gameState = GAME_STATE.REMOVE_SHIP;
            }}
            label="Перейти в режим удаления кораблей"
          />
          <PrimaryButton
            onClick={() => {
              currentField.gameState = GAME_STATE.INIT;
              currentField.clearField()
            }}
            label="Очистить поле"
          />
        </Box>
        }
      </Box>
      {currentBattle.isGameStarted ?
        <PrimaryButton
          onClick={() => {
            currentBattle.isGameStarted = false;
            currentBattle.moveCount = 0;
            currentBattle.userField.shotCount = 0;
            currentBattle.userField.clearField();
            currentBattle.opponentField.shotCount = 0;
            currentBattle.opponentField.clearField();
          }}
          label="Закончить игру"
          size="large"
        /> :
        <Box>
          <PrimaryButton
            onClick={() => {
              if (isFieldCorrect(currentField.shipCount)) {
                currentBattle.isGameStarted = true;
                currentBattle.moveCount = 0;
                currentBattle.userField = currentField;
                currentBattle.userField.gameState = GAME_STATE.INIT;
                currentBattle.userField.shotCount = 0;
                currentBattle.opponentField.gameState = GAME_STATE.SHOOT;
                currentBattle.opponentField.shotCount = 0;
                currentBattle.opponentField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
              } else setModalOpen(true)
            }}
            label="Начать игру"
            size="large"
          />

          <Modal
            open={modalOpen}>
            <StartModal onClick={() => setModalOpen(false)} />
          </Modal>

        </Box>
      }
      {!currentBattle.isGameStarted && <Box direction="row" alignContent='between'>
        <Info field={currentField} />
      </Box>}
    </div >
  );
})

export default App;
