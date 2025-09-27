import React from "react";

interface HeaderProps {
   title?: string;
   subtitle?: string;
}

const Header : React.FC<HeaderProps> = 
({ title = "Default Title", subtitle = "Default Subtitle" }) => {
   return (
      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
         <h1>{title}</h1>
         <h2>{subtitle}</h2>
      </div>
   );
}

export { Header };
