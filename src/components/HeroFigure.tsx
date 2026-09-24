export function HeroFigure() {
  return (
    <div className="ml-auto w-full max-w-[17rem]">
      <div className="relative aspect-square overflow-hidden rounded-full border border-amber/40 shadow-[0_0_48px_rgba(61,255,154,0.28)]">
        <img
          src="/images/voice-mark.jpg"
          alt="Neon voice waveform"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
