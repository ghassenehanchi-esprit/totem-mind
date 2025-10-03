import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function EmailNotifications() {
    const { data, setData } = useForm({
        email: '',
        updates: true,
        reminders: true,
    });
    const [formErrors, setFormErrors] = useState({});
    const [saved, setSaved] = useState(false);

    const submit = (event) => {
        event.preventDefault();
        const trimmedEmail = data.email.trim();
        const nextErrors = {};

        if (!trimmedEmail) {
            nextErrors.email = 'Veuillez renseigner votre adresse mail.';
        } else {
            const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

            if (!emailPattern.test(trimmedEmail)) {
                nextErrors.email = 'Veuillez saisir une adresse mail valide.';
            }
        }

        if (!data.updates && !data.reminders) {
            nextErrors.notifications =
                'Sélectionnez au moins un type de notification.';
        }

        setFormErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setSaved(false);
            return;
        }

        if (trimmedEmail !== data.email) {
            setData('email', trimmedEmail);
        }

        setSaved(true);
    };

    return (
        <AuthLayout
            footerVariant="light"
            showLogo={false}
        >
            <Head title="Notifications par mail" />

            <div className="mb-10 mt-12 flex justify-center">
                <ApplicationLogo className="h-16 w-auto" />
            </div>

            <div className="rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-white">
                        Notifications par e-mail
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Recevez des rappels de vos gains à retirer.
                    </p>
                </div>

                {saved && (
                    <div className="mt-6 rounded-full bg-emerald-400/20 px-6 py-3 text-center text-sm font-semibold text-emerald-100">
                        Vos préférences ont été enregistrées ! Un récapitulatif
                        vous sera envoyé par mail.
                    </div>
                )}

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
                            onChange={(event) => {
                                setData('email', event.target.value);
                                setSaved(false);
                            }}
                            required
                        />

                        <InputError
                            message={formErrors.email}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <div className="rounded-[2rem] bg-white/5 p-6">
                        <p className="text-sm text-white/70">
                            Sélectionnez les notifications qui vous intéressent.
                        </p>

                        <div className="mt-6 space-y-4">
                            <label className="flex items-start gap-3 text-sm text-white/90">
                                <Checkbox
                                    checked={data.updates}
                                    onChange={(event) => {
                                        setData('updates', event.target.checked);
                                        setSaved(false);
                                    }}
                                    className="mt-1 size-5 border-white/40 text-[#1d263d] focus:ring-[#1d263d] focus:ring-offset-0"
                                />
                                <span>
                                    <span className="font-semibold text-white">
                                        Nouveautés Totem Mind
                                    </span>
                                    <span className="block text-white/70">
                                        Recevez les annonces de nouvelles fonctionnalités et
                                        d’événements spéciaux.
                                    </span>
                                </span>
                            </label>

                            <label className="flex items-start gap-3 text-sm text-white/90">
                                <Checkbox
                                    checked={data.reminders}
                                    onChange={(event) => {
                                        setData('reminders', event.target.checked);
                                        setSaved(false);
                                    }}
                                    className="mt-1 size-5 border-white/40 text-[#1d263d] focus:ring-[#1d263d] focus:ring-offset-0"
                                />
                                <span>
                                    <span className="font-semibold text-white">
                                        Rappels et suivis
                                    </span>
                                    <span className="block text-white/70">
                                        Recevez des rappels de vos gains à retirer.
                                    </span>
                                </span>
                            </label>
                        </div>

                        <InputError
                            message={formErrors.notifications}
                            variant="brand"
                            className="mt-4"
                        />
                    </div>

                    <PrimaryButton
                        type="submit"
                        variant="brand"
                        className="text-black hover:bg-[#1b263b] hover:text-white"
                    >
                        Enregistrer mes préférences
                    </PrimaryButton>
                </form>
            </div>

            <p className="mt-8 text-center text-xs text-white/70">
                Vous pourrez modifier ou arrêter ces notifications à tout moment
                depuis votre espace personnel.
            </p>

            <p className="mt-6 text-center text-sm text-white/80">
                Déjà membre ?{' '}
                <Link
                    href={route('login')}
                    className="font-semibold text-white hover:text-brand-sand"
                >
                    Connectez-vous.
                </Link>
            </p>
        </AuthLayout>
    );
}
