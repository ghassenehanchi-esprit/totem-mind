import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SocialAuthButton from '@/Components/SocialAuthButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const strengthStyles = {
    faible: 'text-rose-200',
    moyen: 'text-yellow-200',
    fort: 'text-emerald-200',
};

const RECAPTCHA_SCRIPT_URL = 'https://www.google.com/recaptcha/api.js?render=explicit';

export default function Register({ socialProviders = [] }) {
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

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';
    const recaptchaContainerRef = useRef(null);
    const recaptchaWidgetId = useRef(null);
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const [captchaError, setCaptchaError] = useState('');

    const [isUnderage, setIsUnderage] = useState(false);

    const providerSet = new Set(socialProviders);
    const hasGoogle = providerSet.has('google');
    const hasFacebook = providerSet.has('facebook');
    const hasSocialProviders = hasGoogle || hasFacebook;

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

    const resetRecaptcha = () => {
        if (
            typeof window !== 'undefined' &&
            window.grecaptcha &&
            recaptchaWidgetId.current !== null
        ) {
            window.grecaptcha.reset(recaptchaWidgetId.current);
        }

        setData('captcha_token', '');
    };

    const submit = (e) => {
        e.preventDefault();

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

        if (window.grecaptcha) {
            setIsRecaptchaReady(true);

            return;
        }

        const handleLoad = () => {
            if (window.grecaptcha) {
                setIsRecaptchaReady(true);
            } else {
                setCaptchaError(
                    'Le service reCAPTCHA n’a pas pu être initialisé. Veuillez réessayer.'
                );
            }
        };

        const existingScript = document.querySelector(
            `script[src="${RECAPTCHA_SCRIPT_URL}"]`
        );

        if (existingScript) {
            existingScript.addEventListener('load', handleLoad);

            if (existingScript.dataset.loaded === 'true') {
                handleLoad();
            }

            return () => {
                existingScript.removeEventListener('load', handleLoad);
            };
        }

        const script = document.createElement('script');
        script.src = RECAPTCHA_SCRIPT_URL;
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
    }, [siteKey]);

    useEffect(() => {
        if (
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
    }, [isRecaptchaReady, siteKey, clearErrors, setData]);

    useEffect(() => {
        if (typeof window === 'undefined' || ! isRecaptchaReady) {
            return undefined;
        }

        const hideTestingBanner = (root = document.body) => {
            if (! root) {
                return;
            }

            const banner = Array.from(
                root.querySelectorAll('div')
            ).find((node) =>
                node.textContent &&
                node.textContent
                    .replace(/\s+/g, ' ')
                    .toLowerCase()
                    .includes('for testing purposes only')
            );

            if (banner?.parentElement) {
                banner.parentElement.style.setProperty('display', 'none', 'important');
            }
        };

        hideTestingBanner();

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                hideTestingBanner(mutation.target instanceof HTMLElement ? mutation.target : undefined);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [isRecaptchaReady]);

    const asideContent = (
        <div className="flex flex-col items-center text-center text-white lg:self-start">
            <ApplicationLogo className="h-16 w-auto" />

            <img
                src="/images/loup-blanc.png"
                alt="Illustration d'un loup"
                className="mt-12 w-full max-w-sm"
            />

            <p className="mt-10 max-w-sm text-lg font-serif text-white/80">
                Gagnez de l'argent avec des sondages rémunérés !
            </p>
        </div>
    );

    return (
        <AuthLayout
            aside={asideContent}
            asideClassName="bg-brand-midnight lg:items-start"
            mainWidthClassName="lg:w-3/5"
            asideWidthClassName="lg:w-2/5"
            footerVariant="light"
            showLogo={false}
        >
            <Head title="Inscription" />

            <div className="mt-12 rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
                {hasSocialProviders && (
                    <div className="text-center">
                        <p className="font-serif text-2xl font-semibold text-white">
                            S’inscrire avec
                        </p>

                        <div className="mt-6 flex flex-col gap-4">
                            {hasGoogle && (
                                <SocialAuthButton
                                    provider="google"
                                    href={route('socialite.redirect', {
                                        provider: 'google',
                                    })}
                                >
                                    S’inscrire avec Google
                                </SocialAuthButton>
                            )}

                            {hasFacebook && (
                                <SocialAuthButton
                                    provider="facebook"
                                    href={route('socialite.redirect', {
                                        provider: 'facebook',
                                    })}
                                >
                                    S’inscrire avec Facebook
                                </SocialAuthButton>
                            )}
                        </div>
                    </div>
                )}

                <div className={`text-center ${hasSocialProviders ? 'mt-12' : ''}`}>
                    <h1 className="text-4xl font-semibold text-white">
                        S’inscrire par mail
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Créez votre compte en 1mn
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
                        <div
                            ref={recaptchaContainerRef}
                            className="register-recaptcha mx-auto flex min-h-[78px] items-center justify-center"
                        />

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

            <p className="mt-12 text-center text-sm text-white/80">
                Déjà inscrit ?{' '}
                <Link
                    href={route('login')}
                    className="inline-block font-semibold text-white underline decoration-2 underline-offset-4 transition-colors hover:text-brand-sand"
                >
                    Connectez-vous !
                </Link>
            </p>
        </AuthLayout>
    );
}
