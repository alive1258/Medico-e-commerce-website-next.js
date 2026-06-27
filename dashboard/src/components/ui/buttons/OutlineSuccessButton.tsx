interface OutlineSuccessButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const OutlineSuccessButton: React.FC<OutlineSuccessButtonProps> = ({ children, ...rest }) => {
    return (
        <button
            {...rest} // here you can pass any other props
            className={`cursor-pointer text-xs px-3 py-1.5 rounded-lg 
                        bg-success-base/20 hover:bg-success-base/15 border border-success-base text-success-base 
                        text-center hover:shadow-[0_0_10px_rgba(16,185,129,0.8)]
                    ${rest.className || ""}`}
        >
            {children}
        </button>
    );
};

export default OutlineSuccessButton;


{/*
==================== EXAMPLES =====================

 <OutlineSuccessButton onClick={() => console.log("Clicked!")}>
    Click Me
</OutlineSuccessButton>


<OutlineSuccessButton className="w-full" onClick={submitForm}>
  Submit
</OutlineSuccessButton> 
*/}
