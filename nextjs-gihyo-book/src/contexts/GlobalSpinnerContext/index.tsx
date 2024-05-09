import React, { useState, useContext, createContext } from 'react'

const GlobalSpinnerContext = createContext(false)
const GlobalSpinnerActionsContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {})

// スピナーの表示・非表示を返す関数
export const useGlobalSpinnerContext = () => useContext(GlobalSpinnerContext)

// スピナーの表示・非表示を変更する関数
export const useGlobalSpinnerActionsContext = () =>
  useContext<React.Dispatch<React.SetStateAction<boolean>>>(
    GlobalSpinnerActionsContext,
  )

interface GlobalSpinnerProviderProps {
  children?: React.ReactNode
}

const GlobalSpinnerContextProvider = ({
  children,
}: GlobalSpinnerProviderProps) => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false)

  return (
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
        {children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider
