"use client"

import dynamic from 'next/dynamic';
import { ReactNode } from "react";

const LazyAvocadoProvider = dynamic(
  () => import('./avocadoProvider').then((mod) => mod.AvocadoProvider),
  { ssr: false }
);

interface IAvocadoProvider {
  children?: ReactNode;
}

export const AvocadoProvider = ({ children }: IAvocadoProvider) => {
  return <LazyAvocadoProvider>{children}</LazyAvocadoProvider>;
};