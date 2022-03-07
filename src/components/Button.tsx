import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

// recebe propriedades de botão html + outras propriedades
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

// props = propriedades recebidas como argumentos
export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}
