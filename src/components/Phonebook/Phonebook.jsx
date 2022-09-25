import { useState } from 'react';
import InputName from './Input/Name/InputName';
import FormPhonebook from './Form/Form';
import LabelPhonebook from './Label/Label';
import InputNumber from './Input/Number/InputNumber';
import ButtonSubmit from './Button/ButtonSubmit';
const Phonebook = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'number':
        setNumber(event.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  const clickOnBtnSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  return (
    <div>
      <FormPhonebook onSubmit={clickOnBtnSubmit}>
        <LabelPhonebook title="Name">
          <InputName value={name} onChange={handleChange} />
        </LabelPhonebook>
        <LabelPhonebook title="Number">
          <InputNumber value={number} onChange={handleChange} />
        </LabelPhonebook>
        <ButtonSubmit text="Add contact" />
      </FormPhonebook>
    </div>
  );
};

export default Phonebook;
