import "./setup-content";

import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  confirmationEmail,
  formatParisDate,
  notificationEmail,
  rejectionAlertEmail,
} from "@/lib/contact-emails";
import { COLOR } from "@/lib/palette";

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
  const mail = confirmationEmail();

  it("salue le visiteur et annonce le délai de 48 à 72 h", () => {
    expect(mail.html).toContain("Bonjour,");
    expect(mail.text).toContain("Bonjour,");
    expect(mail.html).toContain("sous 48&nbsp;à&nbsp;72&nbsp;heures maximum");
    expect(mail.text).toContain("sous 48 à 72 heures maximum");
    expect(mail.subject).toContain("48 à 72 h");
  });

  // L'accusé part vers n'importe quelle adresse saisie : aucun texte du visiteur ne doit y
  // figurer, sinon le formulaire relaierait du spam depuis le domaine.
  it("ne recopie ni le nom ni le message saisis", () => {
    for (const part of [mail.subject, mail.html, mail.text]) {
      expect(part).not.toContain("Camille");
      expect(part).not.toContain("alert(1)");
    }
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

// Un mail ou une image générée n'a pas de variables CSS : leurs couleurs recopient les tokens du site.
describe("couleurs des mails et des images", () => {
  const css = readFileSync(path.join(import.meta.dirname, "../../src/app/globals.css"), "utf8");
  const token = (name: string) => {
    const value = new RegExp(`^\\s*--${name}:\\s*([^;]+);`, "m").exec(css)?.[1].trim();
    if (!value) throw new Error(`token --${name} introuvable`);
    return value;
  };

  it("reprennent les tokens de globals.css", () => {
    expect({
      background: COLOR.background,
      card: COLOR.card,
      foreground: COLOR.foreground,
      soft: COLOR.soft,
      muted: COLOR.muted,
      primary: COLOR.primary,
      primaryForeground: COLOR.primaryForeground,
    }).toEqual({
      background: token("background"),
      card: token("card"),
      foreground: token("foreground"),
      soft: token("soft"),
      muted: token("muted-foreground"),
      primary: token("primary"),
      primaryForeground: token("primary-foreground"),
    });
  });

  it("donnent au filet la teinte du `--border` translucide posé sur une carte", () => {
    const [r, g, b, alpha] = /rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)/.exec(token("border"))!.slice(1).map(Number);
    const card = token("card").match(/[\da-f]{2}/gi)!.map((hex) => parseInt(hex, 16));
    const blend = [r, g, b].map((channel, index) => Math.round(alpha * channel + (1 - alpha) * card[index]));

    expect(COLOR.border).toBe(`#${blend.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`);
  });
});
