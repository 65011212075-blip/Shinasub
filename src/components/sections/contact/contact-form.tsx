"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { Site } from "@/content";
import type { AppLocale } from "@/i18n/routing";
import { createContactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { submitContactForm } from "@/lib/actions";
import { Reveal } from "@/components/motion/reveal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ site, locale }: { site: Site; locale: AppLocale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const { labels, servicePlaceholder, submit, submitting, validation } = site.contactPage.form;

  const schema = useMemo(() => createContactSchema(validation), [validation]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", email: "", phone: "", service: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    const result = await submitContactForm(values, locale);
    setStatus(result.success ? "success" : "error");
    setStatusMessage(result.message);
    if (result.success) reset();
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <Reveal className="mx-auto max-w-3xl rounded-3xl bg-surface-1 p-8 sm:p-12">
        <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
          {site.contactPage.form.heading}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">{labels.name}</Label>
              <Input id="name" autoComplete="name" aria-invalid={!!errors.name} className="mt-2 h-12 rounded-xl" {...register("name")} />
              {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="company">{labels.company}</Label>
              <Input id="company" autoComplete="organization" className="mt-2 h-12 rounded-xl" {...register("company")} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">{labels.email}</Label>
              <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className="mt-2 h-12 rounded-xl" {...register("email")} />
              {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">{labels.phone}</Label>
              <Input id="phone" type="tel" autoComplete="tel" className="mt-2 h-12 rounded-xl" {...register("phone")} />
            </div>
          </div>

          <div>
            <Label htmlFor="service">{labels.service}</Label>
            <Controller
              control={control}
              name="service"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="service" aria-invalid={!!errors.service} className="mt-2 h-12 w-full rounded-xl">
                    <SelectValue placeholder={servicePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {site.contactPage.form.serviceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.service && <p className="mt-1.5 text-xs text-destructive">{errors.service.message}</p>}
          </div>

          <div>
            <Label htmlFor="message">{labels.message}</Label>
            <Textarea id="message" rows={5} aria-invalid={!!errors.message} className="mt-2 rounded-xl" {...register("message")} />
            {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="h-[3.25rem] w-full rounded-full bg-ink text-base text-ink-foreground transition-[transform,background-color] duration-300 ease-[var(--ease-editorial)] hover:bg-ink-2 hover:not-disabled:-translate-y-0.5"
          >
            {status === "submitting" && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {status === "submitting" ? submitting : submit}
          </Button>

          <div aria-live="polite" className="min-h-6">
            <AnimatePresence mode="wait">
              {(status === "success" || status === "error") && (
                <motion.p
                  key={status}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={
                    status === "success"
                      ? "flex items-center gap-2 text-sm text-success"
                      : "flex items-center gap-2 text-sm text-destructive"
                  }
                >
                  {status === "success" ? (
                    <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                  ) : (
                    <AlertCircle className="size-4 shrink-0" aria-hidden />
                  )}
                  {statusMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
