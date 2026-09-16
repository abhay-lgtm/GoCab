/**
 * generateReceipt
 * Opens a new browser tab with a styled, printable receipt and
 * immediately triggers the print/save-as-PDF dialog.
 *
 * @param {object} ride     - Booking object from the API
 * @param {string} method   - Payment method id: 'upi' | 'card' | 'cash'
 */
export function generateReceipt(ride, method) {
  const methodLabel = { upi: 'UPI', card: 'Card', cash: 'Cash' }[method] ?? method;

  const fmt = (n) =>
    n === null || n === undefined
      ? '—'
      : `₹${Number(n).toLocaleString('en-IN')}`;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  const receiptNo = `GC-${ride.id?.toString().padStart(6, '0') ?? '------'}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GoCab Receipt ${receiptNo}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: #f3f4f6;
      display: flex;
      justify-content: center;
      padding: 40px 16px 60px;
      color: #111827;
    }

    .receipt {
      background: #fff;
      width: 100%;
      max-width: 480px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.10);
    }

    /* Header */
    .header {
      background: #1e293b;
      color: #fff;
      padding: 28px 28px 22px;
    }
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .brand {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .brand span { color: #60a5fa; }
    .badge {
      font-size: 11px;
      font-weight: 600;
      background: rgba(34,197,94,0.18);
      color: #4ade80;
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 999px;
      padding: 3px 10px;
      letter-spacing: 0.5px;
    }
    .receipt-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #94a3b8;
    }
    .receipt-meta strong { color: #e2e8f0; }

    /* Amount hero */
    .amount-section {
      text-align: center;
      padding: 26px 28px 20px;
      border-bottom: 1px dashed #e5e7eb;
    }
    .amount-label { font-size: 12px; color: #6b7280; margin-bottom: 6px; }
    .amount {
      font-size: 42px;
      font-weight: 800;
      letter-spacing: -1px;
      color: #111827;
    }
    .method-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      font-size: 12px;
      font-weight: 600;
      color: #2563eb;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 999px;
      padding: 4px 12px;
    }

    /* Trip details */
    .section { padding: 20px 28px; }
    .section + .section { border-top: 1px solid #f1f5f9; }
    .section-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 14px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      font-size: 13.5px;
      margin-bottom: 10px;
    }
    .row:last-child { margin-bottom: 0; }
    .row .label { color: #6b7280; flex-shrink: 0; }
    .row .value { color: #111827; font-weight: 500; text-align: right; max-width: 60%; }

    /* Route visual */
    .route { display: flex; flex-direction: column; gap: 0; }
    .route-point { display: flex; align-items: flex-start; gap: 10px; }
    .route-dot {
      width: 10px; height: 10px; border-radius: 50%; margin-top: 3px; flex-shrink: 0;
    }
    .route-dot.pickup  { background: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.15); }
    .route-dot.dropoff { background: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
    .route-line {
      width: 10px; display: flex; justify-content: center; padding: 2px 0;
    }
    .route-line-inner {
      width: 2px; height: 22px; background: #e5e7eb;
      border-radius: 1px;
    }
    .route-text { font-size: 13px; color: #111827; font-weight: 500; line-height: 1.4; }
    .route-sub { font-size: 11px; color: #9ca3af; }

    /* Fare breakdown */
    .fare-row {
      display: flex; justify-content: space-between;
      font-size: 13.5px; margin-bottom: 8px;
    }
    .fare-row .label { color: #6b7280; }
    .fare-row .value { color: #374151; font-weight: 500; }
    .fare-total {
      display: flex; justify-content: space-between;
      font-size: 15px; font-weight: 700;
      padding-top: 10px; margin-top: 4px;
      border-top: 1.5px solid #e5e7eb;
      color: #111827;
    }

    /* Footer */
    .footer {
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      padding: 18px 28px;
      font-size: 12px;
      color: #9ca3af;
      line-height: 1.6;
    }
    .footer strong { color: #6b7280; }

    @media print {
      body { background: #fff; padding: 0; }
      .receipt { box-shadow: none; border-radius: 0; max-width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <!-- Header -->
    <div class="header">
      <div class="header-top">
        <div class="brand">Go<span>Cab</span></div>
        <div class="badge">✓ PAID</div>
      </div>
      <div class="receipt-meta">
        <span>Receipt <strong>${receiptNo}</strong></span>
        <span><strong>${dateStr}</strong> &nbsp;${timeStr}</span>
      </div>
    </div>

    <!-- Amount -->
    <div class="amount-section">
      <div class="amount-label">Amount Paid</div>
      <div class="amount">${fmt(ride.total)}</div>
      <div class="method-pill">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        ${methodLabel}
      </div>
    </div>

    <!-- Trip Route -->
    <div class="section">
      <div class="section-title">Trip Route</div>
      <div class="route">
        <div class="route-point">
          <div class="route-dot pickup"></div>
          <div>
            <div class="route-text">${ride.pickup ?? '—'}</div>
            <div class="route-sub">Pickup</div>
          </div>
        </div>
        <div class="route-line"><div class="route-line-inner"></div></div>
        <div class="route-point">
          <div class="route-dot dropoff"></div>
          <div>
            <div class="route-text">${ride.destination ?? '—'}</div>
            <div class="route-sub">Drop-off</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trip Info -->
    <div class="section">
      <div class="section-title">Trip Details</div>
      ${ride.customerName ? `
      <div class="row">
        <span class="label">Passenger</span>
        <span class="value">${ride.customerName}</span>
      </div>` : ''}
      ${ride.driverName ? `
      <div class="row">
        <span class="label">Driver</span>
        <span class="value">${ride.driverName}</span>
      </div>` : ''}
      ${ride.vehicleModel ? `
      <div class="row">
        <span class="label">Vehicle</span>
        <span class="value">${ride.vehicleModel}${ride.vehiclePlate ? ` · ${ride.vehiclePlate}` : ''}</span>
      </div>` : ''}
      <div class="row">
        <span class="label">Distance</span>
        <span class="value">${ride.distance ?? '—'}</span>
      </div>
    </div>

    <!-- Fare Breakdown -->
    <div class="section">
      <div class="section-title">Fare Breakdown</div>
      ${ride.baseFare !== undefined ? `
      <div class="fare-row">
        <span class="label">Base fare</span>
        <span class="value">${fmt(ride.baseFare)}</span>
      </div>` : ''}
      ${ride.rideFare !== undefined ? `
      <div class="fare-row">
        <span class="label">Ride fare</span>
        <span class="value">${fmt(ride.rideFare)}</span>
      </div>` : ''}
      <div class="fare-total">
        <span>Total</span>
        <span>${fmt(ride.total)}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <strong>Thank you for riding with GoCab!</strong><br />
      This is a computer-generated receipt. For support, contact us at<br />
      support@gocab.app
    </div>
  </div>

  <script>
    window.onload = function () { window.print(); };
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  // Revoke the object URL after the window has had time to load it
  if (win) {
    win.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
  } else {
    // Fallback: revoke after a short delay if pop-up was blocked
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
