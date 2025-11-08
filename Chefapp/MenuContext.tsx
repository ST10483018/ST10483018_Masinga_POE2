import React, { createContext, useState } from "react";

export type Course = "starters" | "mains" | "desserts";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  course: Course;
  image?: string;
};

export const MenuContext = createContext({
  menu: [] as MenuItem[],
  setMenu: (m: MenuItem[]) => {},
});

export const MenuProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>([
    
  ]);
  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};