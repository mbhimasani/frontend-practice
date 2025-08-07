'use client';

import styles from './input.module.css';

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

  // need to add validation
  return (
    <div>
      <input
        {...props}
        className={styles.common}
      />
    </div>
  )
}

export default Input;