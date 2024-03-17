"use client";

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useDynamicContext } from "@/lib/dynamic";
import { createSafe } from "@instadapp/avocado";

import Loading from "@/components/loading-page";
import Login from "@/components/login-page";

export interface IAvocadoContext {
  connected?: boolean;
  setConnected?: any;
  safe: any;
}

export const AvocadoContext = createContext<IAvocadoContext>({
  connected: false,
  setConnected: () => {},
  safe: "",
});

export function useAvocado() {
  return useContext(AvocadoContext);
}

export interface IAvocadoProvider {
  children: ReactNode;
}

export function AvocadoProvider({ children }: IAvocadoProvider) {
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [safe, setSafe] = useState<any>("");

  const { primaryWallet, user } = useDynamicContext();

  useEffect(() => {
    if (primaryWallet === null || !user) {
      setLoading(true);
      setConnected(false);
      setLoading(false);
      return;
    }
    async function setAvocado() {
      setLoading(true);
      const connector = primaryWallet!.connector;
      const signer = await connector!.ethers?.getSigner();
      setSafe(createSafe(signer));
      setLoading(false);
      setConnected(true);
    }
    setAvocado();
  }, [primaryWallet, user]);

  const contextProvider = {
    connected,
    setConnected,
    safe,
  };
  return (
    <AvocadoContext.Provider value={contextProvider}>
      {loading ? <Loading /> : connected ? children : <Login />}
    </AvocadoContext.Provider>
  );
}
