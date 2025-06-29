"use client";

import React, { FC } from "react";

import { Button as Btn } from "antd";

import { IButton } from "../types";

const Button: FC<IButton> = ({ name, className, onClick, type }) => {
  return (
    <>
      <Btn
        className={`${className} bg-accent border-none text-white rounded-[6px]!  text-sm`}
        onClick={onClick}
        // color="primary"
        variant="solid"
        htmlType={type}
      >
        {name}
      </Btn>
    </>
  );
};

export default Button;
