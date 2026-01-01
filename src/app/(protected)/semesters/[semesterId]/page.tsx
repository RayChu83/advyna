"use client";
import { LightRays } from "@/components/ui/light-rays";
import { Particles } from "@/components/ui/particles";
import { defaultSemesters } from "@/constants";
import Link from "next/link";
import { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const semesters = defaultSemesters;
const TABS = ["All", "Assignments", "Classes", "Calendar"] as const;
type Tab = (typeof TABS)[number];

export default function SemesterDetails() {
  const params = useParams();
  const urlSemesterId = params.semesterId;
  const [semester, setSemester] = useState(
    defaultSemesters.filter((semester) => semester.id === urlSemesterId)
  );
  const [tab, setTab] = useState<Tab>("All");
  return (
    <>
      <main className="mt-17 flex flex-col gap-2 max-w-480 mx-auto p-6">
        <header className="mb-8 flex flex-col gap-1.5 w-fit">
          <Link
            href="/semesters"
            className="text-neutral-400 hover:text-neutral-300 flex items-center gap-2 transition-all font-semibold tracking-tight"
          >
            <GoArrowLeft /> <span>Return to all semesters</span>
          </Link>
          <h1 className="sm:text-5xl text-4xl tracking-tight font-black text-neutral-200 mb-2">
            {semester[0].title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <button className="text-sm text-emerald-300 outline outline-emerald-700 w-fit cursor-pointer px-4 py-1.5 rounded-full bg-emerald-900 drop-shadow-2xl drop-shadow-emerald-900 flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300">
              <span>📚</span>
              <span className="flex items-center gap-1.5">
                Add Class <GoArrowRight />
              </span>
            </button>
            <button className="text-sm text-purple-300 outline outline-purple-700 w-fit cursor-pointer px-4 py-1.5 rounded-full bg-purple-900 drop-shadow-2xl drop-shadow-purple-900 flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300">
              <span>✨</span>
              <span>Powered by Advyna AI</span>
            </button>
          </div>
        </header>
        <section className="flex items-center flex-wrap gap-8 mb-6">
          {TABS.map((mappedTab, index) => (
            <button
              className={cn(
                "text-lg transition-all duration-300 tracking-wider text-nowrap outline-none font-light cursor-pointer underline decoration-[0.5px] underline-offset-8",
                tab === mappedTab
                  ? "text-zinc-200 font-medium decoration-zinc-200"
                  : "animated-underline text-zinc-400 hover:text-zinc-300 decoration-transparent"
              )}
              key={index}
              onClick={() => setTab(mappedTab)}
            >
              {mappedTab}
            </button>
          ))}
        </section>
        <section>
          {(() => {
            switch (tab) {
              case "All":
                return <All />;
              case "Assignments":
                return <Assignments />;
              case "Classes":
                return <Classes />;
              case "Calendar":
                return <Calendar />;
              default:
                return null;
            }
          })()}
        </section>
      </main>
      <LightRays className="fixed -z-50" speed={14} />
      <Particles className="fixed w-full h-full top-0 left-0 -z-50" />
    </>
  );
}

export function All() {
  return (
    <>
      <h5 className="text-2xl font-semibold text-neutral-200">
        Upcoming Assignments
      </h5>
    </>
  );
}

export function Assignments() {
  return (
    <>
      <h5 className="text-2xl tracking-tight font-semibold text-neutral-200">
        My Assignments
      </h5>
    </>
  );
}

export function Classes() {
  return (
    <>
      <h5 className="text-2xl tracking-tight font-semibold text-neutral-200">
        My Classes
      </h5>
    </>
  );
}

export function Calendar() {
  return (
    <>
      <h5 className="text-2xl font-semibold text-neutral-200">My Calendar</h5>
    </>
  );
}
