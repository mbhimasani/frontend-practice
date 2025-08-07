'use client';

import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {

  return (
    <button
      {...props}
      className={props.disabled ? styles.disabled : styles.normal}
    >
      {children}
    </button>
  )
}

export default Button;