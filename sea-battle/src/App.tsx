import './App.css';
import { FieldView } from './FieldView';
import { PrimaryButton } from './PrimaryButton';
import { map } from './Field';

function App() {
  
  return (
    <div className="App">
      <FieldView/>
      <PrimaryButton
        onClick={() => map.addShip(Math.round(Math.random() * 4))}
        label="Очистить поле"
      />
    </div>
  );
}

export default App;
