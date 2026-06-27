// interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     children: React.ReactNode;
// }

// const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, type = "button", ...rest }) => {
//     return (
//         <button
//             type={type}
//             {...rest} // here you can pass any other props
//             className={`cursor-pointer px-2 py-1.5 font-medium first-letter:uppercase rounded-lg bg-info-base border border-gray-base 
//                     text-center transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]
//                     ${rest.className || ""}`}
//         >
//             {children}
//         </button>
//     );
// };

// export default PrimaryButton;


// {/*
// ==================== EXAMPLES =====================

//  <PrimaryButton onClick={() => console.log("Clicked!")}>
//     Click Me
// </PrimaryButton>


// <PrimaryButton className="w-full" onClick={submitForm}>
//   Submit
// </PrimaryButton> 
// */}

// components/Button.jsx or components/ui/Button.jsx
// components/ui/Button.tsx

// components/ui/Button.tsx
import React, { type ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: LucideIcon;
  iconSize?: number;
  isLoading?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label = "BUTTON",
  icon: Icon,
  iconSize = 20,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
  gradientFrom = "#0144d6",
  gradientTo = "#03c6f7",
  fullWidth = false,
  size = "default",
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-4 text-sm",
    lg: "px-8 py-5 text-base",
  };

  const gradientStyle = {
    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={gradientStyle}
      className={`
        relative cursor-pointer text-white rounded-xl font-bold
        transition-all duration-300 shadow-[0_0_20px_rgba(1,68,214,0.3)]
        hover:shadow-[0_0_30px_rgba(3,198,247,0.5)]
        flex items-center justify-center gap-3 group overflow-hidden
        border border-blue-400/20
        hover:brightness-110
        active:scale-[0.98]
        ${fullWidth ? "w-full" : ""}
        ${sizeClasses[size]}
        ${disabled || isLoading ? "opacity-60 cursor-not-allowed hover:brightness-100 active:scale-100" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Animated Shimmer Streak */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl z-10">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className={`flex items-center justify-center gap-3 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {/* Icon */}
        {Icon && !isLoading && (
          <Icon
            size={iconSize}
            className="relative z-10 group-hover:scale-110 transition-transform duration-300"
          />
        )}
        
        {/* Text or Children */}
        {children ? (
          <span className="relative z-10 font-bold tracking-widest">
            {children}
          </span>
        ) : (
          <span className="relative z-10 font-bold tracking-widest">
            {label}
          </span>
        )}
      </div>
      
      {/* Subtle Inner Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/20 z-20" />
    </button>
  );
};

export default Button;