import React from "react";
import { Input as AntInput } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { RHFInputProps } from "../types";

const InputForm: React.FC<RHFInputProps> = ({
  name,
  //   title,
  placeholder,
  className,
  type = "text",
  required,
  disabled,
  prefix,
  maxWidth,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className={`max-w-[${maxWidth}px]! w-full`}>
      {/* {title && (
        <label htmlFor={name} className="block mb-[6px] text-text text-sm font-medium">
          {title}
          {required && <span className="text-red-500">*</span>}
        </label>
      )} */}

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? "Поле обязательно" : false }}
        render={({ field }) => (
          <AntInput
            {...field}
            id={name}
            placeholder={placeholder}
            prefix={prefix}
            disabled={disabled}
            type={type}
            className={`${className} rounded-[2px]! !text-white hover:bg-[#211F29] focus:bg-[#211F29] bg-[#211F29] border-none w-full py-[8px]! ${
              error ? "border-red-500" : ""
            }`}
          />
        )}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputForm;
