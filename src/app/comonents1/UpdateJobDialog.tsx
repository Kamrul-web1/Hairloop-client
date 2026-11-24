"use client";

import * as React from "react";
import { cn } from "cn";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MapPinIcon,
  PencilIcon,
  UnderlineIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { NewJobForm } from "@/app/dashboard/recruiter/jobs/new/page";
import type { JobPost } from "../dashboard/recruiter/jobs/page";
import { updateUser } from "@/lib/action/jobs";

/* ── Option lists (same options as the new-job form) ──── */

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Accounting",
  "Customer Support",
  "Operations",
  "Other",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const FREQUENCIES = ["PKR/Hour", "PKR/Day", "PKR/Month", "PKR/Year"];

/* ── Seed the form from the stored job ─────────────────── */

function seedForm(job: JobPost): NewJobForm {
  return {
    title: job.title ?? "",
    company: job.company ?? "",
    category: job.category ?? "",
    jobType: job.jobType ?? "",
    remote: job.remote ?? false,
    location: job.location ?? "",
    deadline: job.deadline ?? "",
    minSalary: job.minSalary ?? "",
    maxSalary: job.maxSalary ?? "",
    frequency: job.frequency ?? "",
    responsibilities: job.responsibilities ?? "",
    qualifications: job.qualifications ?? "",
  };
}

/* ── Small building blocks (same styles as the new-job form) ── */

function SectionCard({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    /* shrink-0: inside the dialog's scrollable flex form, cards must keep
       their natural height instead of being squeezed (they are overflow-hidden). */
    <Card className="shrink-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2.5 text-[15px] font-semibold">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[11px] font-semibold text-primary">
            {n}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Label
      className={cn(
        "flex flex-col items-start gap-1.5 text-[13px] font-medium",
        className
      )}
    >
      <span>
        {label}
        {required && <span className="text-muted-foreground"> *</span>}
      </span>
      {children}
    </Label>
  );
}

function SectionLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <Label htmlFor={htmlFor} className="text-[13px] font-medium">
      {label}
      {required && <span className="text-muted-foreground"> *</span>}
    </Label>
  );
}

/* ── Simple rich-text style editor (plain string data) ── */

function ToolButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

function Editor({
  id,
  value,
  onChange,
  placeholder,
  required,
  minHeight = "min-h-28",
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  minHeight?: string;
}) {
  const getEl = () =>
    document.getElementById(id) as HTMLTextAreaElement | null;

  /** Wrap the selected text in markers (plain-text friendly). */
  const surround = (before: string, after = before) => () => {
    const el = getEl();
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const selected = value.slice(s, e);
    onChange(value.slice(0, s) + before + selected + after + value.slice(e));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(
        s + before.length,
        s + before.length + selected.length
      );
    });
  };

  /** Add a bullet/number prefix to each selected line. */
  const prefix = (marker: string) => () => {
    const el = getEl();
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const start = value.lastIndexOf("\n", s - 1) + 1;
    const nextBreak = value.indexOf("\n", e);
    const end = nextBreak === -1 ? value.length : nextBreak;
    const block = value
      .slice(start, end)
      .split("\n")
      .map((line) => (line.startsWith(marker) ? line : marker + line))
      .join("\n");
    onChange(value.slice(0, start) + block + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start, start + block.length);
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-input bg-input/30 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
      <div className="flex items-center gap-0.5 border-b border-white/8 px-1.5 py-1">
        <ToolButton title="Bold" onClick={surround("**")}>
          <BoldIcon className="size-3.5" />
        </ToolButton>
        <ToolButton title="Italic" onClick={surround("*")}>
          <ItalicIcon className="size-3.5" />
        </ToolButton>
        <ToolButton title="Underline" onClick={surround("__")}>
          <UnderlineIcon className="size-3.5" />
        </ToolButton>
        <div className="mx-1 h-4 w-px bg-white/10" />
        <ToolButton title="Bulleted list" onClick={prefix("- ")}>
          <ListIcon className="size-3.5" />
        </ToolButton>
        <ToolButton title="Numbered list" onClick={prefix("1. ")}>
          <ListOrderedIcon className="size-3.5" />
        </ToolButton>
      </div>
      <Textarea
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "min-h-28 rounded-none border-0 bg-transparent px-3 py-2.5 shadow-none focus-visible:border-0 focus-visible:ring-0",
          minHeight
        )}
      />
    </div>
  );
}

/* ── Edit dialog ───────────────────────────────────────── */

export function UpdateJobDialog({
  job,
  onUpdate,
}: {
  job: JobPost;
  onUpdate: (updated: JobPost) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<NewJobForm>(() => seedForm(job));
  const [error, setError] = React.useState<string | null>(null);

  const set = <K extends keyof NewJobForm>(key: K, value: NewJobForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  /** Re-seed from the job every time the dialog opens, so discarded edits never stick. */
  const handleOpenChange = (next: boolean) => {
    if (next) {
      setForm(seedForm(job));
      setError(null);
    }
    setOpen(next);
  };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const result = await updateUser(job._id, form );

    if (result.modifiedCount > 0) {
      toast.add({
        title: "Success",
        description: "Job updated successfully",
      });

      onUpdate({ ...job, ...form });
      setOpen(false);
    } else if (result.matchedCount > 0) {
      toast.add({
        title: "No Changes",
        description: "No changes were made.",
      });

      setOpen(false);
    }
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to update job.",
     
    });
  }
};
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
          />
        }
      >
        <PencilIcon className="size-3.5" />
        Edit
      </DialogTrigger>

      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="shrink-0 pt-6 pr-12 px-6">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Update Job Post
          </DialogTitle>
          <DialogDescription>
            Review and update job qualifications, compensation ranges, and
            candidate requirements for this listing.
          </DialogDescription>
        </DialogHeader>

       <form
  onSubmit={handleSubmit}
  className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 pb-6"
>
          {/* 1. Basic Information */}
          <SectionCard n={1} title="Basic Information">
            <Field label="Job Title" required>
              <Input
                required
                placeholder="e.g. Frontend Developer"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className="h-10"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Company Name" required>
                <Input
                  required
                  placeholder="e.g. Aloha Tech Network"
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  className="h-10"
                />
              </Field>

              <Field label="Job Category" required>
                <Select
                  value={form.category}
                  onValueChange={(v) => set("category", v ?? "")}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium">
                Job Type <span className="text-muted-foreground">*</span>
              </span>
              <div
                role="radiogroup"
                aria-label="Job Type"
                className="flex flex-wrap gap-2"
              >
                {JOB_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    role="radio"
                    aria-checked={form.jobType === type}
                    onClick={() => set("jobType", type)}
                    className={cn(
                      "h-9 rounded-lg border px-4 text-sm transition-colors",
                      form.jobType === type
                        ? "border-white/10 bg-[#232327] font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* 2. Location, Compensation & Timeline */}
          <SectionCard n={2} title="Location, Compensation & Timeline">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">
                  Remote Work Allowed{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Check this if you accept remote/hybrid candidates for this
                  position.
                </span>
              </div>
              <Switch
                checked={form.remote}
                onCheckedChange={(checked) => set("remote", checked)}
                aria-label="Remote work allowed"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Job Location (Remote)" required>
                <div className="relative">
                  <MapPinIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    required
                    placeholder="e.g. New York, USA"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    className="h-10 pl-8"
                  />
                </div>
              </Field>

              <Field label="Application Deadline" required>
                <Input
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(e) => set("deadline", e.target.value)}
                  className="h-10"
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Min Salary / Rate" required>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    required
                    inputMode="decimal"
                    placeholder="25"
                    value={form.minSalary}
                    onChange={(e) => set("minSalary", e.target.value)}
                    className="h-10 pl-7"
                  />
                </div>
              </Field>

              <Field label="Max Salary / Rate" required>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    required
                    inputMode="decimal"
                    placeholder="40"
                    value={form.maxSalary}
                    onChange={(e) => set("maxSalary", e.target.value)}
                    className="h-10 pl-7"
                  />
                </div>
              </Field>

              <Field label="Frequency" required>
                <Select
                  value={form.frequency}
                  onValueChange={(v) => set("frequency", v ?? "")}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCIES.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </SectionCard>

          {/* 3. Responsibilities & Requirements */}
          <SectionCard n={3} title="Responsibilities & Requirements">
            <div className="flex flex-col gap-1.5">
              <SectionLabel
                htmlFor="edit-responsibilities"
                label="Key Responsibilities"
                required
              />
              <Editor
                id="edit-responsibilities"
                required
                value={form.responsibilities}
                onChange={(v) => set("responsibilities", v)}
                placeholder="Short description of what the candidate will be doing. Use clear, action-first language."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <SectionLabel
                htmlFor="edit-qualifications"
                label="Qualifications & Requirements"
                required
              />
              <Editor
                id="edit-qualifications"
                required
                value={form.qualifications}
                onChange={(v) => set("qualifications", v)}
                minHeight="min-h-32"
                placeholder="List the required skills and experience for this role."
              />
            </div>
          </SectionCard>

          {/* Validation message + submit */}
          {error && (
            <p
              role="alert"
              className="shrink-0 text-sm font-medium text-destructive"
            >
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full gap-1.5 sm:w-auto">
            Update Job
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
