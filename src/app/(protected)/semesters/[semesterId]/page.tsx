"use client";
import { LightRays } from "@/components/ui/light-rays";
import { Particles } from "@/components/ui/particles";
import { defaultSemesters } from "@/constants";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

const semesters = defaultSemesters;
const TABS = ["All", "Classes", "Calendar", "Deadlines"] as const;
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
        <section className="flex items-center flex-wrap gap-x-8 gap-y-2 mb-6">
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
        {(() => {
          switch (tab) {
            case "All":
              return <All setTab={setTab} />;
            case "Deadlines":
              return <Deadlines setTab={setTab} />;
            case "Classes":
              return <Classes setTab={setTab} />;
            case "Calendar":
              return <Calendar setTab={setTab} />;
            default:
              return null;
          }
        })()}
      </main>
      <LightRays className="fixed -z-50" speed={14} />
      <Particles className="fixed w-full h-full top-0 left-0 -z-50" />
    </>
  );
}

export function All({ setTab }: { setTab: Dispatch<SetStateAction<Tab>> }) {
  return (
    <>
      <section className="mb-8">
        <header className="flex items-center justify-between gap-2 mb-4">
          <aside>
            <h3 className="text-2xl font-semibold text-neutral-200">
              Upcoming deadlines
            </h3>
            <AnimatedShinyText
              className="text-neutral-400 m-0"
              shimmerWidth={200}
            >
              <span className="text-sm font-medium">14 upcoming deadlines</span>
            </AnimatedShinyText>
          </aside>
          <button
            onClick={() => setTab("Deadlines")}
            className="flex items-center gap-2 cursor-pointer text-neutral-200 text-nowrap whitespace-nowrap hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <span className="animated-underline">See all</span>
            <GoArrowRight />
          </button>
        </header>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-red-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-red-100 underline decoration-transparent group-hover:decoration-red-100 transition-all leading-6 mb-1">
              Classics Chapter 4
            </h5>
            <p className="text-red-200 text-sm font-light mb-6">Sep 24, 2025</p>
            <div className="flex items-center justify-between gap-4">
              <p className="text-red-300 text-sm uppercase font-bold tracking-wider">
                Classical Mythology
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-orange-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-orange-100 underline decoration-transparent group-hover:decoration-orange-100 transition-all leading-6 mb-1">
              Computer Science Lab 7
            </h5>
            <p className="text-orange-200 text-sm font-light mb-6">
              Sep 27, 2025
            </p>
            <div className="flex items-center justify-between gap-4">
              <p className="text-orange-300 text-sm uppercase font-bold tracking-wider">
                Intro to Computer Science
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-yellow-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-yellow-100 underline decoration-transparent group-hover:decoration-yellow-100 transition-all leading-6 mb-1">
              Discussion 1
            </h5>
            <p className="text-yellow-200 text-sm font-light mb-6">
              Sep 29, 2025
            </p>
            <div className="flex items-center justify-between gap-4">
              <p className="text-yellow-300 text-sm uppercase font-bold tracking-wider">
                First Year Seminar
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-green-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-green-100 underline decoration-transparent group-hover:decoration-green-100 transition-all leading-6 mb-1">
              Exam 4
            </h5>
            <p className="text-green-200 text-sm font-light mb-6">
              Oct 3, 2025
            </p>
            <div className="flex items-center justify-between gap-4">
              <p className="text-green-300 text-sm uppercase font-bold tracking-wider">
                Intro to Anthropology
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <header className="flex items-center justify-between gap-2 mb-4">
          <aside>
            <h3 className="text-2xl font-semibold text-neutral-200">
              Classes this semester
            </h3>
            <AnimatedShinyText
              className="text-neutral-400 m-0"
              shimmerWidth={200}
            >
              <span className="text-sm font-medium">5 classes enrolled</span>
            </AnimatedShinyText>
          </aside>
          <button
            onClick={() => setTab("Deadlines")}
            className="flex items-center gap-2 cursor-pointer text-neutral-200 text-nowrap whitespace-nowrap hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <span className="animated-underline">See all</span>
            <GoArrowRight />
          </button>
        </header>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-6">
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-red-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-red-100 underline decoration-transparent group-hover:decoration-red-100 transition-all leading-6">
              Intro to Anthropology
            </h5>
            <p className="text-red-200 text-sm font-light mb-3">
              Prof. Gerald Creed
            </p>
            <p className="mb-6 text-xs font-light text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="flex items-end justify-between gap-4">
              <p className="text-red-300 text-sm uppercase font-bold tracking-wider">
                Mon 11:30 - 12:45 <br />
                Thu 11:30 - 12:45
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-orange-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-orange-100 underline decoration-transparent group-hover:decoration-orange-100 transition-all leading-6 mb-1">
              Intro to Computer Science
            </h5>
            <p className="text-orange-200 text-sm font-light mb-3">
              Prof. John Doe
            </p>
            <p className="mb-6 text-xs font-light text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="flex items-end justify-between gap-4">
              <p className="text-orange-300 text-sm uppercase font-bold tracking-wider">
                Tue 10:00 - 11:15 <br />
                Fri 10:00 - 11:15
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-yellow-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-yellow-100 underline decoration-transparent group-hover:decoration-yellow-100 transition-all leading-6 mb-1">
              First Year Seminar
            </h5>
            <p className="text-yellow-200 text-sm font-light mb-3">
              Prof. Elise Harris
            </p>
            <p className="mb-6 text-xs font-light text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="flex items-end justify-between gap-4 mt-auto">
              <p className="text-yellow-300 text-sm uppercase font-bold">
                Wed 9:30 - 10:15
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-green-400 bg-zinc-900 group flex flex-col">
            <h5 className="md:text-xl text-lg font-semibold text-green-100 underline decoration-transparent group-hover:decoration-green-100 transition-all leading-6 mb-1">
              Classical Mythology
            </h5>
            <p className="text-green-200 text-sm font-light mb-3">
              Prof. Victoria Jannson
            </p>
            <p className="mb-6 text-xs font-light text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="flex items-end justify-between gap-4">
              <p className="text-green-300 text-sm uppercase font-bold">
                Mon 10:00 - 11:15 <br />
                Thu 10:00 - 11:15
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
          <div className="p-4 rounded-md transition-all hover:scale-[1.02] backdrop-blur-sm border-b-2 border-cyan-400 bg-zinc-900 group flex flex-col">
            <h5 className="text-xl font-semibold text-cyan-100 underline decoration-transparent group-hover:decoration-cyan-100 transition-all leading-6 mb-1">
              Calculus I
            </h5>
            <p className="text-cyan-200 text-sm font-light mb-3">
              Prof. Be&apos;eri Greenfeld
            </p>
            <p className="mb-6 text-xs font-light text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="flex items-end justify-between gap-4">
              <p className="text-cyan-300 text-sm uppercase font-bold">
                Mon 3:30 - 5:20 <br />
                Thu 3:30 - 5:20
              </p>
              <button className="text-sm flex items-center gap-2 font-bold text-neutral-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-0 cursor-pointer">
                <span className="animated-underline">View</span>
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Deadlines({
  setTab,
}: {
  setTab: Dispatch<SetStateAction<Tab>>;
}) {
  return (
    <>
      <h5 className="text-2xl tracking-tight font-semibold text-neutral-200">
        My Assignments
      </h5>
    </>
  );
}

export function Classes({ setTab }: { setTab: Dispatch<SetStateAction<Tab>> }) {
  return (
    <>
      <header className="mb-4">
        <h3 className="text-2xl font-semibold text-neutral-200">
          Your classes
        </h3>
        <AnimatedShinyText className="text-neutral-400 m-0" shimmerWidth={200}>
          <span className="text-sm font-medium">5 classes enrolled</span>
        </AnimatedShinyText>
      </header>
      <section className="flex flex-col gap-2">
        <div className="border-t-2 border-b-2 py-6 px-3 flex flex-col w-full gap-6 hover:bg-zinc-950/20 transition-all">
          <div className="grid grid-cols-3 gap-4">
            <h5 className="font-black text-neutral-200 my-auto">
              Classical Mythology
            </h5>
            <p className="text-neutral-300 font-light my-auto">
              Prof. Victoria Jannsen
            </p>
            <div className="ml-auto text-sm my-auto">
              <p className="text-neutral-300">Mon 10:00 - 11:15</p>
              <p className="text-neutral-300">Thu 10:00 - 11:15</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-[12.5%] gap-y-6">
            <p className="text-neutral-400 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="grid grid-cols-2">
              <p className="font-medium text-neutral-200">Professor: </p>
              <p className="ml-auto text-neutral-300">Prof. Gerald Creed</p>
              <p className="font-medium text-neutral-200">Email: </p>
              <Link
                className="ml-auto break-all text-blue-300 underline"
                href={`mailto:${"gerald.creed@hunter.cuny.edu"}`}
              >
                gerald.creed@hunter.cuny.edu
              </Link>
              <p className="font-medium text-neutral-200">Office Hours: </p>
              <div className="ml-auto text-neutral-300">
                <p>Mon 11:00 - 12:15 W 704</p>
                <p>Wed 11:00 - 12:15 W 704</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-b-2 py-6 px-3 flex flex-col w-full gap-6 hover:bg-zinc-950/20 transition-all">
          <div className="grid grid-cols-3 gap-4">
            <h5 className="font-black text-neutral-200 my-auto">
              Intro to Anthropology
            </h5>
            <p className="text-neutral-300 font-light my-auto">
              Prof. Gerald Creed
            </p>
            <div className="ml-auto text-sm flex items-center justify-center gap-4">
              <div>
                <p className="text-neutral-300">Mon 11:30 - 12:45</p>
                <p className="text-neutral-300">Thu 11:30 - 12:45</p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-[12.5%] gap-y-6">
            <p className="text-neutral-400 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="grid grid-cols-2">
              <p className="font-medium text-neutral-200">Professor: </p>
              <p className="ml-auto text-neutral-300">Prof. Gerald Creed</p>
              <p className="font-medium text-neutral-200">Email: </p>
              <Link
                className="ml-auto break-all text-blue-300 underline"
                href={`mailto:${"gerald.creed@hunter.cuny.edu"}`}
              >
                gerald.creed@hunter.cuny.edu
              </Link>
              <p className="font-medium text-neutral-200">Office Hours: </p>
              <div className="ml-auto text-neutral-300">
                <p>Mon 11:00 - 12:15 W 704</p>
                <p>Wed 11:00 - 12:15 W 704</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-b-2 py-6 px-3 flex flex-col w-full gap-6 hover:bg-zinc-950/20 transition-all">
          <div className="grid grid-cols-3 gap-4">
            <h5 className="font-black text-neutral-200 my-auto">
              Intro to Computer Science
            </h5>
            <p className="text-neutral-300 font-light my-auto">
              Prof. John Doe
            </p>
            <div className="ml-auto text-sm my-auto">
              <p className="text-neutral-300">Tue 10:00 - 11:15</p>
              <p className="text-neutral-300">Fri 10:00 - 11:15</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-[12.5%] gap-y-6">
            <p className="text-neutral-400 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="grid grid-cols-2">
              <p className="font-medium text-neutral-200">Professor: </p>
              <p className="ml-auto text-neutral-300">Prof. Gerald Creed</p>
              <p className="font-medium text-neutral-200">Email: </p>
              <Link
                className="ml-auto break-all text-blue-300 underline"
                href={`mailto:${"gerald.creed@hunter.cuny.edu"}`}
              >
                gerald.creed@hunter.cuny.edu
              </Link>
              <p className="font-medium text-neutral-200">Office Hours: </p>
              <div className="ml-auto text-neutral-300">
                <p>Mon 11:00 - 12:15 W 704</p>
                <p>Wed 11:00 - 12:15 W 704</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-b-2 py-6 px-3 flex flex-col w-full gap-6 hover:bg-zinc-950/20 transition-all">
          <div className="grid grid-cols-3 gap-4">
            <h5 className="font-black text-neutral-200 my-auto">
              First Year Seminar
            </h5>
            <p className="text-neutral-300 font-light my-auto">
              Prof. Elise Harris
            </p>
            <div className="ml-auto text-sm my-auto">
              <p className="text-neutral-300">Wed 9:30 - 10:15</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-[12.5%] gap-y-6">
            <p className="text-neutral-400 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="grid grid-cols-2">
              <p className="font-medium text-neutral-200">Professor: </p>
              <p className="ml-auto text-neutral-300">Prof. Gerald Creed</p>
              <p className="font-medium text-neutral-200">Email: </p>
              <Link
                className="ml-auto break-all text-blue-300 underline"
                href={`mailto:${"gerald.creed@hunter.cuny.edu"}`}
              >
                gerald.creed@hunter.cuny.edu
              </Link>
              <p className="font-medium text-neutral-200">Office Hours: </p>
              <div className="ml-auto text-neutral-300">
                <p>Mon 11:00 - 12:15 W 704</p>
                <p>Wed 11:00 - 12:15 W 704</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-b-2 py-6 px-3 flex flex-col w-full gap-6 hover:bg-zinc-950/20 transition-all">
          <div className="grid grid-cols-3 gap-4">
            <h5 className="font-black text-neutral-200 my-auto">Calculus I</h5>
            <p className="text-neutral-300 font-light my-auto">
              Prof. Be&apos;eri Greenfeld
            </p>
            <div className="ml-auto text-sm my-auto">
              <p className="text-neutral-300">Mon 3:30 - 5:20</p>
              <p className="text-neutral-300">Thu 3:30 - 5:20</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-[12.5%] gap-y-6">
            <p className="text-neutral-400 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              qui necessitatibus voluptates minima voluptatum voluptas adipisci
              a, doloremque eum illo accusantium aperiam, ullam cum quaerat,
              saepe id magni! Pariatur, fuga?
            </p>
            <div className="grid grid-cols-2">
              <p className="font-medium text-neutral-200">Professor: </p>
              <p className="ml-auto text-neutral-300">Prof. Gerald Creed</p>
              <p className="font-medium text-neutral-200">Email: </p>
              <Link
                className="ml-auto break-all text-blue-300 underline"
                href={`mailto:${"gerald.creed@hunter.cuny.edu"}`}
              >
                gerald.creed@hunter.cuny.edu
              </Link>
              <p className="font-medium text-neutral-200">Office Hours: </p>
              <div className="ml-auto text-neutral-300">
                <p>Mon 11:00 - 12:15 W 704</p>
                <p>Wed 11:00 - 12:15 W 704</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Calendar({
  setTab,
}: {
  setTab: Dispatch<SetStateAction<Tab>>;
}) {
  return (
    <>
      <h5 className="text-2xl font-semibold text-neutral-200">My Calendar</h5>
    </>
  );
}
