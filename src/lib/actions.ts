"use server";

import { Resend } from "resend";
import { createContactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { getSite } from "@/content";
import type { AppLocale } from "@/i18n/routing";

export type ContactActionResult = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  values: ContactFormValues,
  locale: AppLocale,
): Promise<ContactActionResult> {
  const site = getSite(locale);
  const { validation, status } = site.contactPage.form;
  const parsed = createContactSchema(validation).safeParse(values);

  if (!parsed.success) {
    return { success: false, message: status.invalid };
  }

  const { name, company, email, phone, service, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  const body = [
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Service of interest: ${service}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    // TODO: set RESEND_API_KEY in .env to send real emails. Until then,
    // submissions are logged server-side and the form reports success so
    // the flow can be reviewed end-to-end without live credentials.
    console.log("[contact form] RESEND_API_KEY not set — logging submission instead of sending:\n" + body);
    return { success: true, message: status.mockSuccess };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${site.name} Website <onboarding@resend.dev>`,
      to: site.contact.email,
      replyTo: email,
      subject: `New enquiry from ${name} — ${service}`,
      text: body,
    });

    if (error) {
      console.error("[contact form] Resend error:", error);
      return { success: false, message: status.error };
    }

    return { success: true, message: status.liveSuccess };
  } catch (error) {
    console.error("[contact form] Unexpected error:", error);
    return { success: false, message: status.error };
  }
}
