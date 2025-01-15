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
        {currentBattle.game ? <BattleView / > : <Field viewField = {currentField} />}
         {!currentBattle.game && <Box justify="center">
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
      {currentBattle.game ?
        <Box direction="row">
          <PrimaryButton
            onClick={() => {
              currentBattle.user.shotCount = 0;
              currentBattle.user.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
              currentBattle.opponent.shotCount = 0;
              currentBattle.opponent.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
            }}
            label="Сыграть еще"
            size="large"
          />
          <PrimaryButton
            onClick={() => {
              currentBattle.game = false;
              currentBattle.user.shotCount = 0;
              currentBattle.user.clearField();
              currentBattle.opponent.shotCount = 0;
              currentBattle.opponent.clearField();
            }}
            label="Закончить игру"
            size="large"
          />
        </Box> :
        <PrimaryButton
          onClick={() => {
            currentBattle.game = true;
            currentBattle.user.clearField();
            currentBattle.opponent.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1])
            currentField.clearField()
          }}
          label="Начать игру"
          size="large"
        />
      }
      {!currentBattle.game && <Box direction="row" alignContent='between'>
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
