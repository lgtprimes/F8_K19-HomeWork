import clsx from 'clsx';
import { useState } from 'react';
import styles from './InputField.module.css';

function InputField({ label, type, name, placeholder, extraLabel, value, onChange, required, ...props }) {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const autoComplete = type === 'email' ? 'email' : type === 'password' ? 'current-password' : undefined;

  return (
    <div className={styles.formGroup}>
      {extraLabel ? (
        <div className={styles.labelWrapper}>
          <label htmlFor={name}>{label}</label>
          {extraLabel}
        </div>
      ) : (
        <label htmlFor={name}>{label}</label>
      )}
      <div className={styles.inputGroup}>
        <input 
          autoComplete={autoComplete}
          type={inputType} 
          id={name} 
          name={name} 
          className={styles.formControl} 
          placeholder={placeholder} 
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
        {isPassword && (
          <button 
            type='button'
            className={clsx(
              styles.icon, 
              showPassword && styles.show
            )}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          />
        )}
      </div>
    </div>
  );
}

export default InputField;