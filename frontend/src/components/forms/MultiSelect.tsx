import React from 'react';
import { FormControl } from '@material-ui/core';
import Select from 'react-select';
import { FieldProps, getIn } from 'formik';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps extends FieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: Option[];
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  const onChange = (option) => {
    if (option) {
      form.setFieldValue(
        field.name,
        option.map((item) => item.value)
      );
    } else {
      form.setFieldValue(field.name, []);
    }
  };

  const getValue = () => {
    if (props.options) {
      return props.options.filter(
        (option) => field.value.indexOf(option.value) >= 0
      );
    }
    return [];
  };

  return (
    <FormControl fullWidth error={!!errorText}>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={props.options || []}
        label={props.label}
        placeholder={props.placeholder}
        name={props.name}
        onChange={onChange}
        value={getValue()}
      />
      <FormControl>{errorText}</FormControl>
    </FormControl>
  );
};

export default MultiSelect;
