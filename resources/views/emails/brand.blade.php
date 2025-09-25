<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $subject ?? config('app.name') }}</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f1ea;">
        @php
            $fontFamily = '"Open Sans", Arial, sans-serif';
            $serifFont = '"Playfair Display", Georgia, serif';
            $lines = $lines ?? [];
            $greeting = $greeting ?? null;
            $salutation = $salutation ?? null;
            $signature = $signature ?? null;
            $cta = $cta ?? null;
            $preheader = $preheader ?? ($lines[0] ?? '');
        @endphp

        <div style="display:none;max-height:0;overflow:hidden;opacity:0;">{{ $preheader }}</div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ea;">
            <tr>
                <td align="center" style="padding:32px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 18px 45px rgba(29,38,61,0.12);">
                        <tr>
                            <td style="background-color:#1d263d;padding:32px 32px 28px;text-align:center;">
                                <span style="display:block;color:#f4f1ea;font-family:{{ $serifFont }};font-size:26px;letter-spacing:0.35em;text-transform:uppercase;">Totem Mind</span>
                                <span style="display:block;margin-top:12px;color:#e0e1dc;font-family:{{ $fontFamily }};font-size:14px;letter-spacing:0.24em;text-transform:uppercase;">Sondages rémunérés</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:40px 32px 32px;font-family:{{ $fontFamily }};color:#1d263d;background-color:#ffffff;">
                                @if($greeting)
                                    <p style="margin:0 0 16px;font-size:18px;font-weight:600;">{{ $greeting }}</p>
                                @endif

                                @foreach($lines as $line)
                                    <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#415a78;">{{ $line }}</p>
                                @endforeach

                                @if($cta && ($cta['label'] ?? null) && ($cta['url'] ?? null))
                                    <p style="margin:24px 0 32px;">
                                        <a href="{{ $cta['url'] }}" style="display:inline-block;padding:16px 32px;background-color:#415a78;color:#f4f1ea;text-decoration:none;border-radius:999px;font-weight:700;font-size:16px;letter-spacing:0.08em;text-transform:uppercase;">
                                            {{ $cta['label'] }}
                                        </a>
                                    </p>
                                @endif

                                @if($salutation || $signature)
                                    <p style="margin:32px 0 0;font-size:16px;line-height:1.6;color:#415a78;">
                                        @if($salutation)
                                            {{ $salutation }}<br>
                                        @endif
                                        @if($signature)
                                            <span style="font-weight:600;color:#1d263d;">{{ $signature }}</span>
                                        @endif
                                    </p>
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color:#e0e1dc;padding:20px 32px;text-align:center;font-family:{{ $fontFamily }};color:#1d263d;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">
                                © {{ date('Y') }} TotemMind.app · Tous droits réservés
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
