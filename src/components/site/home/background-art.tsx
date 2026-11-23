import * as React from "react";

/** Soft, repeating starfield layered over the striped backdrop. */
const starFieldStyle: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(1.6px 1.6px at 42px 58px, rgba(255,255,255,0.85), transparent 100%)",
    "radial-gradient(1.2px 1.2px at 156px 24px, rgba(255,255,255,0.6), transparent 100%)",
    "radial-gradient(1px 1px at 96px 138px, rgba(255,255,255,0.5), transparent 100%)",
    "radial-gradient(1.5px 1.5px at 248px 92px, rgba(255,255,255,0.7), transparent 100%)",
    "radial-gradient(1px 1px at 312px 196px, rgba(255,255,255,0.45), transparent 100%)",
    "radial-gradient(1.3px 1.3px at 190px 258px, rgba(255,255,255,0.6), transparent 100%)",
    "radial-gradient(1px 1px at 60px 306px, rgba(255,255,255,0.5), transparent 100%)",
    "radial-gradient(1.2px 1.2px at 340px 366px, rgba(255,255,255,0.55), transparent 100%)",
  ].join(", "),
  backgroundSize: "380px 420px",
};

/** Vertical "blinds" that cut the warm backdrop into dark bands. */
const stripesStyle: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(4,3,6,0.92) 0px, rgba(4,3,6,0.92) 44px, rgba(4,3,6,0) 44px, rgba(4,3,6,0) 96px)",
};

const baseWashStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, #1d1215 0%, #150e12 30%, #0d0a0d 62%, #08080a 100%)",
};

const warmGlowStyle: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(125% 62% at 50% -8%, rgba(138,68,45,0.55) 0%, rgba(74,36,33,0.3) 42%, rgba(8,8,10,0) 74%)",
};

const violetGlowStyle: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(58% 38% at 50% 26%, rgba(92,83,254,0.4) 0%, rgba(92,83,254,0.12) 45%, rgba(8,8,10,0) 74%)",
};

/**
 * Full-bleed backdrop for the Home hero: warm space wash, violet glow behind
 * the card, starfield and the vertical striped pattern from the design.
 */
export function BackgroundArt() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0" style={baseWashStyle} />
      <div className="absolute inset-0" style={warmGlowStyle} />
      <div className="absolute inset-0" style={violetGlowStyle} />
      <div className="absolute inset-0" style={stripesStyle} />
      <div className="absolute inset-0 opacity-70" style={starFieldStyle} />
      {/* Soft vignette so the edges fall away into the page background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(115% 95% at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
