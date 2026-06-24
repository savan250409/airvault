import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Trash2, Download, Printer } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Item {
  id: number;
  description: string;
  hsn: string;
  qty: string;
  unit: string;
  rate: string;
}

interface InvoiceData {
  // Exporter
  expName: string;
  expAddress: string;
  expGstin: string;
  expIec: string;
  expPan: string;
  expContact: string;
  // Invoice meta
  invoiceNo: string;
  invoiceDate: string;
  buyerOrderNo: string;
  currency: string;
  // Buyer / Consignee
  buyerName: string;
  buyerAddress: string;
  buyerCountry: string;
  // Shipment
  origin: string;
  destination: string;
  portLoading: string;
  portDischarge: string;
  deliveryTerms: string;
  paymentTerms: string;
  // Bank
  bankName: string;
  bankAccount: string;
  bankSwift: string;
  bankBranch: string;
  // Other
  declaration: string;
  signatory: string;
}

const CURRENCIES = ["USD", "EUR", "GBP", "AED", "INR"];

const emptyItem = (id: number): Item => ({
  id,
  description: "",
  hsn: "",
  qty: "",
  unit: "PCS",
  rate: "",
});

const num = (v: string) => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
};

const esc = (s: string) =>
  (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ExportInvoice = () => {
  const [data, setData] = useState<InvoiceData>({
    expName: "",
    expAddress: "",
    expGstin: "",
    expIec: "",
    expPan: "",
    expContact: "",
    invoiceNo: "",
    invoiceDate: "",
    buyerOrderNo: "",
    currency: "USD",
    buyerName: "",
    buyerAddress: "",
    buyerCountry: "",
    origin: "India",
    destination: "",
    portLoading: "",
    portDischarge: "",
    deliveryTerms: "",
    paymentTerms: "",
    bankName: "",
    bankAccount: "",
    bankSwift: "",
    bankBranch: "",
    declaration:
      "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.",
    signatory: "",
  });
  const [items, setItems] = useState<Item[]>([emptyItem(1)]);

  const set = (field: keyof InvoiceData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const setItem = (id: number, field: keyof Item, value: string) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));

  const addItem = () =>
    setItems((prev) => [...prev, emptyItem(prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1)]);

  const removeItem = (id: number) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));

  const total = useMemo(
    () => items.reduce((sum, it) => sum + num(it.qty) * num(it.rate), 0),
    [items]
  );

  // Single source of truth for the invoice document — used for both preview and print.
  const invoiceHTML = useMemo(() => buildInvoiceHTML(data, items, total), [data, items, total]);

  const downloadPdf = () => {
    const w = window.open("", "_blank", "width=900,height=1000");
    if (!w) return;
    w.document.open();
    w.document.write(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${esc(
        data.invoiceNo || ""
      )}</title></head><body onload="window.print()">${invoiceHTML}</body></html>`
    );
    w.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <div className="section-padding">
        <div className="container-custom">
          {/* Heading */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block">
              <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-secondary/20">
                Logistics Tools
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">Export Invoice Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create a compliant export commercial invoice and download it as a PDF.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* FORM */}
            <div className="space-y-6">
              {/* Exporter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Exporter Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Field label="Exporter Name">
                    <Input value={data.expName} onChange={(e) => set("expName", e.target.value)} />
                  </Field>
                  <Field label="Address">
                    <textarea
                      value={data.expAddress}
                      onChange={(e) => set("expAddress", e.target.value)}
                      className="w-full min-h-[64px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="GSTIN">
                      <Input value={data.expGstin} onChange={(e) => set("expGstin", e.target.value)} />
                    </Field>
                    <Field label="IEC Code">
                      <Input value={data.expIec} onChange={(e) => set("expIec", e.target.value)} />
                    </Field>
                    <Field label="PAN">
                      <Input value={data.expPan} onChange={(e) => set("expPan", e.target.value)} />
                    </Field>
                    <Field label="Contact (Email / Phone)">
                      <Input value={data.expContact} onChange={(e) => set("expContact", e.target.value)} />
                    </Field>
                  </div>
                </CardContent>
              </Card>

              {/* Invoice meta + Buyer */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Invoice &amp; Buyer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Invoice No.">
                      <Input value={data.invoiceNo} onChange={(e) => set("invoiceNo", e.target.value)} />
                    </Field>
                    <Field label="Invoice Date">
                      <Input type="date" value={data.invoiceDate} onChange={(e) => set("invoiceDate", e.target.value)} />
                    </Field>
                    <Field label="Buyer's Order No.">
                      <Input value={data.buyerOrderNo} onChange={(e) => set("buyerOrderNo", e.target.value)} />
                    </Field>
                    <Field label="Currency">
                      <select
                        value={data.currency}
                        onChange={(e) => set("currency", e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Buyer / Consignee Name">
                    <Input value={data.buyerName} onChange={(e) => set("buyerName", e.target.value)} />
                  </Field>
                  <Field label="Buyer Address">
                    <textarea
                      value={data.buyerAddress}
                      onChange={(e) => set("buyerAddress", e.target.value)}
                      className="w-full min-h-[64px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </Field>
                  <Field label="Buyer Country">
                    <Input value={data.buyerCountry} onChange={(e) => set("buyerCountry", e.target.value)} />
                  </Field>
                </CardContent>
              </Card>

              {/* Shipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Shipment Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Field label="Country of Origin">
                    <Input value={data.origin} onChange={(e) => set("origin", e.target.value)} />
                  </Field>
                  <Field label="Final Destination">
                    <Input value={data.destination} onChange={(e) => set("destination", e.target.value)} />
                  </Field>
                  <Field label="Port of Loading">
                    <Input value={data.portLoading} onChange={(e) => set("portLoading", e.target.value)} />
                  </Field>
                  <Field label="Port of Discharge">
                    <Input value={data.portDischarge} onChange={(e) => set("portDischarge", e.target.value)} />
                  </Field>
                  <Field label="Terms of Delivery">
                    <Input value={data.deliveryTerms} onChange={(e) => set("deliveryTerms", e.target.value)} />
                  </Field>
                  <Field label="Terms of Payment">
                    <Input value={data.paymentTerms} onChange={(e) => set("paymentTerms", e.target.value)} />
                  </Field>
                </CardContent>
              </Card>

              {/* Line items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Line Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((it, i) => (
                    <div key={it.id} className="rounded-lg border border-gray-200 p-3 space-y-2 bg-gray-50/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-600">Item {i + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          disabled={items.length === 1}
                          className="text-red-500 hover:bg-red-50 rounded p-1 disabled:opacity-40"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <Input
                        placeholder="Description of goods"
                        value={it.description}
                        onChange={(e) => setItem(it.id, "description", e.target.value)}
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Input placeholder="HSN" value={it.hsn} onChange={(e) => setItem(it.id, "hsn", e.target.value)} />
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={it.qty}
                          onChange={(e) => setItem(it.id, "qty", e.target.value)}
                        />
                        <Input placeholder="Unit" value={it.unit} onChange={(e) => setItem(it.id, "unit", e.target.value)} />
                        <Input
                          type="number"
                          placeholder="Rate"
                          value={it.rate}
                          onChange={(e) => setItem(it.id, "rate", e.target.value)}
                        />
                      </div>
                      <p className="text-right text-sm text-muted-foreground">
                        Amount: <strong className="text-gray-800">{data.currency} {(num(it.qty) * num(it.rate)).toFixed(2)}</strong>
                      </p>
                    </div>
                  ))}
                  <Button type="button" variant="outline-animated" size="sm" onClick={addItem}>
                    <Plus className="w-4 h-4" /> Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Bank + declaration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Bank &amp; Declaration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Bank Name">
                      <Input value={data.bankName} onChange={(e) => set("bankName", e.target.value)} />
                    </Field>
                    <Field label="Account No.">
                      <Input value={data.bankAccount} onChange={(e) => set("bankAccount", e.target.value)} />
                    </Field>
                    <Field label="SWIFT / IFSC">
                      <Input value={data.bankSwift} onChange={(e) => set("bankSwift", e.target.value)} />
                    </Field>
                    <Field label="Branch">
                      <Input value={data.bankBranch} onChange={(e) => set("bankBranch", e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Declaration">
                    <textarea
                      value={data.declaration}
                      onChange={(e) => set("declaration", e.target.value)}
                      className="w-full min-h-[64px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </Field>
                  <Field label="Authorised Signatory">
                    <Input value={data.signatory} onChange={(e) => set("signatory", e.target.value)} />
                  </Field>
                </CardContent>
              </Card>
            </div>

            {/* PREVIEW */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="flex flex-wrap gap-3 justify-end">
                <Button type="button" variant="outline" onClick={downloadPdf}>
                  <Printer className="w-4 h-4" /> Print
                </Button>
                <Button type="button" variant="gradient-primary" onClick={downloadPdf}>
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: invoiceHTML }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-xs font-medium text-gray-500 mb-1">{label}</span>
    {children}
  </label>
);

// ---- Invoice document (inline styles → identical in preview and print) ----
function buildInvoiceHTML(d: InvoiceData, items: Item[], total: number): string {
  const cur = esc(d.currency);
  const money = (n: number) => `${cur} ${n.toFixed(2)}`;
  const cell = "border:1px solid #cbd5e1;padding:6px 8px;font-size:12px;";
  const th = `${cell}background:#0B41E3;color:#fff;text-align:left;`;

  const rows = items
    .map((it, i) => {
      const amount = num(it.qty) * num(it.rate);
      return `<tr>
        <td style="${cell}text-align:center;">${i + 1}</td>
        <td style="${cell}">${esc(it.description) || "&nbsp;"}</td>
        <td style="${cell}text-align:center;">${esc(it.hsn)}</td>
        <td style="${cell}text-align:right;">${esc(it.qty)}</td>
        <td style="${cell}text-align:center;">${esc(it.unit)}</td>
        <td style="${cell}text-align:right;">${num(it.rate).toFixed(2)}</td>
        <td style="${cell}text-align:right;">${amount.toFixed(2)}</td>
      </tr>`;
    })
    .join("");

  const block = (title: string, body: string) =>
    `<div style="border:1px solid #cbd5e1;padding:8px 10px;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#64748b;margin-bottom:4px;">${title}</div>
        <div style="font-size:12px;line-height:1.5;white-space:pre-line;">${body || "&nbsp;"}</div>
     </div>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;max-width:800px;margin:0 auto;padding:24px;background:#fff;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #E5A121;padding-bottom:12px;margin-bottom:16px;">
      <div>
        <div style="font-size:22px;font-weight:bold;color:#0B41E3;">${esc(d.expName) || "Exporter Name"}</div>
        <div style="font-size:12px;white-space:pre-line;color:#374151;margin-top:4px;">${esc(d.expAddress)}</div>
        <div style="font-size:11px;color:#6b7280;margin-top:4px;">${esc(d.expContact)}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#0B41E3;">EXPORT INVOICE</div>
        <div style="font-size:12px;color:#374151;margin-top:6px;"><strong>Invoice No:</strong> ${esc(d.invoiceNo)}</div>
        <div style="font-size:12px;color:#374151;"><strong>Date:</strong> ${esc(d.invoiceDate)}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px;">
      ${block("Exporter Tax Details", `GSTIN: ${esc(d.expGstin)}\nIEC: ${esc(d.expIec)}\nPAN: ${esc(d.expPan)}`)}
      ${block("Buyer / Consignee", `${esc(d.buyerName)}\n${esc(d.buyerAddress)}\n${esc(d.buyerCountry)}`)}
      ${block("Reference", `Buyer's Order No: ${esc(d.buyerOrderNo)}\nCurrency: ${cur}`)}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">
      ${block("Country of Origin / Destination", `${esc(d.origin)} → ${esc(d.destination)}`)}
      ${block("Port of Loading / Discharge", `${esc(d.portLoading)} → ${esc(d.portDischarge)}`)}
      ${block("Terms", `Delivery: ${esc(d.deliveryTerms)}\nPayment: ${esc(d.paymentTerms)}`)}
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      <thead>
        <tr>
          <th style="${th}width:36px;text-align:center;">Sr</th>
          <th style="${th}">Description of Goods</th>
          <th style="${th}text-align:center;">HSN</th>
          <th style="${th}text-align:right;">Qty</th>
          <th style="${th}text-align:center;">Unit</th>
          <th style="${th}text-align:right;">Rate</th>
          <th style="${th}text-align:right;">Amount</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="6" style="${cell}text-align:right;font-weight:bold;background:#f8fafc;">Total (${cur})</td>
          <td style="${cell}text-align:right;font-weight:bold;background:#f8fafc;">${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
      ${block("Bank Details", `Bank: ${esc(d.bankName)}\nA/C No: ${esc(d.bankAccount)}\nSWIFT/IFSC: ${esc(d.bankSwift)}\nBranch: ${esc(d.bankBranch)}`)}
      <div style="border:1px solid #cbd5e1;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:13px;font-weight:bold;">Total Amount Payable</span>
        <span style="font-size:18px;font-weight:bold;color:#0B41E3;">${money(total)}</span>
      </div>
    </div>

    <div style="font-size:11px;color:#374151;border-top:1px solid #e5e7eb;padding-top:10px;">
      <strong>Declaration:</strong> ${esc(d.declaration)}
    </div>

    <div style="display:flex;justify-content:flex-end;margin-top:28px;">
      <div style="text-align:center;font-size:12px;">
        <div style="border-top:1px solid #94a3b8;width:200px;padding-top:6px;">For ${esc(d.expName) || "Exporter"}</div>
        <div style="margin-top:18px;color:#6b7280;">${esc(d.signatory)}</div>
        <div style="color:#6b7280;">Authorised Signatory</div>
      </div>
    </div>
  </div>`;
}

export default ExportInvoice;
