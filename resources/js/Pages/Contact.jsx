import StaticPageLayout from '@/Layouts/StaticPageLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const discoverOptions = [
    'Réseaux sociaux',
    'Recommandation d’un ami',
    'Publicité en ligne',
    'Moteur de recherche',
    'Autre',
];

export default function Contact() {
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        event.currentTarget.reset();
        setStatusMessage('Votre message a bien été pris en compte. Notre équipe reviendra vers vous dans les plus brefs délais.');
    };

    return (
        <StaticPageLayout
            title="Contact"
            lead="Besoin d’assistance ou envie d’en savoir plus ? Notre équipe est à votre écoute pour vous accompagner dans votre aventure Totem Mind."
            contentClassName="space-y-8"
        >
            <Head title="Contact" />

            {statusMessage ? (
                <div className="rounded-2xl border border-brand-ocean/20 bg-brand-ocean/10 px-6 py-4 text-sm text-brand-midnight">
                    {statusMessage}
                </div>
            ) : null}

            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-midnight/70">
                            Nom*
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full rounded-2xl border border-brand-sand/80 bg-white px-4 py-3 text-sm text-brand-midnight placeholder-brand-midnight/30 shadow-inner focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                            placeholder="Votre nom complet"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-midnight/70">
                            Adresse e-mail*
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full rounded-2xl border border-brand-sand/80 bg-white px-4 py-3 text-sm text-brand-midnight placeholder-brand-midnight/30 shadow-inner focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                            placeholder="vous@exemple.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-midnight/70">
                        Sujet du message*
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        className="w-full rounded-2xl border border-brand-sand/80 bg-white px-4 py-3 text-sm text-brand-midnight placeholder-brand-midnight/30 shadow-inner focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                        placeholder="Expliquez en quelques mots la raison de votre message"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-midnight/70">
                        Message*
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full rounded-2xl border border-brand-sand/80 bg-white px-4 py-3 text-sm text-brand-midnight placeholder-brand-midnight/30 shadow-inner focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                        placeholder="Décrivez votre demande ou votre question"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="discover" className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-midnight/70">
                        Comment avez-vous connu Totem Mind ?
                    </label>
                    <select
                        id="discover"
                        name="discover"
                        className="w-full appearance-none rounded-2xl border border-brand-sand/80 bg-white px-4 py-3 text-sm text-brand-midnight shadow-inner focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Sélectionnez une option
                        </option>
                        {discoverOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-4">
                    <label className="flex items-start gap-3 text-sm text-brand-midnight/80">
                        <input
                            type="checkbox"
                            name="privacy"
                            required
                            className="mt-1 size-4 rounded border-brand-sand/80 text-brand-midnight focus:ring-brand-ocean/50"
                        />
                        <span>
                            J’accepte la politique de confidentialité.
                        </span>
                    </label>

                    <div className="grid gap-2 sm:grid-cols-[auto,1fr] sm:items-center">
                        <label
                            htmlFor="captcha"
                            className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-midnight/70"
                        >
                            14 + 9 =
                        </label>
                        <input
                            id="captcha"
                            name="captcha"
                            type="number"
                            required
                            className="w-full rounded-2xl border border-brand-sand/80 bg-white px-4 py-3 text-sm text-brand-midnight placeholder-brand-midnight/30 shadow-inner focus:border-brand-ocean focus:outline-none focus:ring-2 focus:ring-brand-ocean/30"
                            placeholder="Votre réponse"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-brand-midnight/60">* Champs obligatoires</p>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-brand-midnight px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-xl shadow-brand-midnight/20 transition-colors duration-200 hover:bg-brand-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ocean/40"
                    >
                        Envoyer le message
                    </button>
                </div>
            </form>
        </StaticPageLayout>
    );
}
