import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

function TextMaskCpf(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCpf.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default TextMaskCpf;
