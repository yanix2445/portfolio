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

// Liste des informations de contact à afficher
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


type ContactReason = {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  variant: "default" | "secondary" | "outline" | "destructive";
};

// Liste des raisons de contact pour le champ Select
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
      <div className="min-h-screen bg-background py-12 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          {/* Bouton pour revenir à la page d'accueil */}
          <div className="mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l&apos;accueil
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Contactez-moi</CardTitle>
              <CardDescription>
                Étudiant BTS SIO SISR • À la recherche d&apos;alternance/CDI
              </CardDescription>
              {/* Section des informations de contact avec un design responsive */}
              <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground items-center w-full ">
                {/* Ligne 1 : GitHub + LinkedIn */}
                <div className="flex flex-row justify-around items-center bg-muted/60 rounded-lg py-2 px-3 w-full mx-auto gap-3 max-w-md">
                  {(() => {
                    const github = contactInfos.find((c) => c.label === "GitHub");
                    const linkedin = contactInfos.find((c) => c.label === "LinkedIn");
                    return (
                      <>
                        {github && github.href && (
                          <Link
                            href={github.href}
                            target="_blank"
                            className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                          >
                            {github.icon && <github.icon className="w-5 h-5 sm:w-4 sm:h-4" />}
                            <span className="truncate">{github.value}</span>
                          </Link>
                        )}
                        {linkedin && linkedin.href && (
                          <Link
                            href={linkedin.href}
                            target="_blank"
                            className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
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
                    const instagram = contactInfos.find((c) => c.label === "Instagram");
                    const twitter = contactInfos.find((c) => c.label === "Twitter");
                    return (
                      <>
                        {instagram && instagram.href && (
                          <Link
                            href={instagram.href}
                            target="_blank"
                            className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
                          >
                            {instagram.icon && <instagram.icon className="w-5 h-5 sm:w-4 sm:h-4" />}
                            <span className="truncate">{instagram.value}</span>
                          </Link>
                        )}
                        {twitter && twitter.href && (
                          <Link
                            href={twitter.href}
                            target="_blank"
                            className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
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
                    const localisation = contactInfos.find((c) => c.label === "Localisation");
                    const tel = contactInfos.find((c) => c.label === "Téléphone");
                    return (
                      <>
                        {localisation && (
                          <div className="flex items-center gap-2 min-w-0">
                            {localisation.icon && (
                              <span className="flex items-center justify-center ">
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
                          >
                            {tel.icon && (
                              <span className="flex items-center justify-center ">
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
                    const email = contactInfos.find((c) => c.label === "Email");
                    return (
                      email && (
                        <a
                          href={`mailto:${email.value}`}
                          className="flex items-center gap-2 hover:text-foreground transition-colors min-w-0"
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
              </div>
              <Separator className="mt-4" />
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Champs pour le nom et le prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="mb-2 block ">
                      Prénom *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
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
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Champ pour l'adresse e-mail */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="mb-2 block">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="votre@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Champ de sélection pour le type de contact */}
                <div className="space-y-3">
                  <Label className="mb-2 block">Type de contact *</Label>
                  <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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
                    )}
                  />
                  {errors.reason && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                {/* Champ pour l'objet du message */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="mb-2 block">
                    Objet *
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Sujet de votre message"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Champ de texte pour le message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Décrivez votre demande en détail..."
                    className="resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Champ pour le téléchargement d'un fichier (optionnel) */}
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

                <Separator />

                {/* Bouton de soumission du formulaire */}
                <Button
                  type="submit"
                  disabled={isLoading}
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
    </>
  );
}
