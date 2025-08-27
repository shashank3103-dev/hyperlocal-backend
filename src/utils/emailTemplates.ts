export function verifyOtpTemplate(name: string, otp: string) {
  return {
    subject: "Verify your account 🚀",
    html: `
      <div style="margin:0; padding:0; background:#f9fafb; font-family:Arial, Helvetica, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f9fafb" style="padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                  <td bgcolor="#4f46e5" style="padding:30px; text-align:center; color:#ffffff;">
                    <h1 style="margin:0; font-size:24px; font-weight:bold;">Welcome to Our App 🎉</h1>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding:30px; text-align:center; color:#374151;">
                    <p style="font-size:16px; margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
                    <p style="font-size:16px; margin:0 0 24px;">Thanks for signing up! Use the OTP below to verify your email:</p>
                    
                    <div style="display:inline-block; padding:16px 32px; background:#4f46e5; color:#ffffff; font-size:28px; font-weight:bold; border-radius:8px; letter-spacing:2px;">
                      ${otp}
                    </div>
                    
                    <p style="font-size:14px; margin:24px 0 0; color:#6b7280;">
                      This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td bgcolor="#f3f4f6" style="padding:16px; text-align:center; font-size:12px; color:#9ca3af;">
                    &copy; ${new Date().getFullYear()} Our App. All rights reserved.
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  };
}
