import { createContext, useContext, useState } from "react";

const SelectionContext = createContext<any>(null);

export function SelectionProvider({ children }: any) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const clear = () => setSelected([]);

  return (
    <SelectionContext.Provider value={{ selected, toggle, clear }}>
      {children}
    </SelectionContext.Provider>
  );
}

export const useSelection = () => useContext(SelectionContext);
