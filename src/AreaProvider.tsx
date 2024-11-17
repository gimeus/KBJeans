import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AreaContextProps {
  selectedArea: string;
  depositAmount: string;
  setSelectedArea: (area: string, amount: string) => void;
}

const AreaContext = createContext<AreaContextProps | undefined>(undefined);

export const AreaProvider = ({ children }: { children: ReactNode }) => {
  // localStorage에서 값을 불러와 초기 상태로 설정
  const [selectedArea, setSelectedArea] = useState(
    localStorage.getItem('selectedArea') || ''
  );
  const [depositAmount, setDepositAmount] = useState(
    localStorage.getItem('depositAmount') || ''
  );

  const updateArea = (area: string, amount: string) => {
    setSelectedArea(area);
    setDepositAmount(amount);

    // localStorage에 값 저장
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
