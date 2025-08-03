// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import { z } from 'zod'; // Importation de Zod

// Définition du schéma de validation (identique à celui du front-end)
const contactFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères.").max(50, "Le prénom ne doit pas dépasser 50 caractères."),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères.").max(50, "Le nom ne doit pas dépasser 50 caractères."),
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  reason: z.string().min(1, "Veuillez sélectionner un type de contact."),
  subject: z.string().min(5, "L'objet doit contenir au moins 5 caractères.").max(100, "L'objet ne doit pas dépasser 100 caractères."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères.").max(1000, "Le message ne doit pas dépasser 1000 caractères."),
});

export async function POST(request: NextRequest) {
  let tempFilePath = '';

  try {
    const formData = await request.formData();
    
    // Extraction des données du formulaire
    const formDataObject = Object.fromEntries(formData.entries());
    const file = formData.get('file') as File | null;

    // Validation des données avec Zod
    const validationResult = contactFormSchema.safeParse(formDataObject);

    // Si la validation échoue, renvoyer les erreurs
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: 'Erreur de validation', errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Configuration du transporteur email (utilise Gmail ici)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // ton@gmail.com
        pass: process.env.EMAIL_PASS, // mot de passe d'application
      },
    });

    const attachments = [];

    // Gestion du fichier joint
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // *** CORRECTION pour Vercel : Utiliser /tmp pour les fichiers temporaires ***
      // En production sur Vercel, le seul dossier inscriptible est /tmp.
      // En local, on peut utiliser un dossier 'temp' dans le répertoire du projet.
      const tempDir = process.env.VERCEL_ENV === 'production' ? '/tmp' : path.join(process.cwd(), 'temp');
      
      // Crée le dossier temp s'il n'existe pas
      await mkdir(tempDir, { recursive: true });

      // Sauvegarde temporaire du fichier
      tempFilePath = path.join(tempDir, file.name);
      await writeFile(tempFilePath, buffer);
      
      attachments.push({
        filename: file.name,
        path: tempFilePath,
      });
    }

    // Configuration de l'email
    const reasonLabels: Record<string, string> = {
      'alternance': '🎓 Alternance',
      'cdi': '💼 CDI',
      'stage': '📄 Stage',
      'aide': '🤝 Demande d\'aide',
      'rdv': '📅 Prise de RDV',
      'contact': '💬 Prise de contact'
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // ton email où tu veux recevoir les messages
      subject: `[Portfolio - ${reasonLabels[data.reason] || data.reason}] ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; border-radius: 10px 10px 0 0;">
            <h2>Nouveau message depuis votre portfolio</h2>
            <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px; margin-top: 10px;">
              <strong>${reasonLabels[data.reason] || data.reason}</strong>
            </div>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <p><strong>Prénom :</strong> ${data.firstName}</p>
            <p><strong>Nom :</strong> ${data.lastName}</p>
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Type de contact :</strong> ${reasonLabels[data.reason] || data.reason}</p>
            <p><strong>Objet :</strong> ${data.subject}</p>
            <div style="margin-top: 20px;">
              <strong>Message :</strong>
              <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #667eea;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            ${file ? `<p style="margin-top: 20px;"><strong>Fichier joint :</strong> ${file.name}</p>` : ''}
          </div>
        </div>
      `,
      replyTo: data.email,
      attachments,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    // Suppression du fichier temporaire
    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch (error) {
        console.log('Erreur suppression fichier temp:', error);
      }
    }

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur envoi email:', error);
    
    // Suppression du fichier temporaire en cas d'erreur
    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch (unlinkError) {
        console.log('Erreur suppression fichier temp après échec:', unlinkError);
      }
    }

    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}

// Pour les autres méthodes HTTP
export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
}
