import './App.css';
import { Field } from './components/Field';
import { PrimaryButton } from './components/PrimaryButton';
import { currentField } from './stores/FieldStore';
import { Box, Text } from 'grommet';
import { Info } from './components/Info';
import { observer } from 'mobx-react-lite';
import { Battle } from './components/Battle';
import { currentBattle } from './stores/BattleStore';
import { GAME_STATE } from './interfaces';
import { isFieldCorrect } from './utils/utilsForField';
import { Modal } from './components/Modal';
import { useState } from 'react';

export const App = observer(() => {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <Box direction="row">
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
            <Box gap="medium">
              <Text>Вот сколько кораблей должно быть на поле:</Text>
              <Box style={{ marginLeft: "25px"}}>
                <Text>Кораблей на поле: 10</Text>
                <Text>Кораблей размера 4: 1</Text>
                <Text>Кораблей размера 3: 2</Text>
                <Text>Кораблей размера 2: 3</Text>
                <Text>Кораблей размера 1: 4</Text>
              </Box>
              <Text>Поставьте корабли правильно — и сможете начать игру.</Text>
              <PrimaryButton
                label="Закрыть окно"
                onClick={() => setModalOpen(false)}
                style={{alignSelf: "center"}}
              />
            </Box>
          </Modal>
        </Box>
      }
      {!currentBattle.isGameStarted && <Box direction="row" alignContent='between'>
        <Info field={currentField} />
      </Box>}
      {/* <Box>
        {
          currentField.field.map((item, rowIndex) => {
            return (
              <Box
                key={rowIndex}
                direction="row"
              >
                [{item.join(", ")}]
              </Box>
            )
          })
        }
      </Box> */}
    </div >
  );
})

export default App;
