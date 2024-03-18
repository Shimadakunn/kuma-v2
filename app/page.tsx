"use client";
import dynamic from 'next/dynamic';

import { Label } from '@radix-ui/react-label';

import Loading from "@/components/loading-page";

const ServerComponent = dynamic(() => import('./ssr'),
 { ssr: false,
  loading: () => <Loading/>
  }
);

export default function Home() {

  return (
    <ServerComponent />
  );
}