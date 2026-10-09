export interface PaymentField {
  label: string;
  value: string;
  /** Value copied to clipboard (defaults to `value` with spaces stripped). */
  copyValue?: string;
  copyable?: boolean;
}

export interface BankAccount {
  id: string;
  name: string;
  logo: string;
  brand: string;
  preferred?: boolean;
  fields: PaymentField[];
}

export interface Wallet {
  id: string;
  name: string;
  logo: string;
  brand: string;
  number: string;
}

const ACCOUNT_HOLDER = "Ahmad Ali Hamza Naqvi";

export const banks: BankAccount[] = [
  {
    id: "hbl",
    name: "Habib Bank Limited",
    logo: "/img/payment_methods/hbl.png",
    brand: "#06908C",
    preferred: true,
    fields: [
      { label: "Account Title", value: "Ahmad Ali Hamza", copyable: false },
      { label: "Account Number", value: "05867901039603" },
      { label: "IBAN", value: "PK47HABB0005867901039603" },
      { label: "Branch", value: "Ahmed Pur Sial", copyable: false },
    ],
  },
  {
    id: "ubl",
    name: "United Bank Limited",
    logo: "/img/payment_methods/ubl.jpeg",
    brand: "#0171B8",
    fields: [
      { label: "Account Title", value: ACCOUNT_HOLDER, copyable: false },
      { label: "Account Number", value: "0736285322983" },
      { label: "IBAN", value: "PK22UNIL0109000285322983" },
      { label: "Branch", value: "Niaz Beg, Lahore (0736)", copyable: false },
    ],
  },
];

export const wallets: Wallet[] = [
  { id: "jazzcash", name: "JazzCash", logo: "/img/payment_methods/jazzcash.png", brand: "#E72225", number: "0303 3999512" },
  { id: "easypaisa", name: "Easypaisa", logo: "/img/payment_methods/easypaisa.png", brand: "#24AA5C", number: "0303 3999512" },
  { id: "sadapay", name: "SadaPay", logo: "/img/payment_methods/sadapay.png", brand: "#F6765F", number: "0303 3999512" },
  { id: "nayapay", name: "NayaPay", logo: "/img/payment_methods/nayapay.jpeg", brand: "#F84C18", number: "0303 3999512" },
];

export interface InternationalAccount {
  id: string;
  name: string;
  logo: string;
  /** "contain" shows a transparent logo as-is, with no white tile behind it. */
  logoFit?: "cover" | "contain";
  brand: string;
  note: string;
  fields: PaymentField[];
}

export const internationalAccounts: InternationalAccount[] = [
  {
    id: "payoneer",
    name: "Payoneer (Citibank)",
    logo: "/img/payment_methods/payoneer.png",
    logoFit: "contain",
    brand: "#FF4800",
    note: "Receiving account via Payoneer — use Local (ACH) transfer within the USA.",
    fields: [
      { label: "Beneficiary Name", value: ACCOUNT_HOLDER, copyable: false },
      { label: "Bank Name", value: "Citibank", copyable: false },
      { label: "Transfer Type", value: "Local transfer", copyable: false },
      { label: "Account Number", value: "70580440000442424" },
      { label: "Routing (ABA)", value: "031100209" },
      { label: "SWIFT Code", value: "CITIUS33" },
      { label: "Account Type", value: "Checking", copyable: false },
      { label: "Bank Address", value: "111 Wall Street, New York, NY 10043, USA", copyable: false },
    ],
  },
];
