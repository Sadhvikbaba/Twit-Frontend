import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  defaultValue ="",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="relative h-11 w-full min-w-[200px]">
      <input
        type={type}
        ref={ref}
        id={id}
        defaultValue={defaultValue}
        className={`peer h-full w-full border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${className}`}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        >
          {label}
        </label>
      )}
    </div>
  );
});

export default Input;
