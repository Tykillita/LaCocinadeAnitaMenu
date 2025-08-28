import React from 'react';

/**
 * Props for the Card component.
 */
interface CardProps {
  /**
   * The content to be rendered inside the card.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes to apply to the card.
   */
  className?: string;
  /**
   * Optional click handler for the card.
   */
  onClick?: () => void;
}

/**
 * A customizable Card component for displaying content within a styled container.
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the card.
 * @param {() => void} [props.onClick] - Optional click handler for the card.
 * @returns {JSX.Element} The rendered card component.
 */
export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`backdrop-blur-sm border border-amber-200 rounded-xl p-6 shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};