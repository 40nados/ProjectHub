import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <h1>Hello World</h1>
            <img src="/logos/PH Branco.png" alt="teste" width="100px" />
            <img src="/logos/PH Preto.png" alt="teste" width="100px" />

            <Button variant="destructive">Button</Button>
        </main>
    );
}
