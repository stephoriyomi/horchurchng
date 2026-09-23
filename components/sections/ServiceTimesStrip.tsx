import { Container } from "@/components/ui/Container";
import services from "@/config/services.json";

export function ServiceTimesStrip() {
  const service = services[0];
  if (!service) return null;

  return (
    <div className="bg-primary text-white" role="complementary" aria-label="Service times">
      <Container>
        <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-7 text-center text-sm">
          <span className="font-semibold">
            {service.day}s at {service.time}
          </span>
          <Pipe />
          <span>
            {service.location} · {service.address.city}, {service.address.country}
          </span>
          <Pipe />
          <a
            href={service.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 hover:text-accent-gold transition-colors"
          >
            Get Directions →
          </a>
        </div>
      </Container>
    </div>
  );
}

function Pipe() {
  return <span className="hidden sm:block w-px h-4 bg-white/30" aria-hidden />;
}
