interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, type = "button", ...rest }) => {
    return (
        <button
            type={type}
            {...rest} // here you can pass any other props
            className={`cursor-pointer px-4 py-2 font-medium first-letter:uppercase rounded-lg bg-primary-base border border-gray-base text-black-solid 
                  text-center transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]
                  ${rest.className || ""}`}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;


{/*
==================== EXAMPLES =====================

 <SecondaryButton onClick={() => console.log("Clicked!")}>
    Click Me
</SecondaryButton>


<SecondaryButton className="w-full" onClick={submitForm}>
  Submit
</SecondaryButton> 
*/}
