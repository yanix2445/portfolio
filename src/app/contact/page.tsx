// app/contact/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {Loader2, CheckCircle, XCircle, Briefcase, GraduationCap, MessageSquare, Users, FileText,
        Upload, Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin,} from "lucide-react";


type ContactInfo = {
  label: string;
  value: string;
  icon: React.ElementType;
  href?: string;
};

const contactInfos: ContactInfo[] = [
  {
    label: "GitHub",
    value: "yanix2445",
    href: "https://github.com/yanix2445",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "yanis-harrat",
    href: "https://www.linkedin.com/in/yanis-harrat",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    value: "@yanix2445",
    href: "https://x.com/yanix_213",
    icon: Twitter,
  },
  {
    label: "Instagram",
    value: "@yanix2445",
    href: "https://instagram.com/yanix2445",
    icon: Instagram,
  },
  {
    label: "Localisation",
    value: "Paris, Île-de-France",
    icon: MapPin,
  },
  {
    label: "Téléphone",
    value: "06 03 05 98 29",
    href: "tel:0603059829",
    icon: Phone,
  },
  {
    label: "Email",
    value: "yanis.amine.harrat@gmail.com",
    href: "mailto:yanis.amine.harrat@gmail.com",
    icon: Mail,
  },
];

/**
 * Pourquoi cette structure ?
 * --------------------------
 * - Ce formulaire est destiné à un portfolio, donc la cible principale : recruteurs, RH, managers, partenaires potentiels.
 * - On met en avant les cas d'usage RH : proposition d'alternance, CDI, stage, mission freelance, prise de contact pro, etc.
 * - On clarifie chaque raison pour guider le recruteur et faciliter le tri côté back.
 * - On prépare la structure pour l'accessibilité et l'évolutivité.
 *
 * Comment ?
 * ---------
 * - Ajout d'une description explicite pour chaque raison (utile pour l'accessibilité, les tooltips, ou l'affichage contextuel).
 * - Ordre logique : d'abord les offres concrètes, puis les demandes de contact ou d'information.
 * - Typage explicite pour robustesse et évolutivité.
 * - "Autre" reste pour les cas non couverts.
 */

type ContactReason = {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  variant: "default" | "secondary" | "outline" | "destructive";
};

const contactReasons: ContactReason[] = [
  {
    value: "alternance",
    label: "Proposer une alternance",
    description: "Vous souhaitez me proposer une alternance ou en discuter.",
    icon: GraduationCap,
    variant: "default",
  },
  {
    value: "cdi",
    label: "Proposer un CDI",
    description: "Vous avez une opportunité de CDI à me présenter.",
    icon: Briefcase,
    variant: "secondary",
  },
  {
    value: "stage",
    label: "Proposer un stage",
    description: "Vous souhaitez me proposer un stage ou en savoir plus.",
    icon: FileText,
    variant: "outline",
  },
  {
    value: "freelance",
    label: "Mission freelance",
    description: "Vous cherchez un développeur pour une mission ponctuelle.",
    icon: Users,
    variant: "secondary",
  },
  {
    value: "rdv",
    label: "Organiser un entretien",
    description: "Vous souhaitez planifier un échange ou un entretien.",
    icon: MessageSquare,
    variant: "default",
  },
  {
    value: "autre",
    label: "Autre demande professionnelle",
    description:
      "Pour toute autre demande liée à mon profil ou à une collaboration.",
    icon: Mail,
    variant: "outline",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
    subject: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReasonChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      reason: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("reason", formData.reason);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);
    if (file) {
      formDataToSend.append("file", file);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          reason: "",
          subject: "",
          message: "",
        });
        setFile(null);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedReason = contactReasons.find(
    (r) => r.value === formData.reason
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Contactez-moi</CardTitle>
            <CardDescription>
              Étudiant BTS SIO SISR • À la recherche d&rsquo;alternance/CDI
            </CardDescription>
            <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4 text-sm text-muted-foreground">
              {contactInfos.map(({ label, value, href, icon: Icon }) =>
                href ? (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    className="flex items-center gap-3 hover:text-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{value}</span>
                  </Link>
                ) : (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{value}</span>
                  </div>
                )
              )}
            </div>
            <Separator className="mt-4" />
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="mb-2 block ">
                    Prénom *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="mb-2 block">
                    Nom *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="mb-2 block">
                  Email *
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                />
              </div>

              {/* Raison du contact */}
              <div className="space-y-3">
                <Label className="mb-2 block">Type de contact *</Label>
                <Select
                  value={formData.reason}
                  onValueChange={handleReasonChange}
                  required
                >
                  <SelectTrigger className="w-full max-w-full whitespace-normal break-words min-h-[4rem]">
                    <SelectValue placeholder="Sélectionnez la demande" />
                  </SelectTrigger>
                  <SelectContent
                    className="w-[--radix-select-trigger-width] max-w-[95vw] max-h-[50vh] overflow-y-auto z-50"
                    side="bottom"
                    align="start"
                  >
                    {contactReasons.map((reason) => {
                      const Icon = reason.icon;
                      return (
                        <SelectItem key={reason.value} value={reason.value}>
                          <div className="flex flex-col text-left">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {reason.label}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {reason.description}
                            </span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Objet */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="mb-2 block">
                  Objet *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande en détail..."
                  className="resize-none"
                />
              </div>

              {/* Fichier joint */}
              <div className="space-y-2">
                <Label htmlFor="file" className="mb-2 block">
                  Fichier joint (optionnel)
                </Label>
                <Input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
                {file && (
                  <div className="flex items-center gap-2 mt-2">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {file.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Messages de statut */}
              {status === "success" && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Message envoyé avec succès ! Je vous répondrai rapidement.
                  </AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    Erreur lors de l&rsquo;envoi. Veuillez réessayer.
                  </AlertDescription>
                </Alert>
              )}

              <Separator />

              {/* Bouton d'envoi */}
              <Button
                type="submit"
                disabled={isLoading || !formData.reason}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
