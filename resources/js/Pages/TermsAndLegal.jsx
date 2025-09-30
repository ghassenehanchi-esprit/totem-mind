import StaticPageLayout from '@/Layouts/StaticPageLayout';
import { Head } from '@inertiajs/react';

const sections = [
    {
        title: '1. Présentation du site',
        content: [
            "Totem Mind est une plateforme d’études et de sondages rémunérés éditée par Totem Mind SAS, dont le siège social est situé au 24 avenue des Explorateurs, 75000 Paris. L’application permet aux utilisateurs inscrits de participer à des enquêtes en ligne et de percevoir des récompenses en contrepartie de leur temps.",
            "Directrice de la publication : A. Lemoine. Hébergeur : Scaling Cloud SAS – 10 rue du Progrès, 93100 Montreuil."
        ],
    },
    {
        title: '2. Inscription et compte utilisateur',
        content: [
            {
                type: 'list',
                items: [
                    "L’inscription est ouverte aux personnes majeures résidant en France métropolitaine et disposant d’une adresse e-mail valide.",
                    "Un seul compte par personne est autorisé. Totem Mind se réserve le droit de supprimer sans préavis tout compte doublon ou frauduleux.",
                    "Les identifiants de connexion sont strictement personnels. Toute activité réalisée depuis votre compte est réputée effectuée par vous."
                ],
            },
        ],
    },
    {
        title: '3. Conditions de participation',
        content: [
            "L’accès aux enquêtes dépend des critères définis par nos partenaires. Totem Mind ne garantit pas un volume minimal de sondages ni un gain financier fixe.",
            "Les utilisateurs s’engagent à répondre de manière sincère et complète. Tout comportement frauduleux (réponses incohérentes, utilisation d’automatisation, multi-compte) peut entraîner la suspension définitive du compte."
        ],
    },
    {
        title: '4. Récompenses et paiements',
        content: [
            {
                type: 'list',
                items: [
                    "Les récompenses (euros ou bons d’achat) sont créditées sur votre espace personnel après validation des réponses par nos partenaires.",
                    "Un seuil minimal de 20 € est requis pour demander un paiement. Les virements sont effectués sous 30 jours ouvrés après validation de la demande.",
                    "Totem Mind peut annuler un gain en cas de fraude avérée ou de non-respect des présentes conditions générales."
                ],
            },
        ],
    },
    {
        title: '5. Obligations de l’utilisateur',
        content: [
            {
                type: 'list',
                items: [
                    'Fournir des informations exactes lors de l’inscription et les mettre à jour en cas de changement.',
                    'Respecter les règles de confidentialité des enquêtes et ne pas diffuser les contenus auxquels vous avez accès.',
                    'Utiliser la plateforme dans le respect des lois en vigueur et des droits des tiers.'
                ],
            },
        ],
    },
    {
        title: '6. Propriété intellectuelle',
        content: [
            "Tous les éléments du site (textes, images, logo, interfaces) sont la propriété exclusive de Totem Mind ou de ses partenaires. Toute reproduction, représentation ou exploitation non autorisée est strictement interdite."
        ],
    },
    {
        title: '7. Responsabilité',
        content: [
            "Totem Mind s’efforce d’assurer un accès continu au service mais ne peut garantir l’absence d’interruptions ou d’erreurs. La responsabilité de Totem Mind ne saurait être engagée en cas de dommages indirects (pertes de gains, perte de données, etc.).",
            "Vous êtes responsable de la compatibilité de votre matériel et de votre connexion internet pour accéder à la plateforme."
        ],
    },
    {
        title: '8. Données personnelles',
        content: [
            "Les données collectées sont traitées conformément à notre politique de confidentialité. Vous disposez à tout moment d’un droit d’accès, de rectification et d’opposition à vos données personnelles. Pour en savoir plus, consultez la rubrique dédiée."
        ],
    },
    {
        title: '9. Modifications des CGU',
        content: [
            "Totem Mind peut modifier les présentes conditions générales pour prendre en compte l’évolution du service ou la réglementation. Les utilisateurs seront informés des changements significatifs par e-mail ou via l’application. La poursuite de l’utilisation du service vaut acceptation des nouvelles CGU."
        ],
    },
    {
        title: '10. Loi applicable et juridiction',
        content: [
            "Les présentes CGU sont soumises au droit français. En cas de litige et après tentative de résolution amiable, les tribunaux compétents de Paris seront seuls compétents."
        ],
    },
    {
        title: '11. Responsabilité en cas de violation du contrat',
        content: [
            "En cas de manquement grave aux CGU (fraude, usurpation d’identité, divulgation d’informations confidentielles), Totem Mind pourra suspendre ou clôturer immédiatement le compte de l’utilisateur fautif, sans préjudice des éventuels recours judiciaires."
        ],
    },
    {
        title: 'Mentions légales',
        content: [
            {
                type: 'list',
                items: [
                    'Éditeur : Totem Mind SAS – Capital social : 50 000 € – SIRET : 902 458 123 00027.',
                    'Adresse : 24 avenue des Explorateurs, 75000 Paris – contact@totemmind.app.',
                    'Directrice de la publication : Anaïs Lemoine.',
                    'Hébergeur : Scaling Cloud SAS – 10 rue du Progrès, 93100 Montreuil – +33 1 23 45 67 89.',
                    'Design & développement : Totem Mind Studio.',
                    'Pour toute question, contactez-nous via le formulaire dédié ou à l’adresse support@totemmind.app.'
                ],
            },
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

export default function TermsAndLegal() {
    return (
        <StaticPageLayout
            title="Conditions Générales d’Utilisation & mentions légales"
            lead="Consultez les règles applicables à l’utilisation de Totem Mind, les obligations des utilisateurs et les informations légales de la plateforme."
            contentClassName="space-y-10"
        >
            <Head title="CGU & mentions légales" />

            {sections.map((section) => renderSection(section))}

            <p className="pt-2 text-sm text-brand-midnight/60">
                Dernière mise à jour : 8 mai 2024.
            </p>
        </StaticPageLayout>
    );
}
