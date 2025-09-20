import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    const asideContent = (
        <div className="flex flex-col items-center text-center text-white">
            <img
                src="/images/Logo-blanc.png"
                alt="Logo Totem Mind"
                className="w-40"
            />

            <p className="mt-10 max-w-sm text-lg text-white/80">
                Cette étape garantit la sécurité de votre compte avant
                d'accéder aux paramètres sensibles.
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
            <Head title="Confirmation du mot de passe" />

            <div className="rounded-[2.5rem] bg-white/10 p-8 shadow-2xl shadow-black/10 backdrop-blur">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-white">
                        Confirmez votre identité
                    </h1>
                    <p className="mt-4 text-sm text-white/70">
                        Pour protéger vos informations, veuillez saisir votre
                        mot de passe avant de poursuivre.
                    </p>
                </div>

                <form className="mt-10 space-y-7" onSubmit={submit}>
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
                            autoComplete="current-password"
                            isFocused
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError
                            message={errors.password}
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
                        Confirmer
                    </PrimaryButton>
                </form>
            </div>
        </AuthLayout>
    );
}
