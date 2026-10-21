import { useEffect, useRef, useState } from "react";
import { content } from "./content.js";

const store = {
  get(k, d) {
    try {
      const v = localStorage.getItem("aaryan:" + k);
      return v === null ? d : JSON.parse(v);
    } catch { return d; }
  },
  set(k, v) {
    try { localStorage.setItem("aaryan:" + k, JSON.stringify(v)); } catch {}
  },
};

// open the site with ?reset on the end to wipe saved progress (handy for testing)
try {
  if (new URLSearchParams(location.search).has("reset")) {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("aaryan:"))
      .forEach((k) => localStorage.removeItem(k));
  }
} catch {}

function usePersisted(key, initial) {
  const [v, setV] = useState(() => store.get(key, initial));
  useEffect(() => store.set(key, v), [key, v]);
  return [v, setV];
}

/* ---------- small helpers ---------- */

function Photo({ src, label, tilt = 0 }) {
  return (
    <div className="photo" style={{ transform: `rotate(${tilt}deg)` }}>
      <span className="tape" />
      {src ? (
        <img src={src} alt={label} loading="lazy" />
      ) : (
        <div className="photo-ph">
          <span>📷</span>
          <small>photo goes here</small>
        </div>
      )}
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Confetti({ run }) {
  if (!run) return null;
  const colors = ["#ff6b4a", "#ffc233", "#2d6a4f", "#4361ee", "#ef476f"];
  const bits = Array.from({ length: 60 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.2,
    dur: 2.5 + Math.random() * 2,
    color: colors[i % colors.length],
    rot: Math.random() * 360,
  }));
  return (
    <div className="confetti" aria-hidden>
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            left: `${b.left}%`,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            transform: `rotate(${b.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function Typed({ text, onDone, speed = 28 }) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (n >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(t);
  }, [n]);
  return <>{text.slice(0, n)}</>;
}

/* ---------- sections ---------- */

function Cover({ onOpen, opened }) {
  const c = content.cover;
  return (
    <header className={`cover ${opened ? "cover-open" : ""}`}>
      <div className="cover-top">
        <span>{c.kicker}</span>
        <span>{content.tagline}</span>
      </div>
      <h1 className="cover-title">
        {c.headline.split(" ").map((w, i) => (
          <span key={i} className={w === content.name ? "accent" : ""}>
            {w}
          </span>
        ))}
      </h1>
      <div className="cover-photo">
        <Photo src={c.photo} label={content.name} tilt={-2} />
        <div className="badge">
          <b>{content.age}</b>
          <small>today</small>
        </div>
      </div>
      <ul className="teasers">
        {c.teasers.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {!opened && (
        <button className="btn big" onClick={onOpen}>
          Open the issue →
        </button>
      )}
    </header>
  );
}

function Timeline() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Feature story</p>
        <h2>How we got here</h2>
      </Reveal>
      <div className="timeline">
        {content.timeline.map((t, i) => (
          <Reveal key={i} className={`entry ${i % 2 ? "flip" : ""}`}>
            <Photo src={t.photo} label={t.title} tilt={i % 2 ? 2 : -2} />
            <div className="entry-text">
              <span className="date">{t.date}</span>
              <h3>{t.title}</h3>
              <p>{t.caption}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Quiz({ onDone }) {
  const qs = content.quiz;
  const [i, setI] = usePersisted("quizIndex", 0);
  const [picked, setPicked] = useState(null);
  const [finished, setFinished] = usePersisted("quizFinished", false);

  const q = qs[i];
  const option = picked !== null ? q.options[picked] : null;
  const hasRight = q.options.some((o) => o.right === true);
  const gotIt = option && (!hasRight || option.right === true);

  const next = () => {
    if (i + 1 < qs.length) {
      setI(i + 1);
      setPicked(null);
    } else {
      setFinished(true);
      onDone();
    }
  };

  return (
    <section className="section quiz-sec">
      <Reveal>
        <p className="eyebrow">Interactive · Pull-out</p>
        <h2>The Aaryan Quiz</h2>
        <p className="sub">Six questions. There is no way to fail.</p>
      </Reveal>

      <Reveal className="quiz-card">
        {finished ? (
          <div className="quiz-done">
            <div className="big-emoji">🏆</div>
            <h3>100%. As expected.</h3>
            <p>Your prize is waiting just below.</p>
          </div>
        ) : (
          <>
            <div className="progress">
              {qs.map((_, k) => (
                <span key={k} className={k <= i ? "on" : ""} />
              ))}
            </div>
            <p className="qnum">
              Question {i + 1} of {qs.length}
            </p>
            <h3 className="q">{q.q}</h3>
            <div className="opts">
              {q.options.map((o, k) => (
                <button
                  key={k}
                  className={`opt ${picked === k ? (gotIt ? "good" : "nope") : ""}`}
                  onClick={() => setPicked(k)}
                  disabled={picked !== null && gotIt}
                >
                  {o.text}
                </button>
              ))}
            </div>
            <div className="reaction" aria-live="polite">
              {option && <p>{option.reaction}</p>}
            </div>
            {gotIt && (
              <button className="btn" onClick={next}>
                {i + 1 < qs.length ? "Next →" : "See my result →"}
              </button>
            )}
          </>
        )}
      </Reveal>
    </section>
  );
}

function Awards() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Special section</p>
        <h2>{content.awardsTitle}</h2>
      </Reveal>
      <div className="awards">
        {content.awards.map((a, i) => (
          <Reveal key={i} className="award">
            <span className="trophy">🏅</span>
            <div>
              <h3>{a.title}</h3>
              <p>{a.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Letter({ unlocked }) {
  const [open, setOpen] = useState(false);
  const [boom, setBoom] = useState(false);
  const [step, setStep] = useState(0);
  const l = content.letter;
  const g = content.gift;
  const parts = [l.greeting, ...l.body, l.signoff, content.from];

  const openIt = () => {
    if (!unlocked) return;
    setStep(0);
    setOpen(true);
    setBoom(true);
    setTimeout(() => setBoom(false), 6000);
  };

  return (
    <section className="section letter-sec">
      <Confetti run={boom} />
      <Reveal>
        <p className="eyebrow">Editor's letter</p>
        <h2>For you</h2>
      </Reveal>

      {!open ? (
        <Reveal>
          <button
            className={`envelope ${unlocked ? "ready" : "locked"}`}
            onClick={openIt}
            disabled={!unlocked}
          >
            <span className="env-icon">{unlocked ? "💌" : "🔒"}</span>
            <span className="env-text">
              {unlocked ? "Tap to open" : "Finish the quiz to unlock"}
            </span>
          </button>
        </Reveal>
      ) : (
        <div className="letter" onClick={() => setStep(parts.length)}>
          {parts.map((p, idx) => {
            if (idx > step) return null;
            const cls =
              idx === 0
                ? "greet"
                : idx === parts.length - 2
                ? "signoff"
                : idx === parts.length - 1
                ? "from"
                : "";
            return (
              <p key={idx} className={cls}>
                {idx === step ? (
                  <Typed text={p} onDone={() => setStep((s) => s + 1)} />
                ) : (
                  p
                )}
              </p>
            );
          })}
          {step < parts.length && <small className="skip">tap to skip</small>}
        </div>
      )}

      {open && g && step >= parts.length && (
        <div className="gift">
          <small>{g.label}</small>
          <h3>{g.title}</h3>
          <p>{g.text}</p>
        </div>
      )}
    </section>
  );
}

/* ---------- countdown gate ---------- */

const UNLOCK = new Date("2026-10-24T00:00:00+05:30"); // midnight IST on the 24th
const PREVIEW = new URLSearchParams(location.search).has("preview");

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, target - now);
  const parts = [
    ["days", Math.floor(left / 86400000)],
    ["hrs", Math.floor(left / 3600000) % 24],
    ["min", Math.floor(left / 60000) % 60],
    ["sec", Math.floor(left / 1000) % 60],
  ];
  return (
    <div className="gate">
      <p className="eyebrow">Printing in progress</p>
      <h1>Something's coming for {content.name}.</h1>
      <div className="gate-clock">
        {parts.map(([label, n]) => (
          <div key={label}>
            <b>{String(n).padStart(2, "0")}</b>
            <small>{label}</small>
          </div>
        ))}
      </div>
      <p className="sub">Come back at midnight. No peeking. 👀</p>
    </div>
  );
}

function Gate({ children }) {
  const target = UNLOCK.getTime();
  const [open, setOpen] = useState(() => PREVIEW || Date.now() >= target);
  useEffect(() => {
    if (open) return;
    const t = setInterval(() => {
      if (Date.now() >= target) setOpen(true);
    }, 1000);
    return () => clearInterval(t);
  }, [open, target]);
  return open ? children : <Countdown target={target} />;
}

/* ---------- app ---------- */

function Site() {
  const [opened, setOpened] = usePersisted("opened", false);
  const [quizDone, setQuizDone] = usePersisted("quizDone", false);
  const bodyRef = useRef(null);

  const open = () => {
    setOpened(true);
    setTimeout(
      () => bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      150
    );
  };

  return (
    <div className="page">
      <Cover opened={opened} onOpen={open} />
      {opened && (
        <main ref={bodyRef}>
          <Timeline />
          <Quiz onDone={() => setQuizDone(true)} />
          <Awards />
          <Letter unlocked={quizDone} />
          <footer className="foot">
            Printed with love · The {content.name} Issue · Limited to one reader
          </footer>
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Gate>
      <Site />
    </Gate>
  );
}