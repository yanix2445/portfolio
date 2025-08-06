// app/contact/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {Loader2, CheckCircle, XCircle, Briefcase, GraduationCap, MessageSquare, Users, FileText,
        Upload, Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowLeft,} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Définit le schéma de validation du formulaire de contact
const contactFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères.").max(50, "Le prénom ne doit pas dépasser 50 caractères."),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères.").max(50, "Le nom ne doit pas dépasser 50 caractères."),
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  reason: z.string().min(1, "Veuillez sélectionner un type de contact."),
  subject: z.string().min(5, "L'objet doit contenir au moins 5 caractères.").max(100, "L'objet ne doit pas dépasser 100 caractères."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères.").max(1000, "Le message ne doit pas dépasser 1000 caractères."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

type ContactInfo = {
  label: string;
  value: string;
  icon: React.ElementType;
  href?: string;
};

// Liste des informations de contact à afficher avec labels SEO
const contactInfos: ContactInfo[] = [
  {
    label: "GitHub - Projets développement",
    value: "yanix2445",
    href: "https://github.com/yanix2445",
    icon: Github,
  },
  {
    label: "LinkedIn - Profil professionnel Yanis Harrat",
    value: "yanis-harrat",
    href: "https://www.linkedin.com/in/yanis-harrat",
    icon: Linkedin,
  },
  {
    label: "Twitter - Veille technologique",
    value: "@yanix2445",
    href: "https://x.com/yanix_213",
    icon: Twitter,
  },
  {
    label: "Instagram - Actualités",
    value: "@yanix2445",
    href: "https://instagram.com/yanix2445",
    icon: Instagram,
  },
  {
    label: "Localisation alternance",
    value: "Paris, Île-de-France",
    icon: MapPin,
  },
  {
    label: "Téléphone contact professionnel",
    value: "06 03 05 98 29",
    href: "tel:0603059829",
    icon: Phone,
  },
  {
    label: "Email professionnel Yanis Harrat",
    value: "yanis.amine.harrat@gmail.com",
    href: "mailto:yanis.amine.harrat@gmail.com",
    icon: Mail,
  },
];

type ContactReason = {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  variant: "default" | "secondary" | "outline" | "destructive";
};

// Liste des raisons de contact pour le champ Select avec terminologie SEO
const contactReasons: ContactReason[] = [
  {
    value: "alternance",
    label: "Proposer une alternance BTS SIO",
    description: "Vous souhaitez me proposer une alternance BTS SIO SISR ou en discuter.",
    icon: GraduationCap,
    variant: "default",
  },
  {
    value: "cdi",
    label: "Proposer un CDI développeur",
    description: "Vous avez une opportunité de CDI développeur full-stack à me présenter.",
    icon: Briefcase,
    variant: "secondary",
  },
  {
    value: "stage",
    label: "Proposer un stage informatique",
    description: "Vous souhaitez me proposer un stage en développement ou support IT.",
    icon: FileText,
    variant: "outline",
  },
  {
    value: "freelance",
    label: "Mission freelance développement",
    description: "Vous cherchez un développeur JavaScript/Python pour une mission ponctuelle.",
    icon: Users,
    variant: "secondary",
  },
  {
    value: "rdv",
    label: "Organiser un entretien technique",
    description: "Vous souhaitez planifier un entretien ou échange technique.",
    icon: MessageSquare,
    variant: "default",
  },
  {
    value: "autre",
    label: "Autre demande professionnelle",
    description:
      "Pour toute autre demande liée à mon profil développeur ou collaboration technique.",
    icon: Mail,
    variant: "outline",
  },
];

export default function ContactPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    // Initialise le formulaire avec des valeurs par défaut pour un état contrôlé
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      reason: "",
      subject: "",
      message: "",
    },
  });

  // SEO: Données structurées JSON-LD pour la page contact
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Yanis Harrat - Développeur BTS SIO",
    "description": "Contactez Yanis Harrat, développeur full-stack et étudiant BTS SIO SISR. Recherche alternance, CDI, missions freelance à Paris.",
    "url": "https://yanis-harrat.fr/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Yanis Harrat",
      "jobTitle": "Développeur Full-Stack & Étudiant BTS SIO SISR",
      "telephone": "+33603059829",
      "email": "yanis.amine.harrat@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR"
      },
      "sameAs": [
        "https://www.linkedin.com/in/yanis-harrat",
        "https://github.com/yanix2445",
        "https://instagram.com/yanix2445",
        "https://x.com/yanix_213"
      ]
    }
  };

  // Gère la sélection d'un fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Fonction appelée à la soumission du formulaire
  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", data.firstName);
    formDataToSend.append("lastName", data.lastName);
    formDataToSend.append("email", data.email);
    formDataToSend.append("reason", data.reason);
    formDataToSend.append("subject", data.subject);
    formDataToSend.append("message", data.message);
    if (file) {
      formDataToSend.append("file", file);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Message envoyé !", {
          description: "Merci pour votre message, je vous répondrai rapidement.",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          className: "bg-green-50 text-green-800 border-green-200"
        });
        reset(); // Réinitialise les champs du formulaire
        setFile(null);
        // Redirige immédiatement après le toast de succès
        router.push('/');
      } else {
        const errorData = await response.json();
        if (response.status === 400 && errorData.errors) {
          Object.keys(errorData.errors).forEach((key) => {
            setError(key as keyof ContactFormData, {
              type: "server",
              message: errorData.errors[key][0],
            });
          });
          toast.error("Erreur de validation", {
            description: "Veuillez vérifier les champs du formulaire.",
            icon: <XCircle className="h-4 w-4 text-red-500" />,
            className: "bg-red-50 text-red-800 border-red-200"
          });
        } else {
          toast.error("Échec de l'envoi", {
            description: "Une erreur est survenue. Veuillez réessayer plus tard.",
            icon: <XCircle className="h-4 w-4 text-red-500" />,
            className: "bg-red-50 text-red-800 border-red-200"
          });
        }
      }
    } catch (error) {
      console.error("Erreur d'envoi du formulaire:", error);
      toast.error("Échec de l'envoi", {
        description: "Une erreur de connexion est survenue. Veuillez vérifier votre connexion internet.",
        icon: <XCircle className="h-4 w-4 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Données structurées JSON-LD pour le SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />

      <div className="min-h-screen bg-background py-12 px-4 pt-5">
        <div className="max-w-2xl mx-auto relative z-10">
          
          {/* Navigation avec breadcrumb SEO */}
          <nav className="mb-4 relative z-10" aria-label="Fil d'Ariane">
            <Button variant="outline" size="sm" asChild className="relative z-10">
              <Link href="/" className="relative z-10" aria-label="Retour au portfolio de Yanis Harrat">
                <ArrowLeft className="h-4 w-4 mr-2 relative z-10" />
                Retour au portfolio
              </Link>
            </Button>
          </nav>

          <main>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  <h1>Contactez Yanis Harrat - Développeur BTS SIO</h1>
                </CardTitle>
                <CardDescription>
                  Développeur full-stack • Étudiant BTS SIO SISR • Recherche alternance/CDI Paris 2025-2027
                </CardDescription>
                
                {/* Section des informations de contact avec structure sémantique */}
                <section className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground items-center w-full" aria-label="Informations de contact Yanis Harrat">
                  {/* Ligne 1 : GitHub + LinkedIn */}
                  <div className="flex flex-row justify-around items-center bg-muted/60 rounded-lg py-2 px-3 w-full mx-auto gap-3 max-w-md">
                    {(() => {
                      const github = contactInfos.find((c) => c.label.includes("GitHub"));
                      const linkedin = contactInfos.find((c) => c.label.includes("LinkedIn"));
                      return (
                        <>
                          {github && github.href && (
                            <Link
                              href={github.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                              aria-label={github.label}
                            >
                              {github.icon && <github.icon className="w-5 h-5 sm:w-4 sm:h-4" />}
                              <span className="truncate">{github.value}</span>
                            </Link>
                          )}
                          {linkedin && linkedin.href && (
                            <Link
                              href={linkedin.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                              aria-label={linkedin.label}
                            >
                              {linkedin.icon && <linkedin.icon className="w-5 h-5 sm:w-4 sm:h-4" />}
                              <span className="truncate">{linkedin.value}</span>
                            </Link>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  
                  {/* Ligne 2 : Instagram + Twitter (X) */}
                  <div className="flex flex-row justify-around items-center bg-muted/60 rounded-lg py-2 px-3 w-full mx-auto gap-3 max-w-md">
                    {(() => {
                      const instagram = contactInfos.find((c) => c.label.includes("Instagram"));
                      const twitter = contactInfos.find((c) => c.label.includes("Twitter"));
                      return (
                        <>
                          {instagram && instagram.href && (
                            <Link
                              href={instagram.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                              aria-label={instagram.label}
                            >
                              {instagram.icon && <instagram.icon className="w-5 h-5 sm:w-4 sm:h-4" />}
                              <span className="truncate">{instagram.value}</span>
                            </Link>
                          )}
                          {twitter && twitter.href && (
                            <Link
                              href={twitter.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                              aria-label={twitter.label}
                            >
                              {twitter.icon && <twitter.icon className="w-5 h-5 sm:w-4 sm:h-4" />}
                              <span className="truncate">{twitter.value}</span>
                            </Link>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  
                  {/* Ligne 3 : Localisation + Téléphone */}
                  <div className="flex flex-row justify-around items-center bg-muted/60 rounded-lg py-2 px-3 w-full mx-auto gap-3 max-w-md">
                    {(() => {
                      const localisation = contactInfos.find((c) => c.label.includes("Localisation"));
                      const tel = contactInfos.find((c) => c.label.includes("Téléphone"));
                      return (
                        <>
                          {localisation && (
                            <div className="flex items-center gap-2 min-w-0" aria-label={localisation.label}>
                              {localisation.icon && (
                                <span className="flex items-center justify-center">
                                  <localisation.icon className="w-5 h-5 sm:w-4 sm:h-4" />
                                </span>
                              )}
                              <span>{localisation.value}</span>
                            </div>
                          )}
                          {tel && (
                            <a
                              href={tel.href || `tel:${tel.value}`}
                              className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                              aria-label={tel.label}
                            >
                              {tel.icon && (
                                <span className="flex items-center justify-center">
                                  <tel.icon className="w-5 h-5 sm:w-4 sm:h-4" />
                                </span>
                              )}
                              <span>{tel.value}</span>
                            </a>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  
                  {/* Ligne 4 : Email */}
                  <div className="flex flex-row justify-center items-center bg-muted/60 rounded-lg py-2 px-3 max-w-xs w-full mx-auto">
                    {(() => {
                      const email = contactInfos.find((c) => c.label.includes("Email"));
                      return (
                        email && (
                          <a
                            href={`mailto:${email.value}`}
                            className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                            aria-label={email.label}
                          >
                            {email.icon && (
                              <span className="flex items-center justify-center">
                                <email.icon className="w-5 h-5 sm:w-4 sm:h-4" />
                              </span>
                            )}
                            <span className="truncate">{email.value}</span>
                          </a>
                        )
                      );
                    })()}
                  </div>
                </section>
                <Separator className="mt-4" />
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Formulaire de contact avec labels SEO optimisés */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Formulaire de contact professionnel">
                  {/* Champs pour le nom et le prénom */}
                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <legend className="sr-only">Informations personnelles</legend>
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="mb-2 block">
                        Prénom *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        autoComplete="given-name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="mb-2 block">
                        Nom *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Votre nom"
                        autoComplete="family-name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </fieldset>

                  {/* Champ pour l'adresse e-mail */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="mb-2 block">
                      Email professionnel *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="votre@email.com"
                      autoComplete="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Champ de sélection pour le type de contact */}
                  <div className="space-y-3">
                    <Label className="mb-2 block">Type de demande professionnelle *</Label>
                    <Controller
                      name="reason"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full max-w-full whitespace-normal break-words min-h-[4rem]" aria-label="Sélectionner le type de demande">
                            <SelectValue placeholder="Sélectionnez votre demande (alternance, CDI, stage...)" />
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
                      )}
                    />
                    {errors.reason && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.reason.message}
                      </p>
                    )}
                  </div>

                  {/* Champ pour l'objet du message */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="mb-2 block">
                      Objet du message *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Ex: Proposition alternance développeur BTS SIO"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Champ de texte pour le message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="mb-2 block">
                      Message détaillé *
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Décrivez votre proposition (alternance, mission, contexte entreprise, technologies utilisées, équipe...)..."
                      className="resize-none"
                      {...register("message")}
                    />

                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Champ pour le téléchargement d'un fichier (optionnel) */}
                  <div className="space-y-2">
                    <Label htmlFor="file" className="mb-2 block">
                      Document joint (CV, offre, présentation...) - Optionnel
                    </Label>
                    <Input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                      aria-describedby="file-help"
                    />
                    <p id="file-help" className="text-xs text-muted-foreground">
                      Formats acceptés : PDF, Word, images (max 10MB)
                    </p>
                    {file && (
                      <div className="flex items-center gap-2 mt-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {file.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Bouton de soumission du formulaire */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                    aria-describedby="submit-help"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                  <p id="submit-help" className="text-xs text-center text-muted-foreground mt-2">
                    Réponse garantie sous 24h • Toutes demandes professionnelles bienvenues
                  </p>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
}