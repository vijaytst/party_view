import React from 'react';
import { useField } from 'formik';

const TextArea = ({ noMargin, type, id, label, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className={`relative ${!noMargin && 'mt-5'}`}>
        <textarea
          type={type}
          id={id}
          {...field}
          {...props}
          autoComplete='off'
          placeholder={placeholder || ' '}
          className={`block w-full ${
            meta.touched && meta.error
              ? 'border-red-600'
              : 'border-gray-300 focus:border-primary'
          } duration-200 input-field rounded-md bg-transparent outline-none py-3 px-5 text-lg text-gray-300 border focus:shadow-md`}
        ></textarea>
        <label
          htmlFor={id}
          className='top-0 z-10 h-full duration-200 absolute flex items-center w-full px-5 text-base text-gray-300'
        >
          {label}
        </label>
      </div>
      {meta.touched && meta.error && (
        <small className='text-red-600 mt-2'>{meta.error}</small>
      )}
    </div>
  );
};

export default TextArea;
