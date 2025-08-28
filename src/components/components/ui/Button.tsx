import React from 'react';

/**
 * Props for the Button component.
 * Extends standard HTML button attributes.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * 'primary' for main actions, 'secondary' for alternative actions.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /**
   * If true, the button will take up the full width of its parent container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The size of the button.
   * 'sm' for small, 'md' for medium, 'lg' for large.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A customizable Button component.
 * Supports different variants, sizes, and full-width display.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 * @param {'primary' | 'secondary'} [props.variant='primary'] - The visual style of the button.
 * @param {boolean} [props.fullWidth=false] - If true, the button will take up the full width.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Standard HTML button attributes.
 * @returns {JSX.Element} The rendered button component.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  size = 'md',
  className = '',
  ...props
}) => {
  /**
   * Base CSS classes applied to all buttons for common styling.
   */
  const baseClasses = 'rounded-lg font-bold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';
  
  /**
   * CSS classes for different button sizes.
   */
  const sizeClasses = size === 'sm'
    ? 'px-3 py-1 text-sm'
    : size === 'lg'
      ? 'px-8 py-4 text-lg'
      : 'px-6 py-3';
  
  /**
   * CSS classes for different button variants (primary/secondary).
   */
  const variantClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white hover:shadow-lg focus:ring-amber-500'
    : 'bg-gradient-to-r from-gray-600 to-gray-800 text-white focus:ring-gray-500';
  
  /**
   * CSS class to make the button full width if `fullWidth` prop is true.
   */
  const widthClass = fullWidth ? 'w-full' : '';
  
  /**
   * Combines all calculated CSS classes.
   */
  const classes = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};