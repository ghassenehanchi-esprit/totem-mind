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
        surveys: true,
        reminders: true,
        tips: false,
        frequency: 'hebdomadaire',
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

        if (!data.updates && !data.surveys && !data.reminders && !data.tips) {
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

    const asideContent = (
        <div className="flex flex-col items-center text-center text-white">
            <img
                src="/images/paysage-bleu.png"
                alt="Illustration d’un paysage onirique"
                className="w-full max-w-sm"
            />

            <p className="mt-10 max-w-sm text-lg text-white/80">
                Choisissez les messages que vous souhaitez recevoir pour
                rester connecté à l’univers Totem Mind.
            </p>
        </div>
    );

    return (
        <AuthLayout
            aside={asideContent}
            asideClassName="bg-brand-midnight"
            backgroundClassName="bg-brand-ocean"
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
                        Personnalisez les alertes reçues pour suivre l’actualité
                        des sondages, de vos gains et des nouveautés Totem Mind.
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
                                    className="mt-1 size-5 border-white/40 text-brand-sand focus:ring-brand-sand focus:ring-offset-0"
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
                                    checked={data.surveys}
                                    onChange={(event) => {
                                        setData('surveys', event.target.checked);
                                        setSaved(false);
                                    }}
                                    className="mt-1 size-5 border-white/40 text-brand-sand focus:ring-brand-sand focus:ring-offset-0"
                                />
                                <span>
                                    <span className="font-semibold text-white">
                                        Sondages disponibles
                                    </span>
                                    <span className="block text-white/70">
                                        Soyez averti dès qu’un nouveau sondage rémunéré est
                                        publié.
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
                                    className="mt-1 size-5 border-white/40 text-brand-sand focus:ring-brand-sand focus:ring-offset-0"
                                />
                                <span>
                                    <span className="font-semibold text-white">
                                        Rappels et suivis
                                    </span>
                                    <span className="block text-white/70">
                                        Recevez des rappels pour finaliser vos sondages et suivre
                                        vos gains.
                                    </span>
                                </span>
                            </label>

                            <label className="flex items-start gap-3 text-sm text-white/90">
                                <Checkbox
                                    checked={data.tips}
                                    onChange={(event) => {
                                        setData('tips', event.target.checked);
                                        setSaved(false);
                                    }}
                                    className="mt-1 size-5 border-white/40 text-brand-sand focus:ring-brand-sand focus:ring-offset-0"
                                />
                                <span>
                                    <span className="font-semibold text-white">
                                        Conseils personnalisés
                                    </span>
                                    <span className="block text-white/70">
                                        Recevez des astuces pour optimiser votre expérience et vos
                                        gains.
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

                    <div>
                        <InputLabel
                            htmlFor="frequency"
                            value="Fréquence d’envoi"
                            variant="brand"
                        />

                        <select
                            id="frequency"
                            name="frequency"
                            value={data.frequency}
                            onChange={(event) => {
                                setData('frequency', event.target.value);
                                setSaved(false);
                            }}
                            className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-0"
                        >
                            <option value="hebdomadaire">Une fois par semaine</option>
                            <option value="mensuelle">Une fois par mois</option>
                            <option value="ponctuelle">Seulement pour les informations importantes</option>
                        </select>
                    </div>

                    <PrimaryButton type="submit" variant="brand">
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
