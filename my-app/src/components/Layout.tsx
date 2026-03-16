import type { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{
    title: string;
    subtitle?: string;
}>;

export function Layout({ title, subtitle, children }: LayoutProps) {
    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4 p-md-5">
                                <h1 className="h3 mb-2 text-center">{title}</h1>
                                {subtitle ? (
                                    <p className="text-muted text-center mb-4">{subtitle}</p>
                                ) : null}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}