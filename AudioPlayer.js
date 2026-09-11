import { useRef, useState } from "react";

// Lecteur audio discret. Ne joue JAMAIS automatiquement : l'utilisateur
// doit cliquer. Pense à déposer un fichier dans /public/audio/ambiance.mp3
// (musique d'ambiance ou message d'accueil) — sans fichier, le bouton
// reste visible mais inactif.
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(true);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setReady(false));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} src="/audio/ambiance.mp3" loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? "Couper le son" : "Activer le son"}
        title={ready ? (playing ? "Couper le son" : "Activer le son") : "Ajoutez un fichier audio dans /public/audio/ambiance.mp3"}
        className="w-12 h-12 rounded-full bg-senegal-green text-cream shadow-lg flex items-center justify-center border-2 border-senegal-yellow active:scale-95 transition-transform"
      >
        {playing ? (
          // Icône "son actif"
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          // Icône "son coupé"
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    </div>
  );
}
