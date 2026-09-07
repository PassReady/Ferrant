"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
// dinner nightly Tue–Sun; closed Monday (the night events use the room)
const OPEN_DOW = new Set([0, 2, 3, 4, 5, 6]);
const SLOTS = ["5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function sameDay(a: Date | null, b: Date | null) {
  return !!a && !!b && a.toDateString() === b.toDateString();
}
function fmtLong(d: Date) {
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function MonthGrid({
  year,
  month,
  today,
  selected,
  onPick,
}: {
  year: number;
  month: number;
  today: Date;
  selected: Date | null;
  onPick: (d: Date) => void;
}) {
  const first = new Date(year, month, 1);
  const lead = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div className="cal">
      <div className="cal__title">
        {MONTHS[month]} {year}
      </div>
      <div className="cal__dow">
        {DAYS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="cal__grid">
        {cells.map((d, i) => {
          if (!d) return <span key={i} className="cal__cell" />;
          const disabled = d < today || !OPEN_DOW.has(d.getDay());
          return (
            <button
              key={i}
              type="button"
              className="cal__cell"
              data-selected={sameDay(d, selected)}
              disabled={disabled}
              onClick={() => onPick(d)}
              aria-label={fmtLong(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingFlow() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState(SLOTS[3]);
  const [party, setParty] = useState(2);
  const [details, setDetails] = useState({ name: "", email: "", phone: "" });
  const [ref, setRef] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const today = useMemo(() => startOfDay(new Date()), []);
  const nextMonth = useMemo(() => {
    const d = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return d;
  }, [today]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function reset() {
    setStep(0);
    setDate(null);
    setSlot(SLOTS[3]);
    setParty(2);
    setDetails({ name: "", email: "", phone: "" });
    setRef("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // demo: no backend. Generate a plausible reference.
    setRef(
      "FRT-" +
        Math.random().toString(36).slice(2, 6).toUpperCase() +
        (date ? date.getDate() : "0"),
    );
    setStep(2);
  }

  return (
    <>
      <button
        type="button"
        className="btn-fire"
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        Book a table
      </button>

      {open && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label="Book a table at Ferrant"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="modal__panel" ref={dialogRef}>
            <div className="modal__bar">
              <span className="modal__brand">Ferrant</span>
              <button
                ref={closeRef}
                type="button"
                className="modal__x"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>

            {step === 0 && (
              <div className="modal__body">
                <h2 className="modal__h">Choose a night</h2>
                <p className="modal__sub">
                  Dinner nightly, Tuesday to Sunday. If your night is full
                  we&rsquo;ll offer the nearest.
                </p>

                <div className="cal__months">
                  <MonthGrid
                    year={today.getFullYear()}
                    month={today.getMonth()}
                    today={today}
                    selected={date}
                    onPick={setDate}
                  />
                  <MonthGrid
                    year={nextMonth.getFullYear()}
                    month={nextMonth.getMonth()}
                    today={today}
                    selected={date}
                    onPick={setDate}
                  />
                </div>

                <div className="modal__rows">
                  <div className="modal__field">
                    <span className="modal__label">Arrival</span>
                    <div className="slots">
                      {SLOTS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="slot"
                          data-selected={s === slot}
                          onClick={() => setSlot(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="modal__field">
                    <span className="modal__label">Party</span>
                    <div className="stepper">
                      <button
                        type="button"
                        onClick={() => setParty((p) => Math.max(1, p - 1))}
                        aria-label="Fewer"
                        disabled={party <= 1}
                      >
                        &minus;
                      </button>
                      <span aria-live="polite">
                        {party} {party === 1 ? "guest" : "guests"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setParty((p) => Math.min(8, p + 1))}
                        aria-label="More"
                        disabled={party >= 8}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="modal__foot">
                  <span className="modal__summary">
                    {date ? `${fmtLong(date)}, ${slot} · ${party}` : "Pick a date"}
                  </span>
                  <button
                    type="button"
                    className="btn-fire"
                    disabled={!date}
                    onClick={() => setStep(1)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <form className="modal__body" onSubmit={submit}>
                <button
                  type="button"
                  className="modal__back"
                  onClick={() => setStep(0)}
                >
                  &larr; Back to the date
                </button>
                <h2 className="modal__h">Who&rsquo;s the booking for?</h2>
                <p className="modal__sub">
                  {date && `${fmtLong(date)}, ${slot} · ${party} `}
                  {party === 1 ? "guest" : "guests"}
                </p>

                <label className="modal__input">
                  <span>Name</span>
                  <input
                    required
                    value={details.name}
                    onChange={(e) =>
                      setDetails({ ...details, name: e.target.value })
                    }
                    autoComplete="name"
                  />
                </label>
                <label className="modal__input">
                  <span>Email</span>
                  <input
                    required
                    type="email"
                    value={details.email}
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    autoComplete="email"
                  />
                </label>
                <label className="modal__input">
                  <span>Phone</span>
                  <input
                    required
                    type="tel"
                    value={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                    autoComplete="tel"
                  />
                </label>

                <div className="modal__foot">
                  <span className="modal__summary">
                    We hold the table for 15 minutes.
                  </span>
                  <button type="submit" className="btn-fire">
                    Confirm booking
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="modal__body modal__done">
                <div className="modal__mark" aria-hidden="true" />
                <h2 className="modal__h">Table held.</h2>
                <p className="modal__sub">
                  Thanks, {details.name.split(" ")[0] || "there"}. A confirmation
                  is on its way to {details.email}. Bring this reference if you
                  call.
                </p>
                <dl className="receipt">
                  <div>
                    <dt>Reference</dt>
                    <dd>{ref}</dd>
                  </div>
                  <div>
                    <dt>Night</dt>
                    <dd>{date && fmtLong(date)}</dd>
                  </div>
                  <div>
                    <dt>Arrival</dt>
                    <dd>{slot}</dd>
                  </div>
                  <div>
                    <dt>Party</dt>
                    <dd>
                      {party} {party === 1 ? "guest" : "guests"}
                    </dd>
                  </div>
                </dl>
                <p className="modal__demo">
                  This is a demo — no email was sent and no table was actually
                  reserved.
                </p>
                <div className="modal__foot">
                  <span />
                  <button
                    type="button"
                    className="btn-fire"
                    onClick={() => setOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
