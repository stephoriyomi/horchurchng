import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24">
      <Container className="text-center">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="font-display text-5xl font-bold mb-4">Page not found</h1>
        <p className="text-warm-gray-600 text-lg mb-8 max-w-md mx-auto">
          This page doesn&apos;t exist — but you&apos;re welcome here anyway.
        </p>
        <Button href="/">Back to Home</Button>
      </Container>
    </section>
  );
}
