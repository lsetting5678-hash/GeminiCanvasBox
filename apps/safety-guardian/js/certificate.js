(function () {
  "use strict";

  const FILE_NAME = "安全守護隊_通關獎狀.pdf";
  const PAGE_WIDTH_PT = 841.89;
  const PAGE_HEIGHT_PT = 595.28;
  const CANVAS_WIDTH = 3508;
  const CANVAS_HEIGHT = 2480;
  const FONT_NAME = "Iansui";
  const FONT_URL = "./assets/fonts/Iansui-Regular.ttf";
  const FONT_FAMILY = `"${FONT_NAME}", "Microsoft JhengHei", "Noto Sans TC", sans-serif`;
  let fontPromise = null;

  function ensureCertificateFont() {
    if (fontPromise) return fontPromise;
    if (document.fonts && document.fonts.check(`48px "${FONT_NAME}"`)) {
      fontPromise = Promise.resolve();
      return fontPromise;
    }
    if (typeof FontFace === "function" && document.fonts) {
      const font = new FontFace(FONT_NAME, `url("${FONT_URL}") format("truetype")`, { style: "normal", weight: "400" });
      fontPromise = font.load().then((loadedFont) => { document.fonts.add(loadedFont); });
      return fontPromise;
    }
    fontPromise = document.fonts ? document.fonts.load(`48px "${FONT_NAME}"`).then(() => undefined) : Promise.resolve();
    return fontPromise;
  }

  function roundedRect(ctx, x, y, width, height, radius, fill, stroke, lineWidth = 1) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  }

  function drawStar(ctx, cx, cy, outerRadius, innerRadius, color) {
    ctx.save();
    ctx.beginPath();
    for (let point = 0; point < 10; point += 1) {
      const radius = point % 2 === 0 ? outerRadius : innerRadius;
      const angle = -Math.PI / 2 + point * Math.PI / 5;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (point === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function shieldPath(ctx, cx, top, size) {
    ctx.beginPath();
    ctx.moveTo(cx, top);
    ctx.bezierCurveTo(cx + size * 0.18, top + size * 0.05, cx + size * 0.36, top + size * 0.1, cx + size * 0.47, top + size * 0.17);
    ctx.lineTo(cx + size * 0.39, top + size * 0.63);
    ctx.bezierCurveTo(cx + size * 0.32, top + size * 0.79, cx + size * 0.14, top + size * 0.92, cx, top + size);
    ctx.bezierCurveTo(cx - size * 0.14, top + size * 0.92, cx - size * 0.32, top + size * 0.79, cx - size * 0.39, top + size * 0.63);
    ctx.lineTo(cx - size * 0.47, top + size * 0.17);
    ctx.bezierCurveTo(cx - size * 0.36, top + size * 0.1, cx - size * 0.18, top + size * 0.05, cx, top);
    ctx.closePath();
  }

  function drawMainShield(ctx, cx, top, size) {
    ctx.save();
    ctx.shadowColor = "rgba(23,63,95,.22)";
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 20;
    shieldPath(ctx, cx, top, size);
    ctx.fillStyle = "#ffd247";
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#173f5f";
    ctx.stroke();
    shieldPath(ctx, cx, top + 34, size - 72);
    ctx.fillStyle = "#173f5f";
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#fff5c8";
    ctx.stroke();
    drawStar(ctx, cx, top + size * 0.29, size * 0.12, size * 0.055, "#ffd247");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fffdf5";
    ctx.font = `400 ${Math.round(size * 0.115)}px ${FONT_FAMILY}`;
    ctx.fillText("安全守護隊", cx, top + size * 0.53);
    ctx.font = `400 ${Math.round(size * 0.15)}px ${FONT_FAMILY}`;
    ctx.fillText("小高手", cx, top + size * 0.69);
    ctx.restore();
  }

  function drawPerson(ctx, x, y, scale, color = "#173f5f") {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 12 * scale;
    ctx.lineCap = "round";
    ctx.beginPath(); ctx.arc(x, y - 38 * scale, 20 * scale, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x, y - 12 * scale); ctx.lineTo(x, y + 42 * scale); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y + 2 * scale); ctx.lineTo(x - 34 * scale, y + 22 * scale); ctx.moveTo(x, y + 2 * scale); ctx.lineTo(x + 34 * scale, y + 20 * scale); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y + 42 * scale); ctx.lineTo(x - 26 * scale, y + 83 * scale); ctx.moveTo(x, y + 42 * scale); ctx.lineTo(x + 30 * scale, y + 78 * scale); ctx.stroke();
    ctx.restore();
  }

  function drawBadgeIcon(ctx, type, cx, cy, scale) {
    const navy = "#173f5f";
    const coral = "#ef6b5b";
    ctx.save();
    ctx.strokeStyle = navy;
    ctx.fillStyle = navy;
    ctx.lineWidth = 12 * scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (type === "corridor") {
      ctx.globalAlpha = 0.28;
      ctx.strokeRect(cx - 78 * scale, cy - 68 * scale, 156 * scale, 126 * scale);
      ctx.globalAlpha = 1;
      drawPerson(ctx, cx - 8 * scale, cy - 4 * scale, 0.72 * scale);
      ctx.beginPath(); ctx.moveTo(cx + 10 * scale, cy + 42 * scale); ctx.lineTo(cx + 55 * scale, cy + 68 * scale); ctx.stroke();
    } else if (type === "queue") {
      drawPerson(ctx, cx - 58 * scale, cy - 5 * scale, 0.62 * scale);
      drawPerson(ctx, cx + 58 * scale, cy - 5 * scale, 0.62 * scale);
      ctx.strokeStyle = coral;
      ctx.beginPath(); ctx.moveTo(cx - 22 * scale, cy - 8 * scale); ctx.lineTo(cx + 22 * scale, cy - 8 * scale); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 22 * scale, cy - 8 * scale); ctx.lineTo(cx - 6 * scale, cy - 22 * scale); ctx.moveTo(cx - 22 * scale, cy - 8 * scale); ctx.lineTo(cx - 6 * scale, cy + 6 * scale); ctx.moveTo(cx + 22 * scale, cy - 8 * scale); ctx.lineTo(cx + 6 * scale, cy - 22 * scale); ctx.moveTo(cx + 22 * scale, cy - 8 * scale); ctx.lineTo(cx + 6 * scale, cy + 6 * scale); ctx.stroke();
    } else if (type === "stairs") {
      ctx.beginPath(); ctx.moveTo(cx - 86 * scale, cy + 58 * scale); ctx.lineTo(cx - 42 * scale, cy + 58 * scale); ctx.lineTo(cx - 42 * scale, cy + 18 * scale); ctx.lineTo(cx, cy + 18 * scale); ctx.lineTo(cx, cy - 22 * scale); ctx.lineTo(cx + 42 * scale, cy - 22 * scale); ctx.lineTo(cx + 42 * scale, cy - 62 * scale); ctx.lineTo(cx + 86 * scale, cy - 62 * scale); ctx.stroke();
      ctx.strokeStyle = coral;
      ctx.beginPath(); ctx.moveTo(cx - 90 * scale, cy - 12 * scale); ctx.lineTo(cx + 82 * scale, cy - 88 * scale); ctx.stroke();
    } else if (type === "adult") {
      drawPerson(ctx, cx - 28 * scale, cy + 6 * scale, 0.72 * scale);
      ctx.strokeStyle = coral;
      ctx.beginPath(); ctx.roundRect(cx + 18 * scale, cy - 72 * scale, 78 * scale, 58 * scale, 18 * scale); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 30 * scale, cy - 14 * scale); ctx.lineTo(cx + 16 * scale, cy + 8 * scale); ctx.lineTo(cx + 48 * scale, cy - 12 * scale); ctx.stroke();
    } else if (type === "body") {
      ctx.fillStyle = "#ffd8b5";
      ctx.strokeStyle = navy;
      ctx.beginPath(); ctx.roundRect(cx - 48 * scale, cy - 22 * scale, 96 * scale, 100 * scale, 36 * scale); ctx.fill(); ctx.stroke();
      [-54, -18, 18, 54].forEach((offset, index) => { ctx.beginPath(); ctx.moveTo(cx + offset * 0.55 * scale, cy - 18 * scale); ctx.lineTo(cx + offset * 0.55 * scale, cy - (88 - index * 4) * scale); ctx.stroke(); });
      ctx.strokeStyle = coral; ctx.beginPath(); ctx.arc(cx, cy + 8 * scale, 100 * scale, -0.9, 0.9); ctx.stroke();
    } else if (type === "dismissal") {
      ctx.strokeRect(cx - 86 * scale, cy - 48 * scale, 172 * scale, 112 * scale);
      ctx.beginPath(); ctx.moveTo(cx - 106 * scale, cy - 48 * scale); ctx.lineTo(cx, cy - 108 * scale); ctx.lineTo(cx + 106 * scale, cy - 48 * scale); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 28 * scale, cy + 64 * scale); ctx.lineTo(cx - 28 * scale, cy + 10 * scale); ctx.lineTo(cx + 28 * scale, cy + 10 * scale); ctx.lineTo(cx + 28 * scale, cy + 64 * scale); ctx.stroke();
      ctx.fillStyle = coral; ctx.beginPath(); ctx.arc(cx + 70 * scale, cy - 78 * scale, 18 * scale, 0, Math.PI * 2); ctx.fill();
    } else if (type === "stranger") {
      drawPerson(ctx, cx, cy - 2 * scale, 0.78 * scale);
      ctx.strokeStyle = coral;
      ctx.lineWidth = 20 * scale;
      ctx.beginPath(); ctx.moveTo(cx - 82 * scale, cy - 86 * scale); ctx.lineTo(cx + 82 * scale, cy + 86 * scale); ctx.stroke();
      ctx.lineWidth = 10 * scale; ctx.beginPath(); ctx.arc(cx, cy, 108 * scale, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  }

  function drawBadge(ctx, cx, cy, label, type, accent) {
    const radius = 168;
    ctx.save();
    ctx.shadowColor = "rgba(23,63,95,.16)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 10;
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fillStyle = "#fffef8"; ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 16; ctx.strokeStyle = "#173f5f"; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, radius - 20, 0, Math.PI * 2); ctx.lineWidth = 8; ctx.strokeStyle = accent; ctx.stroke();
    drawBadgeIcon(ctx, type, cx, cy - 35, 0.82);
    roundedRect(ctx, cx - 130, cy + 72, 260, 62, 28, accent, null);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#173f5f";
    ctx.font = `400 34px ${FONT_FAMILY}`;
    ctx.fillText(label, cx, cy + 103);
    ctx.restore();
  }

  function drawSchoolCorner(ctx, x, baseline, flip = false) {
    ctx.save();
    ctx.translate(x, baseline);
    if (flip) ctx.scale(-1, 1);
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = "#c98c13";
    ctx.lineWidth = 9;
    ctx.strokeRect(0, -115, 250, 115);
    ctx.beginPath(); ctx.moveTo(-26, -115); ctx.lineTo(125, -205); ctx.lineTo(276, -115); ctx.stroke();
    ctx.strokeRect(98, -70, 55, 70);
    ctx.beginPath(); ctx.moveTo(125, -205); ctx.lineTo(125, -255); ctx.lineTo(188, -232); ctx.lineTo(125, -210); ctx.stroke();
    ctx.restore();
  }

  async function renderCertificateCanvas() {
    await ensureCertificateFont();
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.fillStyle = "#fffdf5";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gradient.addColorStop(0, "rgba(223,247,243,.88)");
    gradient.addColorStop(0.5, "rgba(255,253,245,.5)");
    gradient.addColorStop(1, "rgba(255,245,200,.72)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    roundedRect(ctx, 62, 62, CANVAS_WIDTH - 124, CANVAS_HEIGHT - 124, 48, null, "#d59b25", 24);
    roundedRect(ctx, 98, 98, CANVAS_WIDTH - 196, CANVAS_HEIGHT - 196, 40, null, "#173f5f", 13);
    roundedRect(ctx, 126, 126, CANVAS_WIDTH - 252, CANVAS_HEIGHT - 252, 32, null, "#60cabc", 7);
    drawSchoolCorner(ctx, 165, CANVAS_HEIGHT - 150, false);
    drawSchoolCorner(ctx, CANVAS_WIDTH - 165, CANVAS_HEIGHT - 150, true);
    drawStar(ctx, 230, 235, 36, 16, "#f2b632");
    drawStar(ctx, CANVAS_WIDTH - 230, 235, 36, 16, "#f2b632");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#173f5f";
    ctx.font = `400 124px ${FONT_FAMILY}`;
    ctx.fillText("安全守護隊 通關獎狀", CANVAS_WIDTH / 2, 260);
    ctx.font = `400 55px ${FONT_FAMILY}`;
    ctx.fillStyle = "#49666c";
    ctx.fillText("茲證明", CANVAS_WIDTH / 2, 380);
    ctx.fillStyle = "#173f5f";
    ctx.font = `400 76px ${FONT_FAMILY}`;
    ctx.fillText("＿＿＿＿＿＿＿＿＿＿ 同學", CANVAS_WIDTH / 2, 480);
    drawMainShield(ctx, CANVAS_WIDTH / 2, 850, 720);
    const badges = [
      { x: 575, y: 1090, label: "走廊安全", type: "corridor", accent: "#9fe3d7" },
      { x: 1080, y: 770, label: "排隊安全", type: "queue", accent: "#ffe28a" },
      { x: 1754, y: 720, label: "樓梯安全", type: "stairs", accent: "#a9d7ef" },
      { x: 2428, y: 770, label: "告知大人", type: "adult", accent: "#ffd2a6" },
      { x: 2933, y: 1090, label: "身體界線", type: "body", accent: "#ffc9cc" },
      { x: 890, y: 1705, label: "放學安全", type: "dismissal", accent: "#c7e9a7" },
      { x: 2618, y: 1705, label: "陌生人安全", type: "stranger", accent: "#d9c7f5" }
    ];
    badges.forEach((badge) => drawBadge(ctx, badge.x, badge.y, badge.label, badge.type, badge.accent));
    roundedRect(ctx, 1180, 1720, 1148, 118, 58, "#b8eee5", "#173f5f", 7);
    ctx.fillStyle = "#173f5f";
    ctx.font = `400 52px ${FONT_FAMILY}`;
    ctx.fillText("完成所有校園安全學習任務", CANVAS_WIDTH / 2, 1779);
    ctx.fillStyle = "#49666c";
    ctx.font = `400 42px ${FONT_FAMILY}`;
    ctx.fillText("學會保護自己，也懂得向大人求助，特頒發此獎狀以資鼓勵。", CANVAS_WIDTH / 2, 1950);
    ctx.textAlign = "left";
    ctx.fillStyle = "#173f5f";
    ctx.font = `400 46px ${FONT_FAMILY}`;
    ctx.fillText("完成日期：＿＿年＿＿月＿＿日", 560, 2180);
    ctx.fillText("教師：＿＿＿＿＿＿＿＿", 2200, 2180);
    ctx.textAlign = "center";
    ctx.fillStyle = "#698086";
    ctx.font = `400 32px ${FONT_FAMILY}`;
    ctx.fillText("校園安全學習任務", CANVAS_WIDTH / 2, 2310);
    return canvas;
  }

  function dataUrlToBytes(dataUrl) {
    const binary = atob(dataUrl.split(",")[1]);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }

  function joinBytes(chunks, totalLength) {
    const output = new Uint8Array(totalLength);
    let offset = 0;
    chunks.forEach((chunk) => { output.set(chunk, offset); offset += chunk.length; });
    return output;
  }

  function canvasToPdfBlob(canvas) {
    const imageBytes = dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.97));
    const encoder = new TextEncoder();
    const chunks = [];
    const offsets = [0];
    let length = 0;
    const pushText = (text) => { const bytes = encoder.encode(text); chunks.push(bytes); length += bytes.length; };
    const pushBytes = (bytes) => { chunks.push(bytes); length += bytes.length; };
    const startObject = (number) => { offsets[number] = length; pushText(`${number} 0 obj\n`); };
    pushText("%PDF-1.4\n%SAFETY-GUARDIAN\n");
    startObject(1); pushText("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
    startObject(2); pushText("<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
    startObject(3); pushText(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH_PT} ${PAGE_HEIGHT_PT}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);
    startObject(4); pushText(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`); pushBytes(imageBytes); pushText("\nendstream\nendobj\n");
    const content = `q\n${PAGE_WIDTH_PT} 0 0 ${PAGE_HEIGHT_PT} 0 0 cm\n/Im0 Do\nQ\n`;
    startObject(5); pushText(`<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);
    const xrefOffset = length;
    pushText("xref\n0 6\n0000000000 65535 f \n");
    for (let objectNumber = 1; objectNumber <= 5; objectNumber += 1) pushText(`${String(offsets[objectNumber]).padStart(10, "0")} 00000 n \n`);
    pushText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
    return new Blob([joinBytes(chunks, length)], { type: "application/pdf" });
  }

  async function createPdfBlob() {
    return canvasToPdfBlob(await renderCertificateCanvas());
  }

  async function downloadPdf() {
    const blob = await createPdfBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = FILE_NAME;
    link.rel = "noopener";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  async function printCertificate() {
    const imageUrl = (await renderCertificateCanvas()).toDataURL("image/png");
    const printFrame = document.createElement("iframe");
    printFrame.title = "安全守護隊獎狀列印預覽";
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "1px";
    printFrame.style.height = "1px";
    printFrame.style.border = "0";
    printFrame.style.opacity = "0";
    printFrame.setAttribute("aria-hidden", "true");
    document.body.append(printFrame);
    const frameDocument = printFrame.contentWindow.document;
    frameDocument.open();
    frameDocument.write(`<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><title>安全守護隊 通關獎狀</title><style>@page{size:A4 landscape;margin:0}html,body{width:297mm;height:210mm;margin:0;background:#fff}img{display:block;width:297mm;height:210mm;object-fit:contain}</style></head><body><img src="${imageUrl}" alt="安全守護隊空白姓名通關獎狀" onload="setTimeout(function(){window.focus();window.print()},300)"></body></html>`);
    frameDocument.close();
    setTimeout(() => printFrame.remove(), 60000);
  }

  window.SAFETY_CERTIFICATE = Object.freeze({ FILE_NAME, createPdfBlob, downloadPdf, printCertificate, renderCertificateCanvas });
})();
