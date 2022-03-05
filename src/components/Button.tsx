import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

// props = propriedades recebidas como argumentos
export function Button(props: ButtonProps) {
  return (
  <button className="button" {...props} />
  )
}
