import { useState } from 'react';
// import { otro_backend } from 'declarations/otro_backend';
import * as otro_backend from "declarations/otro_backend";
import logo from "../public/dfinity.svg"

import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import { useCanister, useConnect } from "@connect2ic/react";

import "@connect2ic/core/style.css"

function App() {
  const [areas, setAreas] = useState('');
  const [areasICP] = useCanister("otro_backend");


  async function  handleSubmit(event) {
    event.preventDefault();
    // const name = event.target.elements.name.value;
    const areas = await areasICP.obtieneAreas();
    console.log(areas);
    return false;
  }

  

  return (
   
    <main>
       <div className="min-h-screen">
        <header className="relative flex justify-start items-center p-4 border-b border-gray-600">
          <img src={logo} width="80" alt="logo" />
          <div className="absolute top-2 right-2">
            <ConnectButton />
          </div>
        </header>
        <ConnectDialog />
        {/* <IcpSocial /> */}
      </div>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting"></section>
    </main>
  );

  
}

const client = createClient({
  canisters: {
    otro_backend,
  },
  providers: [
    new InternetIdentity({ providerUrl: "http://127.0.0.1:8000/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai" })
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: true,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
