import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    const asideContent = (
        <div className="flex flex-col items-center text-center text-white">
            <img
                src="/images/paysage-bleu.png"
                alt="Illustration d'un paysage nocturne"
                className="w-full max-w-sm"
            />

            <p className="mt-10 max-w-sm text-lg text-white/80">
                Recevez un lien sécurisé pour réinitialiser votre mot de passe
                et reprendre votre parcours Totem Mind en toute sérénité.
            </p>
        </div>
    );

    return (
        <AuthLayout
            aside={asideContent}
            asideClassName="bg-brand-midnight"
            backgroundClassName="bg-brand-ocean"
            footerVariant="light"
        >
            <Head title="Mot de passe oublié" />

            <div className="rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/10 backdrop-blur">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-white">
                        Mot de passe oublié
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Indiquez votre adresse mail et nous vous enverrons un
                        lien pour définir un nouveau mot de passe.
                    </p>
                </div>

                {status && (
                    <div className="mt-6 rounded-full bg-emerald-400/20 px-6 py-3 text-center text-sm font-semibold text-emerald-100">
                        {status}
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
                            isFocused
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError
                            message={errors.email}
                            variant="brand"
                            className="mt-2"
                        />
                    </div>

                    <PrimaryButton
                        type="submit"
                        variant="brand"
                        disabled={processing}
                        className="w-full"
                    >
                        Envoyer le lien de réinitialisation
                    </PrimaryButton>
                </form>
            </div>
        </AuthLayout>
    );
}
