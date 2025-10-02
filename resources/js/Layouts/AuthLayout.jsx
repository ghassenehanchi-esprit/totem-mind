import ApplicationLogo from '@/Components/ApplicationLogo';
import SiteFooter from '@/Components/SiteFooter';

export default function AuthLayout({
    children,
    aside,
    backgroundClassName = 'bg-brand-ocean',
    containerClassName = '',
    contentWrapperClassName = '',
    asideClassName = 'bg-brand-midnight',
    mainWidthClassName = 'lg:w-1/2',
    asideWidthClassName = 'lg:w-1/2',
    footerVariant = 'light',
    showLogo = true,
    mobileAside = null,
}) {
    const hasAside = Boolean(aside);
    const mobileAsideContent = mobileAside ?? aside;

    return (
        <div
            className={`flex min-h-screen flex-col font-sans text-white ${backgroundClassName}`.trim()}
        >
            <div className="flex flex-1 flex-col">
                {showLogo && (
                    <div className="flex justify-center px-6 pt-10">
                        <ApplicationLogo className="h-16 w-auto" />
                    </div>
                )}

                <div
                    className={`flex flex-1 flex-col ${
                        hasAside ? 'lg:flex-row' : ''
                    } ${containerClassName}`.trim()}
                >
                    <main
                        className={`flex w-full justify-center px-6 pb-12 ${
                            hasAside ? `${mainWidthClassName} lg:px-16` : ''
                        }`.trim()}
                    >
                        <div
                            className={`w-full ${
                                hasAside ? 'max-w-xl' : 'max-w-3xl'
                            } ${contentWrapperClassName}`.trim()}
                        >
                            {children}
                        </div>
                    </main>

                    {hasAside && (
                        <>
                            <div
                                className={`hidden lg:flex ${asideWidthClassName} lg:shrink-0 lg:items-stretch ${
                                    asideClassName
                                }`.trim()}
                            >
                                <div className="flex w-full items-center justify-center px-10 py-12">
                                    {aside}
                                </div>
                            </div>

                            {mobileAsideContent && (
                                <div className={`lg:hidden ${asideClassName}`.trim()}>
                                    <div className="flex w-full items-center justify-center px-10 py-12">
                                        {mobileAsideContent}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <SiteFooter variant={footerVariant} />
        </div>
    );
}
