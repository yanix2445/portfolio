// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const reason = formData.get('reason') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Validation basique
    if (!firstName || !lastName || !email || !reason || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Configuration du transporteur email (utilise Gmail ici)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // ton@gmail.com
        pass: process.env.EMAIL_PASS, // mot de passe d'application
      },
    });

    const attachments = [];
    let tempFilePath = '';

    // Gestion du fichier joint
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Sauvegarde temporaire du fichier
      tempFilePath = path.join(process.cwd(), 'temp', file.name);
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
      subject: `[Portfolio - ${reasonLabels[reason] || reason}] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; border-radius: 10px 10px 0 0;">
            <h2>Nouveau message depuis votre portfolio</h2>
            <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px; margin-top: 10px;">
              <strong>${reasonLabels[reason] || reason}</strong>
            </div>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <p><strong>Prénom :</strong> ${firstName}</p>
            <p><strong>Nom :</strong> ${lastName}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Type de contact :</strong> ${reasonLabels[reason] || reason}</p>
            <p><strong>Objet :</strong> ${subject}</p>
            <div style="margin-top: 20px;">
              <strong>Message :</strong>
              <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #667eea;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            ${file ? `<p style="margin-top: 20px;"><strong>Fichier joint :</strong> ${file.name}</p>` : ''}
          </div>
        </div>
      `,
      replyTo: email,
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