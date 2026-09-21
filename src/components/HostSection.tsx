"use client";

/**
 * "Meet your host" — the floating host card on the left, host facts, co-hosts
 * and contact details on the right.
 */

import Image from "next/image";
import { Star } from "./icons";
import { OutlineButton, Section } from "./primitives";
import { host } from "@/data/listing";

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-center gap-1 text-[22px] font-semibold leading-tight text-ink">
        {value}
      </div>
      <div className="text-xs text-ink">{label}</div>
    </div>
  );
}

function CoHostAvatar({
  name,
  avatar,
}: {
  name: string;
  avatar: string | null;
}) {
  return avatar ? (
    <Image
      src={avatar}
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-base font-semibold text-white"
    >
      {name.charAt(0)}
    </span>
  );
}

export function HostSection() {
  return (
    <Section heading="Meet your host" headingId="host">
      <div className="flex gap-20">
        {/* Host card */}
        <div className="w-[400px] shrink-0">
          <div
            className="flex flex-col items-center rounded-[20px] bg-surface p-8 text-center"
            style={{ boxShadow: "0 6px 16px rgba(0,0,0,0.12)" }}
          >
            <Image
              src={host.avatar}
              alt=""
              width={104}
              height={104}
              className="h-26 w-26 rounded-full object-cover"
            />
            <p className="mt-4 text-[28px] font-semibold leading-tight text-ink">
              {host.name}
            </p>
            <p className="text-sm text-muted">Host</p>

            <div className="mt-6 w-full divide-y divide-line-soft">
              <Stat value={host.reviews.toLocaleString("en-IN")} label="Reviews" />
              <Stat
                value={
                  <>
                    {host.rating}
                    <Star size={14} className="text-ink" />
                  </>
                }
                label="Rating"
              />
              <Stat value={host.yearsHosting} label="Years hosting" />
            </div>
          </div>
        </div>

        {/* Host details */}
        <div className="min-w-0 flex-1">
          <p className="text-base text-ink">{host.bornIn}</p>
          <p className="mt-2 text-base text-ink">{host.school}</p>

          <h3 className="mt-8 text-lg font-semibold text-ink">Co-Hosts</h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
            {host.coHosts.map((coHost) => (
              <li key={coHost.name} className="flex items-center gap-2">
                <CoHostAvatar name={coHost.name} avatar={coHost.avatar} />
                <span className="text-sm text-ink">{coHost.name}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-semibold text-ink">Host details</h3>
          <p className="mt-2 text-base text-ink">
            Response rate: {host.responseRate}
          </p>
          <p className="text-base text-ink">{host.responseTime}</p>

          <div className="mt-6">
            <OutlineButton className="bg-ink! text-white! hover:bg-ink!">
              Message host
            </OutlineButton>
          </div>

          <p className="mt-4 text-xs text-muted">
            To help protect your payment, always use Airbnb to send money and
            communicate with hosts.
          </p>
        </div>
      </div>
    </Section>
  );
}
