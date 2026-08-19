import clsx from 'clsx'
import styles from './BasicButton.module.css'

function BasicButton({
    children,
    type = 'button',
    as = 'button',
    variant = 'primary',
    href,
    onClick,
    disabled = false,
    className

}) {
    const Component = as

    return (
        <Component 
            // className={`${styles.btn} ${variant && styles[variant]}`}
            className={clsx(
                styles.base, 
                styles[variant],
                className
            )}
            type={as === 'button' ? type : undefined}
            href={as === 'a' ? href : undefined}
            onClick={onClick}
            disabled={as === 'button' ? disabled : undefined}
        >
            {children}
        </Component>
    )
}

export default BasicButton;