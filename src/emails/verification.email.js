// Verification Email
module.exports = ({ user, verificationURL }) => {

    // Your app's name, used in the subject, copy, wordmark and footer.
    const appName = process.env.APP_NAME || 'AuthKit';

    // SF Pro on Apple devices, Inter where supported, native system fonts elsewhere.
    const font = `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif`;

    const color = {
        page: '#050806',
        card: '#090d0a',
        border: '#18221b',
        tile: '#0d140f',
        tileBorder: '#1b271e',
        divider: '#141d16',
        eyebrow: '#86efac',
        headline: '#ffffff',
        text: '#9aa89d',
        label: '#83948a',
        value: '#ffffff',
        link: '#86efac',
        muted: '#6e7f74',
        footer: '#4e5d53',
        icon: '#e3fbe9',
        badge: '#0e2316'
    };

    // Escapes values from users and links before they go into the HTML.
    const escape = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const safe = {
        app: escape(appName),
        username: escape(user.username),
        email: escape(user.email),
        url: escape(verificationURL)
    };

    // Solid fill that's also drawn as a gradient: the Gmail app's dark mode recolors plain colors but leaves gradients alone.
    const paint = (hex) => `background-color: ${hex}; background-image: linear-gradient(${hex}, ${hex});`;

    // Corner glows from the auth page (solid page color is the fallback).
    const glow = `radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.20), rgba(34, 197, 94, 0) 38%), radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.20), rgba(16, 185, 129, 0) 38%)`;

    // Orbit rings around the badge: thin circles made from hard color stops.
    const rings = [[66, 0.30], [104, 0.20], [146, 0.13], [192, 0.08], [242, 0.05]]
        .map(([radius, alpha]) => `rgba(134, 239, 172, 0) ${radius - 1}px, rgba(134, 239, 172, ${alpha}) ${radius - 0.4}px, rgba(134, 239, 172, ${alpha}) ${radius + 0.4}px, rgba(134, 239, 172, 0) ${radius + 1}px`)
        .join(', ');

    // Hero art, drawn only with CSS gradients (top layer first). Clients without gradients show a solid violet.
    const layers = [
        // Fade into the card
        { image: 'linear-gradient(180deg, rgba(9, 13, 10, 0) 58%, rgba(9, 13, 10, 0.85) 88%, #090d0a 100%)' },
        // Glow behind the badge
        { image: 'radial-gradient(circle 120px at 50% 132px, rgba(74, 222, 128, 0.55) 0%, rgba(74, 222, 128, 0.18) 45%, rgba(74, 222, 128, 0) 100%)' },
        // Orbit dots
        { image: 'radial-gradient(circle at 65.8% 68px, #86efac 0px, #86efac 2.5px, rgba(134, 239, 172, 0.16) 3.3px, rgba(134, 239, 172, 0) 7px)' },
        { image: 'radial-gradient(circle at 24.6% 70px, #6ee7b7 0px, #6ee7b7 2px, rgba(134, 239, 172, 0.16) 2.8px, rgba(134, 239, 172, 0) 5.8px)' },
        { image: 'radial-gradient(circle at 86.5% 105px, #bbf7d0 0px, #bbf7d0 1.5px, rgba(134, 239, 172, 0.16) 2.3px, rgba(134, 239, 172, 0) 4.6px)' },
        { image: 'radial-gradient(circle at 25.2% 200px, #86efac 0px, #86efac 1.5px, rgba(134, 239, 172, 0.16) 2.3px, rgba(134, 239, 172, 0) 4.6px)' },
        // Orbit rings
        { image: `radial-gradient(circle at 50% 132px, rgba(134, 239, 172, 0) 0px, ${rings})` },
        // Aurora
        { image: 'radial-gradient(ellipse 70% 90% at 12% -20%, rgba(34, 197, 94, 0.75) 0%, rgba(34, 197, 94, 0) 60%)' },
        { image: 'radial-gradient(ellipse 60% 80% at 92% -15%, rgba(16, 185, 129, 0.70) 0%, rgba(16, 185, 129, 0) 60%)' },
        { image: 'radial-gradient(ellipse 55% 70% at 50% 132px, rgba(22, 163, 74, 0.42) 0%, rgba(22, 163, 74, 0) 70%)' },
        // Fades the dots out toward the edges
        { image: 'radial-gradient(ellipse 62% 78% at 50% 132px, rgba(5, 26, 13, 0) 0%, rgba(5, 26, 13, 0.55) 45%, #051a0d 75%)' },
        // Dot grid
        { image: 'radial-gradient(circle, rgba(255, 255, 255, 0.13) 0px, rgba(255, 255, 255, 0.13) 1px, rgba(255, 255, 255, 0) 1.6px)', size: '20px 20px', position: '50% 6px', repeat: 'repeat' },
        // Base
        { image: 'linear-gradient(180deg, #0a3319 0%, #090d0a 100%)' }
    ];

    const hero = {
        image: layers.map((layer) => layer.image).join(', '),
        size: layers.map((layer) => layer.size || '100% 100%').join(', '),
        position: layers.map((layer) => layer.position || '0 0').join(', '),
        repeat: layers.map((layer) => layer.repeat || 'no-repeat').join(', ')
    };

    // Envelope flap: two diagonal strokes drawn with gradients.
    const icon = {
        image: `linear-gradient(to top right, rgba(227, 251, 233, 0) 44%, ${color.icon} 44%, ${color.icon} 55%, rgba(227, 251, 233, 0) 55%), linear-gradient(to top left, rgba(227, 251, 233, 0) 44%, ${color.icon} 44%, ${color.icon} 55%, rgba(227, 251, 233, 0) 55%)`,
        size: '50% 66%, 50% 66%',
        position: '0 0, 100% 0'
    };

    return {
        subject: `Verify your ${appName} account`,
        text: `Confirm your email

Hi ${user.username}, welcome to ${appName}. Confirm your email to finish setting up your account.

Verify email address:
${verificationURL}

Expires: in 24 hours
Single use: Yes

Didn't sign up for ${appName}? You can safely ignore this email.

${appName}
This email was sent to ${user.email}. ${appName} will never ask for your password by email.`,
        html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title></title>
    <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
    <style>
        /* Client resets */
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        a[x-apple-data-detectors], #MessageViewBody a { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }

        /* Gmail app dark mode turns white text dark but leaves gradients alone; these wrappers keep the wordmark white there and do nothing elsewhere */
        u + .body .blend-screen { background: #000000; mix-blend-mode: screen; }
        u + .body .blend-difference { background: #000000; mix-blend-mode: difference; }

        /* Gmail on Android ignores gradients written inline, so they are repeated here */
        .hero { background-image: ${hero.image}; background-size: ${hero.size}; background-position: ${hero.position}; background-repeat: ${hero.repeat}; }
        .button { background-image: linear-gradient(90deg, #4ade80 0%, #86efac 100%); }
        .icon { background-image: ${icon.image}, linear-gradient(${color.badge}, ${color.badge}); background-size: ${icon.size}, 100% 100%; background-position: ${icon.position}, 0 0; background-repeat: no-repeat; }

        @media only screen and (max-width: 560px) {
            .outer { padding: 20px 10px 28px 10px !important; }
            .content { padding: 6px 24px 30px 24px !important; }
            .headline { font-size: 24px !important; line-height: 30px !important; }
            .text { font-size: 14px !important; line-height: 22px !important; }
        }
    </style>
</head>
<body class="body" style="margin: 0; padding: 0; background-color: ${color.page}; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

    <div role="article" aria-roledescription="email" aria-label="Verify your ${safe.app} account" lang="en">

    <!-- Preview text shown in the inbox list -->
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
        Confirm your email to finish setting up your ${safe.app} account.&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;
    </div>

    <!-- Page -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${color.page}" style="background-color: ${color.page}; background-image: ${glow};">
        <tr>
            <td class="outer" align="center" style="text-align: center !important; padding: 44px 16px 40px 16px;">

                <!--[if mso]><table role="presentation" width="520" align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;"><tr><td><![endif]-->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; max-width: 520px;">

                    <!-- Card -->
                    <tr>
                        <td>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${color.card}" style="background-color: ${color.card}; border: 1px solid ${color.border}; border-radius: 20px; overflow: hidden; border-collapse: separate !important; border-spacing: 0;">

                                <!-- Hero -->
                                <tr>
                                    <td class="hero" bgcolor="#0c2a16" style="background-color: #0c2a16; background-image: ${hero.image}; background-size: ${hero.size}; background-position: ${hero.position}; background-repeat: ${hero.repeat}; border-radius: 20px 20px 0 0; padding: 22px 28px 0 28px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                                            <!-- Wordmark -->
                                            <tr>
                                                <td align="left" style="text-align: left !important; font-family: ${font}; font-size: 19px; line-height: 24px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff;">
                                                    <div class="blend-screen"><div class="blend-difference">${safe.app}</div></div>
                                                </td>
                                            </tr>

                                            <!-- Badge -->
                                            <tr>
                                                <td align="center" style="text-align: center !important; padding: 38px 0 60px 0;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; border-collapse: separate !important; border-spacing: 0;">
                                                        <tr>
                                                            <td style="padding: 7px; border-radius: 50%; background-color: #0b3018; background-color: rgba(22, 163, 74, 0.12); border: 1px solid #173a22; border: 1px solid rgba(134, 239, 172, 0.10);">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate !important; border-spacing: 0;">
                                                                    <tr>
                                                                        <td align="center" valign="middle" width="78" height="78" bgcolor="#0b1f12" style="text-align: center !important; vertical-align: middle !important; width: 78px; height: 78px; border-radius: 50%; border: 1px solid #16a34a; border-top-color: #86efac; border-left-color: #22c55e; border-right-color: #15803d; border-bottom-color: #047857; background-color: #0b1f12; background-image: linear-gradient(180deg, #11331d 0%, #07140b 100%); box-shadow: 0 22px 48px -8px rgba(21, 128, 61, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.16);">
                                                                            <!--[if mso]><span style="font-family: 'Segoe UI Symbol', 'Segoe UI', sans-serif; font-size: 20px; line-height: 24px; color: #e3fbe9;">&#9993;</span><![endif]-->
                                                                            <!--[if !mso]><!-->
                                                                            <!-- Envelope: light box with a dark box inside, flap drawn on the dark box -->
                                                                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; border-collapse: separate !important; border-spacing: 0;">
                                                                                <tr>
                                                                                    <td style="padding: 2px; border-radius: 6px; font-size: 0; line-height: 0; ${paint(color.icon)}">
                                                                                        <div class="icon" style="width: 26px; height: 18px; border-radius: 4px; background-color: ${color.badge}; background-image: ${icon.image}, linear-gradient(${color.badge}, ${color.badge}); background-size: ${icon.size}, 100% 100%; background-position: ${icon.position}, 0 0; background-repeat: no-repeat;"></div>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                            <!--<![endif]-->
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                        </table>
                                    </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                    <td class="content" align="center" style="text-align: center !important; padding: 6px 44px 40px 44px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                                            <!-- Eyebrow -->
                                            <tr>
                                                <td align="center" style="text-align: center !important; padding-bottom: 14px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; border-collapse: separate !important; border-spacing: 0;">
                                                        <tr>
                                                            <td style="padding: 5px 12px; border-radius: 999px; background-color: #0c2a16; background-color: rgba(34, 197, 94, 0.10); border: 1px solid #174a2a; border: 1px solid rgba(134, 239, 172, 0.22); font-family: ${font}; font-size: 10.5px; line-height: 14px; font-weight: 600; letter-spacing: 1.4px; text-transform: uppercase; color: ${color.eyebrow}; white-space: nowrap;">
                                                                Email verification
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Headline -->
                                            <tr>
                                                <td class="headline" align="center" style="text-align: center !important; padding-bottom: 12px; font-family: ${font}; font-size: 28px; line-height: 34px; font-weight: 700; letter-spacing: -0.8px; color: ${color.headline};">
                                                    Confirm your email
                                                </td>
                                            </tr>

                                            <!-- Text -->
                                            <tr>
                                                <td class="text" align="center" style="text-align: center !important; padding-bottom: 30px; font-family: ${font}; font-size: 15px; line-height: 24px; color: ${color.text};">
                                                    <span style="color: ${color.headline};">Hi ${safe.username},</span> welcome to ${safe.app}. Confirm your email to finish setting up your account.
                                                </td>
                                            </tr>

                                            <!-- Button -->
                                            <tr>
                                                <td style="padding-bottom: 24px;">
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate !important; border-spacing: 0;">
                                                        <tr>
                                                            <td bgcolor="#4ade80" align="center" class="button" style="text-align: center !important; border-radius: 12px; background-color: #4ade80; background-image: linear-gradient(90deg, #4ade80 0%, #86efac 100%); box-shadow: 0 10px 28px -10px rgba(34, 197, 94, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.45); mso-padding-alt: 15px 24px;">
                                                                <a href="${safe.url}" target="_blank" style="display: block; padding: 15px 24px; mso-padding-alt: 0; font-family: ${font}; font-size: 15px; line-height: 20px; font-weight: 600; color: #052e16; text-align: center; text-decoration: none; border-radius: 12px;">
                                                                    Verify email address
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Details -->
                                            <tr>
                                                <td style="padding-bottom: 26px;">
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${color.tile}" style="background-color: ${color.tile}; border: 1px solid ${color.tileBorder}; border-radius: 14px; border-collapse: separate !important; border-spacing: 0;">
                                                        <tr>
                                                            <td align="left" style="text-align: left !important; padding: 14px 18px; font-family: ${font}; font-size: 13px; line-height: 18px; color: ${color.label};">Expires</td>
                                                            <td align="right" style="text-align: right !important; padding: 14px 18px; font-family: ${font}; font-size: 13px; line-height: 18px; font-weight: 500; color: ${color.value};">in 24 hours</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" style="text-align: left !important; padding: 14px 18px; border-top: 1px solid ${color.divider}; font-family: ${font}; font-size: 13px; line-height: 18px; color: ${color.label};">Single use</td>
                                                            <td align="right" style="text-align: right !important; padding: 14px 18px; border-top: 1px solid ${color.divider}; font-family: ${font}; font-size: 13px; line-height: 18px; font-weight: 500; color: ${color.value};">Yes</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Fallback link -->
                                            <tr>
                                                <td align="center" style="text-align: center !important; padding-bottom: 26px; font-family: ${font}; font-size: 12px; line-height: 19px; color: ${color.muted};">
                                                    Button not working? Paste this link into your browser:<br>
                                                    <a href="${safe.url}" target="_blank" style="color: ${color.link}; text-decoration: none; word-break: break-all;">${safe.url}</a>
                                                </td>
                                            </tr>

                                            <!-- Footnote -->
                                            <tr>
                                                <td align="center" style="text-align: center !important; padding-top: 22px; border-top: 1px solid ${color.divider}; font-family: ${font}; font-size: 12.5px; line-height: 20px; color: ${color.muted};">
                                                    Didn't sign up for ${safe.app}? You can safely ignore this email.
                                                </td>
                                            </tr>

                                        </table>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="text-align: center !important; padding: 30px 24px 0 24px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" style="text-align: center !important; padding-bottom: 8px; font-family: ${font}; font-size: 15px; line-height: 20px; font-weight: 700; letter-spacing: -0.4px; color: #879589;">
                                        ${safe.app}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="text-align: center !important; font-family: ${font}; font-size: 12px; line-height: 19px; color: ${color.footer};">
                                        This email was sent to <span style="color: ${color.muted};">${safe.email}</span>.<br>
                                        ${safe.app} will never ask for your password by email.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
                <!--[if mso]></td></tr></table><![endif]-->

            </td>
        </tr>
    </table>

    </div>

</body>
</html>
        `
    };
};