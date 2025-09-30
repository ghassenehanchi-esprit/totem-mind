import StaticPageLayout from '@/Layouts/StaticPageLayout';
import { Head } from '@inertiajs/react';

const sections = [
    {
        title: '1. Introduction',
        content: [
            "Totem Mind accorde une importance particulière à la protection de vos données personnelles. Cette politique de confidentialité explique quelles informations sont collectées, comment elles sont utilisées et les droits dont vous disposez."
        ],
    },
    {
        title: '2. Données collectées',
        content: [
            "Nous recueillons uniquement les données nécessaires au fonctionnement de notre plateforme et à la participation aux sondages.",
            {
                type: 'list',
                items: [
                    'Informations d’identification : nom, prénom, adresse e-mail, numéro de téléphone le cas échéant.',
                    'Informations de profil : âge, genre, code postal, centres d’intérêt et préférences déclarées.',
                    'Données de connexion : adresse IP, identifiants de connexion et journaux techniques pour garantir la sécurité.',
                    'Données liées aux sondages : réponses fournies, historique de participation, statut et récompenses associées.'
                ],
            },
        ],
    },
    {
        title: '3. Utilisation des données',
        content: [
            {
                type: 'list',
                items: [
                    'Création et gestion de votre compte utilisateur.',
                    'Proposition de sondages adaptés à votre profil.',
                    'Envoi de communications liées à votre activité (notifications, rappels, informations importantes).',
                    'Analyse statistique pour améliorer nos services et la qualité des sondages proposés.',
                    'Respect de nos obligations légales et prévention de la fraude.'
                ],
            },
        ],
    },
    {
        title: '4. Partage des données',
        content: [
            "Vos données ne sont jamais vendues. Elles ne sont partagées qu’avec :",
            {
                type: 'list',
                items: [
                    'Nos partenaires de sondages, uniquement pour la mise en relation avec des enquêtes pertinentes et après anonymisation lorsque cela est possible.',
                    'Nos prestataires techniques (hébergement, maintenance, outils d’envoi d’e-mails) strictement nécessaires au fonctionnement du service et soumis à des obligations de confidentialité.',
                    'Les autorités compétentes lorsque la loi l’exige.'
                ],
            },
        ],
    },
    {
        title: '5. Durée de conservation',
        content: [
            "Les données sont conservées pendant la durée nécessaire à la fourniture du service et dans le respect des obligations légales. En l’absence d’activité pendant 24 mois, votre compte et les données associées peuvent être anonymisés ou supprimés."
        ],
    },
    {
        title: '6. Sécurité',
        content: [
            "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre l’accès non autorisé, la perte, la divulgation ou l’altération."
        ],
    },
    {
        title: '7. Droits des utilisateurs',
        content: [
            "Conformément au RGPD, vous disposez des droits suivants :",
            {
                type: 'list',
                items: [
                    'Accéder à vos données personnelles.',
                    'Rectifier des informations inexactes ou incomplètes.',
                    'Demander la suppression de vos données lorsque cela est possible.',
                    'Limiter ou vous opposer à certains traitements.',
                    'Demander la portabilité de vos données dans un format structuré.',
                    'Retirer votre consentement à tout moment pour les traitements fondés sur ce dernier.'
                ],
            },
            "Pour exercer vos droits, vous pouvez nous contacter à l’adresse : privacy@totemmind.app. Une réponse vous sera apportée dans un délai maximum de 30 jours."
        ],
    },
    {
        title: '8. Cookies',
        content: [
            "Des cookies fonctionnels et analytiques peuvent être utilisés pour garantir la sécurité, mesurer l’audience et améliorer l’expérience utilisateur. Vous pouvez gérer vos préférences via les paramètres de votre navigateur ou depuis le bandeau d’information dédié."
        ],
    },
    {
        title: '9. Mise à jour de la politique',
        content: [
            "Cette politique peut être amenée à évoluer. Toute modification importante sera communiquée via l’application ou par e-mail."
        ],
    },
];

function renderSection(section) {
    return (
        <section key={section.title} className="space-y-4">
            <h2 className="font-serif text-2xl text-brand-midnight">{section.title}</h2>
            {section.content.map((paragraph, index) => {
                if (typeof paragraph === 'string') {
                    return (
                        <p key={index} className="text-justify text-brand-midnight/80">
                            {paragraph}
                        </p>
                    );
                }

                if (paragraph?.type === 'list') {
                    return (
                        <ul key={index} className="list-disc space-y-2 pl-6 text-brand-midnight/80">
                            {paragraph.items.map((item) => (
                                <li key={item} className="text-justify">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    );
                }

                return null;
            })}
        </section>
    );
}

export default function PrivacyPolicy() {
    return (
        <StaticPageLayout
            title="Politique de confidentialité"
            lead="Découvrez comment Totem Mind collecte, utilise et protège vos données personnelles lorsque vous participez à nos sondages."
            contentClassName="space-y-10"
        >
            <Head title="Politique de confidentialité" />

            {sections.map((section) => renderSection(section))}

            <p className="pt-2 text-sm text-brand-midnight/60">
                Dernière mise à jour : 8 mai 2024.
            </p>
        </StaticPageLayout>
    );
}
