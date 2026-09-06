"use client";

import { useId, useState } from "react";

type Sent = {
  name: string;
  date: string;
  party: string;
  occasion: string;
};

function formatDate(value: string) {
  if (!value) return "";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function BookingForm() {
  const [sent, setSent] = useState<Sent | null>(null);
  const uid = useId();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSent({
      name: String(form.get("name") ?? ""),
      date: String(form.get("date") ?? ""),
      party: String(form.get("party") ?? ""),
      occasion: String(form.get("occasion") ?? ""),
    });
    // Demo only — no request is sent.
  }

  if (sent) {
    return (
      <div className="confirm" role="status" aria-live="polite">
        <h2>We&rsquo;ve got it.</h2>
        <p>
          Thanks, {sent.name.split(" ")[0] || "there"}. This is an enquiry, not a
          confirmed booking &mdash; we hold twelve seats a night, so we&rsquo;ll
          email you within two days to sort the details.
        </p>
        <div className="confirm__detail">
          <div>
            Night requested: <span>{formatDate(sent.date) || "not set"}</span>
          </div>
          <div>
            Party: <span>{sent.party || "not set"}</span>
          </div>
          {sent.occasion ? (
            <div>
              Notes: <span>{sent.occasion}</span>
            </div>
          ) : null}
        </div>
        <div className="confirm__mark" aria-hidden="true" />
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${uid}-name`}>Your name</label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </div>

      <div className="field--row">
        <div className="field">
          <label htmlFor={`${uid}-date`}>Preferred night</label>
          <input
            id={`${uid}-date`}
            name="date"
            type="date"
            required
          />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-party`}>Party size</label>
          <select id={`${uid}-party`} name="party" defaultValue="2" required>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12 (the whole room)</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${uid}-occasion`}>
          The occasion, and anything we should know
        </label>
        <textarea
          id={`${uid}-occasion`}
          name="occasion"
          rows={3}
          placeholder="A birthday, an anniversary, allergies, someone who doesn't eat fish&hellip;"
        />
      </div>

      <button type="submit" className="form__submit">
        Send enquiry
      </button>
    </form>
  );
}
