declare module '@paystack/inline-js' {
    interface PaystackOptions {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        callback?: (response: any) => void;
        onClose?: () => void;
        metadata?: Record<string, any>;
        channels?: string[];
        [key: string]: any;
    }

    interface PaystackPop {
        setup(options: PaystackOptions): {
            openIframe: () => void;
        };
    }

    const PaystackPop: PaystackPop;
    export default PaystackPop;
}
