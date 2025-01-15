import './App.css';
import { Field } from './Field';
import { PrimaryButton } from './PrimaryButton';
import { currentField } from './Field/FieldStore';
import { Box } from 'grommet';
import { Info } from './Info';
import { observer } from 'mobx-react-lite';
import { BattleView } from './BattleView';
import { currentBattle } from './Battle';
import { GAME_STATE } from './interfaces';

export const App = observer(() => {

  return (
    <div className="App">
      <Box direction="row">
        {currentBattle.isGameStarted ? <BattleView / > : <Field viewField = {currentField} />
        }
         {!currentBattle.isGameStarted && <Box justify="center">
          <Box width="35px"></Box>
          <PrimaryButton
            onClick={() => {
              currentField.gameState = GAME_STATE.ADD_SHIP;
              console.log("Активирован режим добавления кораблей", currentField.gameState)
            }}
            label="Перейти в режим добавления кораблей"
          />
          <PrimaryButton
            onClick={() => {
              currentField.gameState = GAME_STATE.REMOVE_SHIP;
              console.log("Активирован режим удаления кораблей", currentField.gameState)
            }}
            label="Перейти в режим удаления кораблей"
          />
          <PrimaryButton
            onClick={() => {
              currentField.gameState = GAME_STATE.INIT;
              console.log("Активирован ленивый режим", currentField.gameState)
            }}
            label="Ничего не делать"
          />
          <PrimaryButton
            onClick={() => {
              currentField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
            }}
            label="Сделать 4-3-3-2-2-2-1-1-1-1"
          />
          <PrimaryButton
            onClick={() => {
              currentField.clearField()
            }}
            label="Очистить поле"
          />
        </Box>
        }
      </Box>
      {currentBattle.isGameStarted ?
        <Box direction="row">
          <PrimaryButton
            onClick={() => {
              currentBattle.userField.shotCount = 0;
              currentBattle.userField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
              currentBattle.opponentField.shotCount = 0;
              currentBattle.opponentField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
            }}
            label="Сыграть еще"
            size="large"
          />
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
          />
        </Box> :
        <PrimaryButton
          onClick={() => {
            currentBattle.isGameStarted = true;
            currentBattle.userField = currentField;
            currentBattle.opponentField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1])
          }}
          label="Начать игру"
          size="large"
        />
      }
      {!currentBattle.isGameStarted && <Box direction="row" alignContent='between'>
        <Info field = {currentField} />
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
