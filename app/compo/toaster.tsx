"use client";

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport
} from "~/compo/toast";
import { useToast } from "~/compo/use-toast";
import Success from "~/assets/toastSuccess.svg";
import Terr from "~/assets/toastError.svg";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, emoji, ...props }) {
                return (
                    <Toast key={id} {...props} className={`${emoji == 'success' ? "bg-[#F9FFFB] border border-[#16CA58]" : "border border-[#EE0027] bg-[#FFF8F4]"}`}>
                        <div className="flex flex-row items-center gap-2">
                            {emoji == "success" ? (
                                <img
                                    src={Success}
                                    className="h-8 w-8"
                                    alt="logo"
                                    width={200}
                                    height={200}
                                />
                            ) : (
                                <img
                                    src={Terr}
                                    className="h-8 w-8"
                                    alt="logo"
                                    width={200}
                                    height={200}
                                />
                            )}
                            <div>
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {description && <ToastDescription>{description}</ToastDescription>}
                            </div>
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
