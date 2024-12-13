import './App.css';
import { FieldView } from './FieldView';
import { PrimaryButton } from './PrimaryButton';
import { currentField } from './Field';
import { Box } from 'grommet';
import { Info } from './Info';

export const App = ()=> {

  return (
    <div className="App">
      <Box direction="row">
        <FieldView />
        <Box justify="center">
          <Box width="35px"></Box>
          <PrimaryButton
            onClick={() => {
              currentField.addShip(Math.ceil(Math.random() * 4))
            }}
            label="Добавить корабль"
          />
          <PrimaryButton
            onClick={() => {
              currentField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1])
            }}
            label="Добавить 4-3-3-2-2-2-1-1-1-1"
          />
          <PrimaryButton
            onClick={() => {
              currentField.clearField()
            }}
            label="Очистить поле"
          />
        </Box>
      </Box>
      <Info/>
    </div>
  );
}

export default App;
