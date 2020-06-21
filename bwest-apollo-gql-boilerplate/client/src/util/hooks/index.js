// Custom Hook
import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    e.persist();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export const useFormFile = (callback, initialState = {}, initialFile = {}) => {
  const [values, setValues] = useState(initialState);
  const [files, setFiles] = useState(initialFile);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    onChangeFile,
    values,
    files,
  };
};

export const useFile = (callback, initialFile = {}) => {
  const [files, setFiles] = useState(initialFile);

  const onChangeFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChangeFile,
    onSubmit,
    files,
  };
};
