import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SocialAuthButton from '@/Components/SocialAuthButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const strengthStyles = {
    faible: 'text-rose-200',
    moyen: 'text-yellow-200',
    fort: 'text-emerald-200',
};

const RECAPTCHA_V2_SCRIPT_URL =
    'https://www.google.com/recaptcha/api.js?render=explicit';

const getRecaptchaV3ScriptUrl = (siteKey) =>
    `https://www.google.com/recaptcha/api.js?render=${siteKey}`;

export default function Register() {
    const { props } = usePage();
    const recaptchaConfig = props.recaptcha ?? {};
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        name: '',
        email: '',
        birthdate: '',
        password: '',
        password_confirmation: '',
        captcha_token: '',
    });

    const recaptchaVersion = recaptchaConfig.version ?? 'v2_checkbox';
    const recaptchaAction = recaptchaConfig.action ?? 'register';
    const isRecaptchaV3 = recaptchaVersion === 'v3';
    const siteKey =
        (recaptchaConfig.siteKey ?? '') || import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';
    const recaptchaContainerRef = useRef(null);
    const recaptchaWidgetId = useRef(null);
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const [captchaError, setCaptchaError] = useState('');

    const executeRecaptchaV3 = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (! isRecaptchaV3) {
                resolve('');

                return;
            }

            if (! siteKey || typeof window === 'undefined' || ! window.grecaptcha) {
                setCaptchaError(
                    'Le service reCAPTCHA n’a pas pu être initialisé. Veuillez réessayer.'
                );
                setData('captcha_token', '');
                reject(new Error('reCAPTCHA is not ready.'));

                return;
            }

            window.grecaptcha.ready(() => {
                window.grecaptcha
                    .execute(siteKey, { action: recaptchaAction })
                    .then((token) => {
                        if (! token) {
                            setCaptchaError(
                                'La vérification reCAPTCHA a échoué. Veuillez réessayer.'
                            );
                            setData('captcha_token', '');
                            reject(new Error('Empty reCAPTCHA token.'));

                            return;
                        }

                        setCaptchaError('');
                        setData('captcha_token', token);
                        clearErrors('captcha_token');
                        resolve(token);
                    })
                    .catch((error) => {
                        setCaptchaError(
                            'Le service reCAPTCHA n’a pas pu être exécuté. Veuillez réessayer.'
                        );
                        setData('captcha_token', '');
                        reject(error);
                    });
            });
        });
    }, [
        isRecaptchaV3,
        siteKey,
        recaptchaAction,
        setData,
        clearErrors,
    ]);

    const [isUnderage, setIsUnderage] = useState(false);

    useEffect(() => {
        if (data.email && !data.name) {
            setData('name', data.email);
        }

        if (!data.email && data.name) {
            setData('name', '');
        }
    }, [data.email]);

    const maxBirthdate = useMemo(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }, []);

    const passwordStrength = useMemo(() => {
        const value = data.password;

        if (!value) {
            return null;
        }

        let score = 0;

        if (value.length >= 8) score += 1;
        if (/[A-Z]/.test(value)) score += 1;
        if (/[a-z]/.test(value)) score += 1;
        if (/\d/.test(value)) score += 1;
        if (/[^A-Za-z0-9]/.test(value)) score += 1;

        if (score >= 4) {
            return 'fort';
        }

        if (score >= 3) {
            return 'moyen';
        }

        return 'faible';
    }, [data.password]);

    const handleBirthdateChange = (value) => {
        setData('birthdate', value);

        if (!value) {
            setIsUnderage(false);
            return;
        }

        const birthDate = new Date(value);

        if (Number.isNaN(birthDate.getTime())) {
            setIsUnderage(false);
            return;
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age -= 1;
        }

        setIsUnderage(age < 18);
    };

    const resetRecaptcha = useCallback(() => {
        if (isRecaptchaV3) {
            setData('captcha_token', '');

            return;
        }

        if (
            typeof window !== 'undefined' &&
            window.grecaptcha &&
            recaptchaWidgetId.current !== null
        ) {
            window.grecaptcha.reset(recaptchaWidgetId.current);
        }

        setData('captcha_token', '');
    }, [isRecaptchaV3, setData]);

    const submit = async (e) => {
        e.preventDefault();

        if (isRecaptchaV3) {
            try {
                await executeRecaptchaV3();
            } catch (error) {
                return;
            }
        }

        post(route('register'), {
            onFinish: () => {
                reset('password', 'password_confirmation', 'captcha_token');
                resetRecaptcha();
            },
        });
    };

    useEffect(() => {
        if (! siteKey) {
            setCaptchaError(
                'La clé reCAPTCHA est manquante. Veuillez contacter le support.'
            );

            return;
        }

        if (typeof window === 'undefined') {
            return;
        }

        const scriptUrl = isRecaptchaV3
            ? getRecaptchaV3ScriptUrl(siteKey)
            : RECAPTCHA_V2_SCRIPT_URL;

        const handleLoad = () => {
            if (window.grecaptcha) {
                setIsRecaptchaReady(true);

                if (isRecaptchaV3) {
                    executeRecaptchaV3().catch(() => {
                        setCaptchaError(
                            'Le service reCAPTCHA n’a pas pu être initialisé. Veuillez réessayer.'
                        );
                    });
                }
            } else {
                setCaptchaError(
                    'Le service reCAPTCHA n’a pas pu être initialisé. Veuillez réessayer.'
                );
            }
        };

        if (window.grecaptcha) {
            handleLoad();

            return;
        }

        const existingScript = document.querySelector(
            `script[src="${scriptUrl}"]`
        );

        if (existingScript) {
            existingScript.addEventListener('load', handleLoad);

            if (existingScript.dataset.loaded === 'true' || window.grecaptcha) {
                handleLoad();
            }

            return () => {
                existingScript.removeEventListener('load', handleLoad);
            };
        }

        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', () => {
            script.dataset.loaded = 'true';
            handleLoad();
        });
        script.addEventListener('error', () => {
            setCaptchaError(
                'Le service reCAPTCHA n’a pas pu être chargé. Veuillez réessayer.'
            );
        });

        document.body.appendChild(script);

        return () => {
            script.removeEventListener('load', handleLoad);
        };
    }, [siteKey, isRecaptchaV3, executeRecaptchaV3]);

    useEffect(() => {
        if (
            isRecaptchaV3 ||
            ! isRecaptchaReady ||
            ! siteKey ||
            ! recaptchaContainerRef.current ||
            typeof window === 'undefined'
        ) {
            return;
        }

        window.grecaptcha.ready(() => {
            if (recaptchaWidgetId.current !== null) {
                return;
            }

            recaptchaWidgetId.current = window.grecaptcha.render(
                recaptchaContainerRef.current,
                {
                    sitekey: siteKey,
                    theme: 'dark',
                    callback: (token) => {
                        setCaptchaError('');
                        setData('captcha_token', token ?? '');
                        clearErrors('captcha_token');
                    },
                    'expired-callback': () => {
                        setCaptchaError(
                            'Le jeton reCAPTCHA a expiré. Veuillez recommencer.'
                        );
                        setData('captcha_token', '');
                    },
                    'error-callback': () => {
                        setCaptchaError(
                            'Une erreur est survenue avec reCAPTCHA. Veuillez réessayer.'
                        );
                        setData('captcha_token', '');
                    },
                }
            );
        });
    }, [
        isRecaptchaV3,
        isRecaptchaReady,
        siteKey,
        clearErrors,
        setData,
    ]);

    const asideContent = (
        <div className="flex flex-col items-center text-center text-white lg:self-start">
            <img
                src="/images/loup-blanc.png"
                alt="Illustration d'un loup"
                className="w-full max-w-sm"
            />

            <p className="mt-10 max-w-sm text-lg text-white/80">
                Gagnez de l’argent avec des sondages rémunérés et rejoignez une
                communauté passionnée par les esprits totems.
            </p>
        </div>
    );

    return (
        <AuthLayout
            aside={asideContent}
            asideClassName="bg-brand-midnight lg:items-start"
            footerVariant="light"
            showLogo={false}
        >
            <Head title="Inscription" />

            <div className="mb-10 mt-12 flex justify-center">
                <ApplicationLogo className="h-16 w-auto" />
            </div>

            <div className="rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-white">
                        S’inscrire par mail
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Créez votre compte en quelques instants pour accéder à
                        l’univers Totem Mind.
                    </p>
                </div>

                <form className="mt-10 space-y-7" onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Adresse mail"
                            variant="brand"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            variant="brand"
                            placeholder="nom@exemple.com"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError
                            message={errors.email}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="birthdate"
                            value="Date de naissance"
                            variant="brand"
                        />

                        <TextInput
                            id="birthdate"
                            type="date"
                            name="birthdate"
                            value={data.birthdate}
                            variant="brand"
                            placeholder="JJ/MM/AAAA"
                            max={maxBirthdate}
                            onChange={(e) =>
                                handleBirthdateChange(e.target.value)
                            }
                            required
                        />

                        {isUnderage && (
                            <p className="mt-2 text-sm text-white">
                                Vous devez avoir au moins 18 ans pour rejoindre
                                le site.
                            </p>
                        )}

                        <InputError
                            message={errors.birthdate}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Mot de passe"
                            variant="brand"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            variant="brand"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        {passwordStrength && (
                            <p
                                className={`mt-3 text-sm font-semibold uppercase tracking-[0.2em] ${
                                    strengthStyles[passwordStrength]
                                }`.trim()}
                            >
                                Mot de passe :{' '}
                                <span className="lowercase">
                                    {passwordStrength}
                                </span>
                                !
                            </p>
                        )}

                        <InputError
                            message={errors.password}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmation du mot de passe"
                            variant="brand"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            variant="brand"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        {isRecaptchaV3 ? (
                            <p className="mx-auto max-w-xs text-center text-xs text-white/70">
                                Ce site est protégé par reCAPTCHA et les{' '}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-sand underline decoration-dotted underline-offset-2"
                                >
                                    règles de confidentialité
                                </a>{' '}
                                et les{' '}
                                <a
                                    href="https://policies.google.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-sand underline decoration-dotted underline-offset-2"
                                >
                                    conditions d’utilisation
                                </a>{' '}
                                de Google s’appliquent.
                            </p>
                        ) : (
                            <div
                                ref={recaptchaContainerRef}
                                className="mx-auto flex min-h-[78px] items-center justify-center"
                            />
                        )}

                        <InputError
                            message={errors.captcha_token ?? captchaError}
                            variant="brand"
                            className="mt-2 text-center"
                        />
                    </div>

                    <PrimaryButton
                        type="submit"
                        variant="brand"
                        disabled={processing}
                    >
                        S’inscrire gratuitement
                    </PrimaryButton>
                </form>
            </div>

            <div className="mt-10 text-center text-sm text-white/70">
                Dès votre inscription (par mail, Google ou Facebook), vous
                recevrez un e-mail pour valider votre compte.
            </div>

            <div className="mt-12 text-center">
                <p className="font-serif text-2xl font-semibold text-white">
                    Ou par
                </p>

                <div className="mt-6 flex flex-col gap-4">
                    <SocialAuthButton provider="google">
                        S’inscrire avec Google
                    </SocialAuthButton>
                    <SocialAuthButton provider="facebook">
                        S’inscrire avec Facebook
                    </SocialAuthButton>
                </div>
            </div>

            <p className="mt-12 text-center text-sm text-white/80">
                Déjà inscrit ?{' '}
                <Link
                    href={route('login')}
                    className="font-semibold text-white hover:text-brand-sand"
                >
                    Connectez-vous !
                </Link>
            </p>
        </AuthLayout>
    );
}
