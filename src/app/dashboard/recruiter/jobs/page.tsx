"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "cn";
import {
  BanknoteIcon,
  BoxesIcon,
  BriefcaseBusinessIcon,
  CircleCheckIcon,
  CircleOffIcon,
  CodeIcon,
  CopyIcon,
  HeadphonesIcon,
  MapPinIcon,
  MegaphoneIcon,
  MoreVerticalIcon,
  PenToolIcon,
  PlusIcon,
  Trash2Icon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NewJobForm } from "@/app/dashboard/recruiter/jobs/new/page";
import { DeletedJobdailog } from "@/app/comonents1/DeletedjobDialog";
import { UpdateJobDialog } from "@/app/comonents1/UpdateJobDialog";
import { getAllJobs } from "@/lib/action/jobs";
/* ── Table row = form data + management fields ────────── */

 export type JobPost = NewJobForm & {
  _id: string;
 
  postedLabel: string;
};

/* ── Category → icon chip ─────────────────────────────── */

const categoryMeta: Record<string, { icon: LucideIcon; chip: string }> = {
  "Engineering & Tech": { icon: CodeIcon, chip: "bg-blue-500/15 text-blue-400" },
  "Design & Creative": { icon: PenToolIcon, chip: "bg-orange-500/15 text-orange-400" },
  "Marketing & Sales": { icon: MegaphoneIcon, chip: "bg-purple-500/15 text-purple-400" },
  "Finance & Accounting": { icon: BanknoteIcon, chip: "bg-emerald-500/15 text-emerald-400" },
  "Customer Support": { icon: HeadphonesIcon, chip: "bg-pink-500/15 text-pink-400" },
  "Operations": { icon: BoxesIcon, chip: "bg-cyan-500/15 text-cyan-400" },
  "Other": { icon: BriefcaseBusinessIcon, chip: "bg-white/10 text-muted-foreground" },
};

function categoryStyle(category: string) {
  return categoryMeta[category] ?? categoryMeta.Other;
}

/* ── Display helpers ──────────────────────────────────── */

const FREQUENCY_UNITS: Record<string, string> = {
  Hour: "hr",
  Day: "day",
  Month: "mo",
  Year: "yr",
};

function formatCompensation(job: NewJobForm) {
  const unit = FREQUENCY_UNITS[job.frequency.split("/").pop() ?? ""] ?? job.frequency;
  return `₹${job.minSalary || "—"} – ₹${job.maxSalary || "—"} / ${unit}`;
}

function formatDeadline(iso: string) {
  if (!iso) return "—";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}





/* ── Page ─────────────────────────────────────────────── */

export default function ManageJobsPage() {
 const [jobs, setJobs] = React.useState<JobPost[]>([]);

React.useEffect(() => {
  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();

      const formattedJobs = data.map((job: JobPost) => ({
        ...job,
        _id: String(job._id),
        applicants: job.applicants ?? 0,
        status: job.status ?? "Active",
        postedLabel: job.postedLabel ?? "just now",
      }));

      setJobs(formattedJobs);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    }
  };

  fetchJobs();
}, []);

  const removeJob = (id: string) =>
    setJobs((prev) => prev.filter((job) => job._id !== id));

  const duplicateJob = (job: JobPost) =>
    setJobs((prev) => [
      ...prev,
      {
        ...job,
        id: `${job._id}-copy-${crypto.randomUUID().slice(0, 8)}`,
        title: `${job.title} (Copy)`,
        applicants: 0,
        postedLabel: "just now",
      },
    ]);

  const toggleStatus = (id: string) =>
    setJobs((prev) =>
      prev.map((job) =>
        job._id === id
          ? { ...job, status: job.status === "Active" ? "Expired" : "Active" }
          : job
      )
    );

  /** Applies the edited fields from the Update dialog to the matching row. */
  const updateJob = (updated: JobPost) =>
    setJobs((prev) =>
      prev.map((job) => (job._id === updated._id ? updated : job))
    );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      {/* Header — stacks on mobile, row from sm up */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1.5">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/dashboard/recruiter/jobs" className="transition-colors hover:text-foreground">
              Manage Jobs
            </Link>
            <span>/</span>
            <span>Job Listings &amp; Postings</span>
          </nav>
          <h1 className="text-2xl font-semibold tracking-tight">Manage Job Posts</h1>
          <p className="text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details across your organization.
          </p>
        </div>
        <Button
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          nativeButton={false}
          size="lg"
          className="w-full shrink-0 gap-1.5 sm:w-auto"
        >
          <PlusIcon className="size-4" />
          New Job Post
        </Button>
      </div>

      {/* Table (scrolls horizontally on small screens) */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-dashed border-white/10">
        <table className="w-full min-w-[1080px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              <th className="px-4 py-3">Job Title &amp; Post</th>
              <th className="px-4 py-3">Company &amp; Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Compensation</th>
              <th className="px-4 py-3">Applicants</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const meta = categoryStyle(job.category);
              return (
                <tr
                  key={job._id}
                  className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                >
                  {/* Job title & post */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          meta.chip
                        )}
                      >
                        <meta.icon className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-foreground">{job.title}</div>
                        <div className="text-xs text-muted-foreground">{job.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Company & location */}
                  <td className="px-4 py-3">
                    <div className="text-sm text-foreground">{job.company}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPinIcon className="size-3 shrink-0" />
                      <span>{job.location}</span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3">
                    <span className="inline-flex whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-foreground">
                      {job.jobType}
                    </span>
                  </td>

                  {/* Compensation */}
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">
                    {formatCompensation(job)}
                  </td>

                  {/* Applicants */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <UsersIcon className="size-4" />
                      <span className="font-medium text-foreground">{job.applicants}</span>
                      Candidates
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        job.status === "Active"
                          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 bg-white/5 text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          job.status === "Active" ? "bg-emerald-400" : "bg-zinc-500"
                        )}
                      />
                      {job.status}
                    </span>
                  </td>

                  {/* Deadline */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="text-sm text-foreground">{formatDeadline(job.deadline)}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Posted {job.postedLabel}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <UpdateJobDialog job={job} onUpdate={updateJob} />

             <DeletedJobdailog
  job={job}
  onDelete={removeJob}
/>

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          aria-label={`More actions for ${job.title}`}
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <MoreVerticalIcon className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => duplicateJob(job)}>
                            <CopyIcon />
                            Duplicate job
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(job._id)}>
                            {job.status === "Active" ? <CircleOffIcon /> : <CircleCheckIcon />}
                            {job.status === "Active" ? "Mark as expired" : "Reactivate job"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive" onClick={() => removeJob(job._id)}>
                            <Trash2Icon />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              );
            })}

            {jobs.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <p className="text-sm text-muted-foreground">No job posts yet.</p>
                  <Link
                    href="/dashboard/recruiter/jobs/new"
                    className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    Create your first job post
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
