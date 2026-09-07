"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A lightweight enquiry modal for a single event space — separate from the
 * general "Reserve a table" dining flow in BookingFlow. Name, email, date,
 * group size; the space itself is fixed, not chosen. No backend.
 *
 * Rendered via a portal into document.body: the trigger button lives inside
 * a flip-card back face, and that card gets `transform: rotateY(...)` when
 * flipped. A transformed ancestor becomes the containing block for
 * `position: fixed` descendants, so without the portal this "fixed,
 * full-viewport" modal was instead sizing itself against the small card.
 */
export function EnquiryFlow({ space }: { space: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "", size: "10" });
  const closeRef = useRef<HTMLButtonElement>(null);

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

  function openModal() {
    setSent(false);
    setForm({ name: "", email: "", date: "", size: "10" });
    setOpen(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <button type="button" className="act" onClick={openModal}>
        Enquire about {space}
      </button>

      {open &&
        createPortal(
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Enquire about ${space}`}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
          <div className="modal__panel">
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

            {!sent ? (
              <form className="modal__body" onSubmit={submit}>
                <h2 className="modal__h">Enquire about {space}</h2>
                <p className="modal__sub">
                  Tell us a bit about the group and we&rsquo;ll come back with
                  availability and a price.
                </p>

                <label className="modal__input">
                  <span>Space</span>
                  <input value={space} disabled />
                </label>
                <label className="modal__input">
                  <span>Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                </label>
                <label className="modal__input">
                  <span>Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                  />
                </label>
                <label className="modal__input">
                  <span>Preferred date</span>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </label>
                <label className="modal__input">
                  <span>Group size</span>
                  <input
                    required
                    type="number"
                    min={1}
                    max={60}
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                  />
                </label>

                <div className="modal__foot">
                  <span className="modal__summary">We reply within a day.</span>
                  <button type="submit" className="btn-fire">
                    Send enquiry
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal__body modal__done">
                <div className="modal__mark" aria-hidden="true" />
                <h2 className="modal__h">Enquiry sent.</h2>
                <p className="modal__sub">
                  Thanks, {form.name.split(" ")[0] || "there"}. We&rsquo;ll be
                  in touch about {space}
                  {form.date ? ` for ${form.date}` : ""}, party of{" "}
                  {form.size}.
                </p>
                <p className="modal__demo">
                  This is a demo — no email was sent and nothing was booked.
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
          </div>,
          document.body,
        )}
    </>
  );
}
