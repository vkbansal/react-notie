declare module "react-notie" {

    interface NotieAlertArguments {
        message: string;
        ttl?: number;
        level: 'SUCCESS' | 'WARN' | 'INFO' | 'ERROR' | 'CONFIRM';
    }

    interface NotieConfirmOptions {
        yesBtnText?: string;
        noBtnText?: string;
    }

    export interface NotieProps {
        alert: (props: NotieAlertArguments) => void;
        success: (message: string, ttl?: number) => void;
        error: (message: string, ttl?: number) => void;
        warn: (message: string, ttl?: number) => void;
        info: (message: string, ttl?: number) => void;
        confirm: (message: string, options?: NotieConfirmOptions) => Promise<void>
    }

}
