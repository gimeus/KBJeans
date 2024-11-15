import { createContext, useContext, useState, ReactNode } from 'react';

interface AreaContextProps {
  selectedArea: string;
  depositAmount: string;
  setSelectedArea: (area: string, amount: string) => void;
}

const AreaContext = createContext<AreaContextProps | undefined>(undefined);

export const AreaProvider = ({ children }: { children: ReactNode }) => {
  const [selectedArea, setSelectedArea] = useState<string>(
    localStorage.getItem('selectedArea') || '면적 선택'
  );
  const [depositAmount, setDepositAmount] = useState<string>(
    localStorage.getItem('depositAmount') || '면적 선택 시 예상 예치금 안내'
  );

  const updateArea = (area: string, amount: string) => {
    setSelectedArea(area);
    setDepositAmount(amount);
    localStorage.setItem('selectedArea', area);
    localStorage.setItem('depositAmount', amount);
  };

  return (
    <AreaContext.Provider
      value={{ selectedArea, depositAmount, setSelectedArea: updateArea }}
    >
      {children}
    </AreaContext.Provider>
  );
};

export const useArea = () => {
  const context = useContext(AreaContext);
  if (!context) {
    throw new Error('useArea must be used within an AreaProvider');
  }
  return context;
};
