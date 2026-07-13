import { useEffect, useRef, useState } from "react";
import { CreditCard, ChevronDown, Search } from "lucide-react";

/**
 * PayGlocal one-click Payment Button with multi-currency support.
 *
 * Each currency has its own button created in the GCC dashboard
 * (the data-pb-id). The script `src` is the same for every button.
 * Use the PROD host when going live.
 */
const PAYGLOCAL_SCRIPT_SRC = "https://oneclick.payglocal.in/simple.js";

const PAYGLOCAL_BUTTONS: { currency: string; label: string; buttonId: string }[] = [
  { currency: "USD", label: "$ - US Dollar (USD)", buttonId: "pb_y5F9B9KkLnBZ" },
  { currency: "INR", label: "₹ - Indian Rupee (INR)", buttonId: "pb_3meLyR9Oq3bD" },
  { currency: "FJD", label: "$ - Fijian Dollar (FJD)", buttonId: "pb_38WziDHlDHq6" },
  { currency: "MXN", label: "$ - Peso (MXN)", buttonId: "pb_fxKrzO58b8W2" },
  { currency: "STD", label: "Db - Dobra (STD)", buttonId: "pb_XqBGdSJ39oMX" },
  { currency: "LVL", label: "Ls - Lat (LVL)", buttonId: "pb_HXOkuX52MK7s" },
  { currency: "SCR", label: "Rs - Rupee (SCR)", buttonId: "pb_gCjsi0oUVOSq" },
  { currency: "BBD", label: "$ - Barbadian Dollar (BBD)", buttonId: "pb_d2hQf5CGDnPI" },
  { currency: "GTQ", label: "Q - Quetzal (GTQ)", buttonId: "pb_vXZSXJMq9yEX" },
  { currency: "CLP", label: "$ - Chilean Peso (CLP)", buttonId: "pb_YugIMg6LfJPP" },
  { currency: "UGX", label: "USh - Shilling (UGX)", buttonId: "pb_BmZV1cfjuPOM" },
  { currency: "ZAR", label: "R - Rand (ZAR)", buttonId: "pb_CDpmpkKtWyD3" },
  { currency: "TND", label: "د.ت - Tunisian Dinar (TND)", buttonId: "pb_8vy0jxzLi5Tc" },
  { currency: "BSD", label: "$ - Bahamian Dollar (BSD)", buttonId: "pb_RyAPcv549MzM" },
  { currency: "SLL", label: "Le - Leone (SLL)", buttonId: "pb_x1lhMio0U8n6" },
  { currency: "GMD", label: "D - Dalasi (GMD)", buttonId: "pb_CIJsISIb4pJC" },
  { currency: "TWD", label: "NT$ - Dollar (TWD)", buttonId: "pb_1SOfxMBhKxxp" },
  { currency: "RSD", label: "din - Serbian dinar (RSD)", buttonId: "pb_bkJTxprWBhg0" },
  { currency: "DOP", label: "RD$ - Dominican Peso (DOP)", buttonId: "pb_WaJTjGsPnZNQ" },
  { currency: "KMF", label: "CF - Comoran Franc (KMF)", buttonId: "pb_N9Umxn0w5r6H" },
  { currency: "MYR", label: "RM - Ringgit (MYR)", buttonId: "pb_FkicAZQmzWMX" },
  { currency: "FKP", label: "£ - Falkland Pound (FKP)", buttonId: "pb_19qba1PeCTJM" },
  { currency: "XOF", label: "CFA - CFA Franc BCEAO (XOF)", buttonId: "pb_gRPBIX3Jjjfy" },
  { currency: "GEL", label: "₾ - Lari (GEL)", buttonId: "pb_fbXGjRueitNg" },
  { currency: "UYU", label: "$U - Peso (UYU)", buttonId: "pb_gDmk8HT17zdw" },
  { currency: "MAD", label: "MAD - Dirham (MAD)", buttonId: "pb_8sLR0lX5x6SQ" },
  { currency: "CVE", label: "$ - Escudo (CVE)", buttonId: "pb_72KaJ004NpiZ" },
  { currency: "TOP", label: "T$ - PaʻOanga (TOP)", buttonId: "pb_zmiLu9ZwnKuY" },
  { currency: "AZN", label: "₼ - Manat (AZN)", buttonId: "pb_VrmlZaEdNWuK" },
  { currency: "OMR", label: "﷼ - Sul Rial (OMR)", buttonId: "pb_aMfFQbsmEaDV" },
  { currency: "PGK", label: "K - Kina (PGK)", buttonId: "pb_GO8kEpt136sI" },
  { currency: "KES", label: "KSh - Kenyan Shilling (KES)", buttonId: "pb_wVo0FKmRdtqI" },
  { currency: "SEK", label: "kr - Krona (SEK)", buttonId: "pb_W80qWmNLssGB" },
  { currency: "UAH", label: "₴ - Ukrainian hryvnia (UAH)", buttonId: "pb_CpgG7CZ9tzgL" },
  { currency: "GNF", label: "FG - Guinean Franc (GNF)", buttonId: "pb_mvG1VemFbL19" },
  { currency: "MZN", label: "MT - Metical (MZN)", buttonId: "pb_pMhvZxnNdIwH" },
  { currency: "SVC", label: "$ - Salvadoran Colon (SVC)", buttonId: "pb_gOzqRK7P6v6s" },
  { currency: "ARS", label: "$ - Peso (ARS)", buttonId: "pb_RUbNP555TM1M" },
  { currency: "QAR", label: "﷼ - Rial (QAR)", buttonId: "pb_ath4w6kP7jR5" },
  { currency: "MRO", label: "UM - Ouguiya (MRO)", buttonId: "pb_hRpei70jitLW" },
  { currency: "CNY", label: "¥ - Yuan Renminbi (CNY)", buttonId: "pb_DWlCiKYAZXZ6" },
  { currency: "XPF", label: "₣ - CFP Franc (XPF)", buttonId: "pb_hSTIY7eR5KOj" },
  { currency: "THB", label: "฿ - Baht (THB)", buttonId: "pb_gpras2pgIUnY" },
  { currency: "UZS", label: "лв - Som (UZS)", buttonId: "pb_VS23KQhsENtw" },
  { currency: "BDT", label: "৳ - Taka (BDT)", buttonId: "pb_3upCKk0Qq48G" },
  { currency: "BMD", label: "$ - Bermudian Dollar (BMD)", buttonId: "pb_On44zRnm1Z2V" },
  { currency: "KWD", label: "KD - Kuwaiti Dinar (KWD)", buttonId: "pb_Ukx4ydfLPvQc" },
  { currency: "PHP", label: "₱ - Peso (PHP)", buttonId: "pb_FTSldPjKWxmC" },
  { currency: "PYG", label: "Gs - Guarani (PYG)", buttonId: "pb_Bs37vW1Bul2h" },
  { currency: "ISK", label: "kr - Icelandic Krona (ISK)", buttonId: "pb_SrGF7sUkThKE" },
  { currency: "JMD", label: "J$ - Jamaican Dollar (JMD)", buttonId: "pb_IdJIRfWaUND2" },
  { currency: "COP", label: "$ - Peso (COP)", buttonId: "pb_Y2oKVhK9Jkyw" },
  { currency: "DZD", label: "دج - Algerian Dinar (DZD)", buttonId: "pb_QZf894ZcwhH7" },
  { currency: "PAB", label: "B/. - Balboa (PAB)", buttonId: "pb_Vnx78cxVxx3s" },
  { currency: "SGD", label: "S$ - Dollar (SGD)", buttonId: "pb_N451GbJsw89s" },
  { currency: "GGP", label: "£ - Guernsey pound (GGP)", buttonId: "pb_AzkqvrB3ZDWb" },
  { currency: "ETB", label: "Br - Ethiopian Birr (ETB)", buttonId: "pb_xoQwYOKPHNlX" },
  { currency: "ECS", label: "S/. - Sucre (ECS)", buttonId: "pb_bxvtURos9lr4" },
  { currency: "KGS", label: "лв - Som (KGS)", buttonId: "pb_XkzlBUrEjQCK" },
  { currency: "VUV", label: "VT - Vatu (VUV)", buttonId: "pb_LPtghKdWuSRA" },
  { currency: "LAK", label: "₭ - Kip (LAK)", buttonId: "pb_dGSoPHJefJhI" },
  { currency: "BND", label: "$ - Bruneian Dollar (BND)", buttonId: "pb_y32VdCsP0L7R" },
  { currency: "ZMK", label: "ZK - Kwacha (ZMK)", buttonId: "pb_qQ3NCudifhlD" },
  { currency: "XAF", label: "FCFA - CFA Franc BEAC (XAF)", buttonId: "pb_q02LwN0DVZ4Y" },
  { currency: "CHF", label: "CHF - Swiss Franc (CHF)", buttonId: "pb_jZORXaTWGLoq" },
  { currency: "HRK", label: "kn - Croatian kuna (HRK)", buttonId: "pb_DjhE1VXsuXli" },
  { currency: "DJF", label: "Fdj - Djiboutian Franc (DJF)", buttonId: "pb_iJrrHNOZOFaY" },
  { currency: "TZS", label: "TSh - Shilling (TZS)", buttonId: "pb_R4VDfcVkehWa" },
  { currency: "VND", label: "₫ - Dong (VND)", buttonId: "pb_ZnBFK3j98tjF" },
  { currency: "AUD", label: "$ - Australian Dollars (AUD)", buttonId: "pb_OB894hnGbkHW" },
  { currency: "ILS", label: "₪ - Shekel (ILS)", buttonId: "pb_UA62imfGj3Ky" },
  { currency: "GYD", label: "$ - Guyanaese Dollar (GYD)", buttonId: "pb_HxZcJphO12sB" },
  { currency: "GHS", label: "GH₵ - Ghana cedi (GHS)", buttonId: "pb_x3QO0o0ElqIS" },
  { currency: "BOB", label: "$b - Boliviano (BOB)", buttonId: "pb_Pfmi2lqzctDC" },
  { currency: "KHR", label: "៛ - Riel (KHR)", buttonId: "pb_ZgEHH6o1TlOE" },
  { currency: "MDL", label: "lei - Leu (MDL)", buttonId: "pb_a8xrl1PfPr7D" },
  { currency: "IDR", label: "Rp - Indonesian Rupiah (IDR)", buttonId: "pb_C4jyRs7V6kSy" },
  { currency: "KYD", label: "$ - Caymanian Dollar (KYD)", buttonId: "pb_TgXP8FP1Ruqb" },
  { currency: "AMD", label: "֏ - Dram (AMD)", buttonId: "pb_Usi7COTlXgfK" },
  { currency: "BWP", label: "P - Pula (BWP)", buttonId: "pb_8mg2DA53X8Uu" },
  { currency: "TRY", label: "₺ - Lira (TRY)", buttonId: "pb_V1JBfeaSoSaa" },
  { currency: "LBP", label: "ل.ل - Lebanese Pound (LBP)", buttonId: "pb_b1QF2VH1IqUu" },
  { currency: "TJS", label: "SM - Tajikistan Ruble (TJS)", buttonId: "pb_jZqP03ESQrVR" },
  { currency: "JOD", label: "JD - Jordanian Dinar (JOD)", buttonId: "pb_sMp5rIiXC4ec" },
  { currency: "HKD", label: "$ - HKD (HKD)", buttonId: "pb_zaPFeeBMYsOu" },
  { currency: "RWF", label: "R₣ - Rwanda Franc (RWF)", buttonId: "pb_15oPQESQsJtg" },
  { currency: "AED", label: "د.إ - Dirham (AED)", buttonId: "pb_rLYQEw6HuRRT" },
  { currency: "EUR", label: "€ - Euros (EUR)", buttonId: "pb_9JhTANWwE9bZ" },
  { currency: "LSL", label: "M - Loti (LSL)", buttonId: "pb_MM6Gk5OQXxPC" },
  { currency: "DKK", label: "kr - Danish Krone (DKK)", buttonId: "pb_mrRtVzcVGAz6" },
  { currency: "CAD", label: "$ - Canadian Dollar (CAD)", buttonId: "pb_RgAitS08vlW0" },
  { currency: "BGN", label: "лв - Lev (BGN)", buttonId: "pb_7cPF6Prqdj2P" },
  { currency: "NOK", label: "kr - Norwegian Krone (NOK)", buttonId: "pb_FHr0DZru7AYt" },
  { currency: "MUR", label: "Rs - Mauritian Rupee (MUR)", buttonId: "pb_NnmYeo1gVTZj" },
  { currency: "ZWL", label: "$ - Zimbabwean dollar (ZWL)", buttonId: "pb_J93pjmEjE5bg" },
  { currency: "GIP", label: "£ - Gibraltar Pound (GIP)", buttonId: "pb_zUYZOBCkTKwQ" },
  { currency: "RON", label: "lei - Leu (RON)", buttonId: "pb_OG0GkRi1VCcV" },
  { currency: "LKR", label: "Rs - Rupee (LKR)", buttonId: "pb_0T7gBPcXv1ww" },
  { currency: "NGN", label: "₦ - Naira (NGN)", buttonId: "pb_kFiPMTDqC0XN" },
  { currency: "CRC", label: "₡ - Costa Rican Colon (CRC)", buttonId: "pb_DIiytRN9YlSJ" },
  { currency: "CZK", label: "Kč - Koruna (CZK)", buttonId: "pb_NTqubT5phL1g" },
  { currency: "PKR", label: "Rs - Rupee (PKR)", buttonId: "pb_JWUV1ddKo5Jn" },
  { currency: "XCD", label: "$ - East Caribbean Dollar (XCD)", buttonId: "pb_8LxTdtyM9Jey" },
  { currency: "ANG", label: "ƒ - Netherlands Antilles Guilder (ANG)", buttonId: "pb_npfzAItcjzZ6" },
  { currency: "BHD", label: "د.ب. - Bahraini Dinar (BHD)", buttonId: "pb_b0rrznHJ8cQV" },
  { currency: "KZT", label: "₸ - Tenge (KZT)", buttonId: "pb_O6XALALcGzGb" },
  { currency: "SRD", label: "$ - Surinamese Guilder (SRD)", buttonId: "pb_YbgJpLF2IYzS" },
  { currency: "SZL", label: "E - Lilangeni (SZL)", buttonId: "pb_LaoED7ijMzHD" },
  { currency: "LTL", label: "Lt - Lita (LTL)", buttonId: "pb_qsUAM6y308qs" },
  { currency: "SAR", label: "﷼ - Riyal (SAR)", buttonId: "pb_4FchN6daPdZe" },
  { currency: "TTD", label: "TT$ - Trinidad and Tobago Dollar (TTD)", buttonId: "pb_dpMzcg8q1wnG" },
  { currency: "MVR", label: "Rf - Rufiyaa (MVR)", buttonId: "pb_Rgg0soTjuSHw" },
  { currency: "KRW", label: "₩ - Won (KRW)", buttonId: "pb_6hxlSy5rWUWe" },
  { currency: "NPR", label: "Rs - Nepalese Rupee (NPR)", buttonId: "pb_HkYTYe3AaZtI" },
  { currency: "JPY", label: "¥ - Japanese Yen (JPY)", buttonId: "pb_XZwnsvIRpet9" },
  { currency: "MNT", label: "₮ - Tugrik (MNT)", buttonId: "pb_3oneaHdS8HHZ" },
  { currency: "PLN", label: "zł - Zloty (PLN)", buttonId: "pb_NRhYIN2STcSu" },
  { currency: "AOA", label: "Kz - Angolan kwanza (AOA)", buttonId: "pb_kVPtG2vkbLUR" },
  { currency: "GBP", label: "£ - Sterling (GBP)", buttonId: "pb_iic0pfWmrRwG" },
  { currency: "SBD", label: "$ - Solomon Islands Dollar (SBD)", buttonId: "pb_xOxcXrIRS74h" },
  { currency: "HUF", label: "Ft - Forint (HUF)", buttonId: "pb_6sF37kp9B6Dd" },
  { currency: "BYR", label: "Br - Belarus Ruble (BYR)", buttonId: "pb_KXcqD0KW1rTL" },
  { currency: "MWK", label: "MK - Malawian Kwacha (MWK)", buttonId: "pb_EstlBW6W2xt8" },
  { currency: "BZD", label: "BZ$ - Belizean Dollar (BZD)", buttonId: "pb_VCy3l4TiIXME" },
  { currency: "BAM", label: "KM - Bosnia and Herzegovina convertible mark (BAM)", buttonId: "pb_lGk2twiISkDv" },
  { currency: "EGP", label: "£ - Egyptian Pound (EGP)", buttonId: "pb_HPsiPDwM6G0a" },
  { currency: "MOP", label: "MOP$ - Pataca (MOP)", buttonId: "pb_z3eDAkgRsrFO" },
  { currency: "NAD", label: "$ - Dollar (NAD)", buttonId: "pb_NxURYdHVHoSH" },
  { currency: "SKK", label: "Sk - Koruna (SKK)", buttonId: "pb_VB7MoMNdOn7f" },
  { currency: "NIO", label: "C$ - Cordoba Oro (NIO)", buttonId: "pb_y0OHjcLb3TRg" },
  { currency: "PEN", label: "S/. - Nuevo Sol (PEN)", buttonId: "pb_9UJwZDOjoCOE" },
  { currency: "NZD", label: "$ - New Zealand Dollars (NZD)", buttonId: "pb_cWnhd5IkPhsh" },
  { currency: "TMT", label: "T - Manat (TMT)", buttonId: "pb_J1pG49PANaaO" },
  { currency: "BRL", label: "R$ - Brazil (BRL)", buttonId: "pb_aqQR937l5PvA" },
];

// Until the real button is configured, show this clickable fallback.
const FALLBACK_URL = "https://gcc.uat.payglocal.in/gl-gcc/";

const buttons = PAYGLOCAL_BUTTONS.filter((b) => b.buttonId && !b.buttonId.includes("xxxx"));
const isConfigured = !PAYGLOCAL_SCRIPT_SRC.includes("xxxx") && buttons.length > 0;

const PayGlocalButton = ({ className = "" }: { className?: string }) => {
  const [currency, setCurrency] = useState(buttons[0]?.currency ?? "");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const selected = buttons.find((b) => b.currency === currency) ?? buttons[0];

  const filtered = buttons.filter((b) => {
    const q = query.trim().toLowerCase();
    return !q || b.label.toLowerCase().includes(q) || b.currency.toLowerCase().includes(q);
  });

  // Inject the PayGlocal script for the selected currency's button.
  useEffect(() => {
    if (!isConfigured || !selected) return;
    const form = formRef.current;
    if (!form) return;

    form.innerHTML = "";
    const script = document.createElement("script");
    script.src = PAYGLOCAL_SCRIPT_SRC;
    script.setAttribute("data-pb-id", selected.buttonId);
    script.async = true;
    form.appendChild(script);
  }, [selected]);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Visible fallback when nothing is configured yet.
  if (!isConfigured || !selected) {
    return (
      <a
        href={FALLBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      >
        <CreditCard className="w-5 h-5" /> PAY NOW
      </a>
    );
  }

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Searchable currency selector */}
      {buttons.length > 1 && (
        <div ref={boxRef} className="relative mb-4 mx-auto w-full max-w-[260px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5 text-left">
            Select Currency
          </label>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-800 shadow-sm transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <span className="truncate text-left">{selected.label}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-xl">
              {/* Search box — type to filter */}
              <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full text-sm outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Scrollable list */}
              <ul className="max-h-64 overflow-y-auto py-1">
                {filtered.length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-400">No match found</li>
                )}
                {filtered.map((b) => (
                  <li key={b.currency}>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency(b.currency);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-blue-50 ${
                        b.currency === currency ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {b.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* PayGlocal renders the PAY NOW button into this form */}
      <form key={selected.currency} ref={formRef} className="flex justify-center" />
    </div>
  );
};

export default PayGlocalButton;
