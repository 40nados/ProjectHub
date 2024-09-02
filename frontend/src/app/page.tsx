"use client"
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-black">
      <img src="https://i.imgur.com/nA08KOc.png" alt="logo" width={'500px'} height={'auto'} />
      <div>
        <Button className="bg-green-400" onClick={() => {console.log('clicado')}}>Logar</Button>
      </div>
    </main>
  );
}
