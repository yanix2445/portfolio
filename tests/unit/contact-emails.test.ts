import "./setup-content";

import { describe, expect, it } from "vitest";

import {
  confirmationEmail,
  formatParisDate,
  notificationEmail,
  rejectionAlertEmail,
} from "@/lib/contact-emails";

const FIELDS = {
  name: "Camille <b>",
  email: "camille@example.com",
  message: "Bonjour,\n<script>alert(1)</script>\nÀ bientôt",
};
// 16 novembre 2026, 23 h 55 à Paris (UTC+1 en hiver).
const RECEIVED = new Date("2026-11-16T22:55:00Z");

describe("date à l'heure de Paris", () => {
  it("écrit le jour, la date et l'heure en français", () => {
    expect(formatParisDate(RECEIVED)).toBe("lundi 16 novembre 2026 à 23 h 55");
  });
});

describe("notification pour Yanis", () => {
  const mail = notificationEmail(FIELDS, RECEIVED);

  it("nomme l'expéditeur dans l'objet", () => {
    expect(mail.subject).toBe("Nouveau message de Camille <b> · portfolio");
  });

  it("donne le message, le lien de réponse et l'heure limite à 72 h", () => {
    expect(mail.html).toContain("mailto:camille@example.com?subject=");
    expect(mail.html).toContain("jeudi 19 novembre 2026 à 23 h 55");
    expect(mail.text).toContain("Répondre avant : jeudi 19 novembre 2026 à 23 h 55");
    expect(mail.text).toContain(FIELDS.message);
  });

  it("met le motif dans l'objet et la fiche, s'il y en a un", () => {
    const withReason = notificationEmail({ ...FIELDS, reason: "alternance" }, RECEIVED);
    expect(withReason.subject).toBe("[Alternance] Nouveau message de Camille <b> · portfolio");
    expect(withReason.text).toContain("Motif : Alternance");
    expect(mail.html).not.toContain("Motif");
  });

  it("échappe le HTML saisi et garde les retours à la ligne", () => {
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).not.toContain("Camille <b>");
    expect(mail.html).toContain("Bonjour,<br>&lt;script&gt;");
  });
});

describe("accusé de réception pour le visiteur", () => {
  const mail = confirmationEmail(FIELDS);

  it("salue le visiteur et annonce le délai de 48 à 72 h", () => {
    expect(mail.html).toContain("Bonjour Camille &lt;b&gt;,");
    expect(mail.html).toContain("sous 48&nbsp;à&nbsp;72&nbsp;heures maximum");
    expect(mail.text).toContain("sous 48 à 72 heures maximum");
    expect(mail.subject).toContain("48 à 72 h");
  });

  it("ne recopie jamais le message saisi", () => {
    expect(mail.html).not.toContain("alert(1)");
    expect(mail.text).not.toContain("alert(1)");
  });
});

describe("alerte de mail non remis", () => {
  it("dit quelle adresse a rejeté l'accusé et quoi faire", () => {
    const mail = rejectionAlertEmail({
      recipient: "camile@exmple.com",
      kind: "confirmation",
      detail: "rejeté par le serveur du destinataire (<mailbox unknown>)",
      at: RECEIVED,
    });
    expect(mail.subject).toBe("Alerte · mail non remis à camile@exmple.com");
    expect(mail.text).toContain("L'adresse saisie par le visiteur est sans doute fausse");
    expect(mail.html).toContain("&lt;mailbox unknown&gt;");
  });

  it("pointe vers la configuration si c'est la notification qui échoue", () => {
    const mail = rejectionAlertEmail({ recipient: "moi@example.com", kind: "notification", detail: "x", at: RECEIVED });
    expect(mail.text).toContain("CONTACT_TO_EMAIL");
  });
});
