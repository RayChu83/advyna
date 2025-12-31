"use client";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LightRays } from "@/components/ui/light-rays";
import { Particles } from "@/components/ui/particles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { GoArrowRight, GoPersonAdd } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Semesters() {
  const [semesters, setSemesters] = useState([
    {
      id: "986a886f-229b-4048-a4b0-de6aaf1fa2df",
      title: "Semester 1",
      grade: "Lower Freshman",
      classes: [
        "Intro to Computer Science",
        "Intro to Anthropology",
        "First Year Seminar",
        "Classical Mythology",
        "Calculus I",
      ],
    },
    {
      id: "c21e9c8a-47d6-4e9b-8f41-6b0b0f0f0b11",
      title: "Semester 2",
      grade: "Upper Freshman",
      classes: [
        "Data Structures",
        "College Writing II",
        "General Psychology",
        "Discrete Mathematics",
        "Introduction to Philosophy",
      ],
    },
    {
      id: "f9a2c7b4-9d41-4c32-8b75-2c71c3a8e921",
      title: "Semester 3",
      grade: "Lower Sophomore",
      classes: [
        "Computer Organization",
        "Linear Algebra",
        "Statistics for the Social Sciences",
        "World History to 1500",
        "Public Speaking",
      ],
    },
    {
      id: "a3b7e12d-5f64-4d91-9c28-91e6d43e8c77",
      title: "Semester 4",
      grade: "Upper Sophomore",
      classes: [
        "Algorithms",
        "Operating Systems",
        "Database Systems",
        "Ethics in Technology",
        "Technical Writing",
      ],
    },
  ]);
  return (
    <>
      <main className="mt-17 flex flex-col gap-2 max-w-480 mx-auto py-6 px-4">
        <header className="mb-8 flex flex-col gap-1.5 w-fit">
          <AnimatedShinyText
            className="text-neutral-400 m-0"
            shimmerWidth={100}
          >
            <span className="font-semibold tracking-tight">Hunter College</span>
          </AnimatedShinyText>
          <h1 className="sm:text-5xl text-4xl tracking-tight font-black text-neutral-200 mb-2">
            Your Semesters:
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <button className="text-sm text-emerald-300 outline outline-emerald-700 w-fit cursor-pointer px-4 py-1.5 rounded-full bg-emerald-900 drop-shadow-2xl drop-shadow-emerald-900 flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300">
              <span>📚</span>
              <span className="flex items-center gap-1.5">
                Add Semester <GoArrowRight />
              </span>
            </button>
            <button className="text-sm text-purple-300 outline outline-purple-700 w-fit cursor-pointer px-4 py-1.5 rounded-full bg-purple-900 drop-shadow-2xl drop-shadow-purple-900 flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300">
              <span>✨</span>
              <span>Advyna AI</span>
            </button>
          </div>
        </header>
        <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {semesters.map((semester, i) => (
            <section
              className="w-full bg-zinc-800 outline outline-zinc rounded-sm p-4"
              key={i}
            >
              <header className="flex items-center justify-between mb-4">
                <aside>
                  <h3 className="text-2xl font-bold text-neutral-200">
                    {semester.title}
                  </h3>
                  <AnimatedShinyText
                    className="text-neutral-400"
                    shimmerWidth={100}
                  >
                    <span className="text-sm font-medium">
                      {semester.grade}
                    </span>
                  </AnimatedShinyText>
                </aside>
                <aside className="flex items-center gap-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-2xl cursor-pointer transition-all border-none text-neutral-200 outline-0">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex">
                              <GoPersonAdd />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Invite people</TooltipContent>
                        </Tooltip>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite people</DialogTitle>
                        <DialogDescription>
                          Share this link for others to see your school
                          semester.
                        </DialogDescription>
                      </DialogHeader>
                      <input
                        type="text"
                        className="bg-zinc-800 text-neutral-300 px-4 py-2 w-full rounded-sm outline-offset-2 transition-all border border-zinc-600 outline-2 outline-transparent focus:outline-zinc-400/60"
                        defaultValue={`http://localhost:3000/semesters/${semester.id}`}
                      />
                      <DialogClose asChild>
                        <button className="w-fit py-2 px-4 rounded-sm bg-zinc-800 text-neutral-300 ml-auto">
                          Exit
                        </button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex text-2xl cursor-pointer transition-all border-none text-neutral-200 outline-0">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex">
                              <IoSettingsOutline />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Settings</TooltipContent>
                        </Tooltip>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-zinc-800 outline-zinc-600">
                      <DropdownMenuLabel className="font-semibold tracking-tight text-neutral-300">
                        Settings
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <button className="w-full text-neutral-300 hover:bg-zinc-900! transition-all cursor-pointer flex items-center justify-between group">
                          <span className="group-hover:text-yellow-400 transition-all">
                            Edit
                          </span>
                          <MdEdit className="group-hover:text-yellow-400 transition-all" />
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button className="w-full text-neutral-300 hover:bg-zinc-900! transition-all cursor-pointer flex items-center justify-between group">
                          <span className="group-hover:text-red-400 transition-all">
                            Delete
                          </span>
                          <MdDelete className="group-hover:text-red-400 transition-all" />
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </aside>
              </header>
              <div className="flex flex-col gap-2">
                {semester.classes.map((cls, j) => (
                  <Link
                    key={j}
                    className={cn(
                      "flex items-center justify-between gap-2 text-sm py-1.5 px-3 rounded-sm font-light tracking-wide cursor-pointer transition-all",
                      [
                        "bg-red-500/10 text-red-300 hover:bg-red-500/20",
                        "bg-orange-500/10 text-orange-300 hover:bg-orange-500/20",
                        "bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20",
                        "bg-green-500/10 text-green-300 hover:bg-green-500/20",
                        "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20",
                      ][j % 5]
                    )}
                    href={`/semesters/${semester.id}/${cls}`}
                  >
                    <span>{cls}</span>
                    <GoArrowRight className="text-lg" />
                  </Link>
                ))}
                {/* <button className="flex items-center justify-between gap-2 text-sm py-1.5 px-3 rounded-sm bg-red-500/10 text-red-300 font-light tracking-wide hover:bg-red-500/20 cursor-pointer transition-all">
                  <span>Intro to Computer Science</span>{" "}
                  <GoArrowRight className="text-lg" />
                </button>
                <button className="flex items-center justify-between gap-2 text-sm py-1.5 px-3 rounded-sm bg-orange-500/10 text-orange-300 font-light tracking-wide hover:bg-orange-500/20 cursor-pointer transition-all">
                  <span>Intro to Anthropology</span>{" "}
                  <GoArrowRight className="text-lg" />
                </button>
                <button className="flex items-center justify-between gap-2 text-sm py-1.5 px-3 rounded-sm bg-yellow-500/10 text-yellow-300 font-light tracking-wide hover:bg-yellow-500/20 cursor-pointer transition-all">
                  <span>First Year Seminar</span>{" "}
                  <GoArrowRight className="text-lg" />
                </button>
                <button className="flex items-center justify-between gap-2 text-sm py-1.5 px-3 rounded-sm bg-green-500/10 text-green-300 font-light tracking-wide hover:bg-green-500/20 cursor-pointer transition-all">
                  <span>Classical Mythology</span>{" "}
                  <GoArrowRight className="text-lg" />
                </button>
                <button className="flex items-center justify-between gap-2 text-sm py-1.5 px-3 rounded-sm bg-blue-500/10 text-blue-300 font-light tracking-wide hover:bg-blue-500/20 cursor-pointer transition-all">
                  <span>Calculus I</span> <GoArrowRight className="text-lg" />
                </button> */}
              </div>
            </section>
          ))}
        </div>
      </main>
      <LightRays className="fixed -z-50" speed={8} />
      <Particles className="fixed w-full h-full top-0 left-0 -z-50" />
    </>
  );
}
