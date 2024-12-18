import './App.css';
import { FieldView } from './FieldView';
import { PrimaryButton } from './PrimaryButton';
import { currentField } from './Field/Field';
import { Box } from 'grommet';
import { Info } from './Info';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {

  return (
    <div className="App">
      <Box direction="row">
        <FieldView />
        {!currentField.game && <Box justify="center">
          <Box width="35px"></Box>
          <PrimaryButton
            onClick={() => {
              currentField.addShip(Math.ceil(Math.random() * 4))
            }}
            label="Добавить корабль"
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
      {currentField.game ?
        <PrimaryButton
          onClick={() => {
            currentField.game = false;
            currentField.clearField();
          }}
          label="Закончить игру"
          size="large"
        /> :
        <PrimaryButton
          onClick={() => {
            currentField.game = true;
            currentField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
          }}
          label="Начать игру"
          size="large"
        />
      }
      <Box direction="row">
        <Info />
        {currentField.game && <Info dead />}
      </Box>
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
