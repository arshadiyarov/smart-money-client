// import { CoinType } from "@/entities/coin/coin";
// import { ReactNode, useContext, createContext } from "react";
//
// interface CoinsContextProps {
//   data: CoinType;
// }
//
// interface CoinsClientProviderProps extends CoinsContextProps {
//   children: ReactNode;
// }
//
// const CoinsContext = createContext<CoinsContextProps>({
//   data,
// });
//
// const CoinsClientProvider = ({ data, children }: CoinsClientProviderProps) => {
//   return (
//     <CoinsContext.Provider value={{ data }}>{children}</CoinsContext.Provider>
//   );
// };
//
// const useCoins = () => {
//   const context = useContext(CoinsContext);
//   if (!context) {
//     throw new Error("useCoins must be used within the CoinsClientProvider");
//   }
//
//   return context;
// };
