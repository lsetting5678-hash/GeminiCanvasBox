(function () {
  "use strict";

  const FILE_NAME = "安全守護隊_通關獎狀.pdf";
  const PAGE_WIDTH_PT = 841.89;
  const PAGE_HEIGHT_PT = 595.28;
  const CANVAS_WIDTH = 3508;
  const CANVAS_HEIGHT = 2480;
  const FONT_FAMILY = '"Microsoft JhengHei", "Noto Sans TC", "PingFang TC", sans-serif';

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

  function drawShield(ctx, cx, top, size) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, top);
    ctx.lineTo(cx + size * 0.48, top + size * 0.18);
    ctx.lineTo(cx + size * 0.4, top + size * 0.68);
    ctx.quadraticCurveTo(cx, top + size, cx, top + size);
    ctx.quadraticCurveTo(cx - size * 0.4, top + size * 0.68, cx - size * 0.4, top + size * 0.68);
    ctx.lineTo(cx - size * 0.48, top + size * 0.18);
    ctx.closePath();
    ctx.fillStyle = "#ffd35a";
    ctx.fill();
    ctx.lineWidth = Math.max(8, size * 0.06);
    ctx.strokeStyle = "#173f5f";
    ctx.stroke();
    drawStar(ctx, cx, top + size * 0.43, size * 0.22, size * 0.1, "#173f5f");
    ctx.restore();
  }

  function drawSchool(ctx, x, baseline, scale, flip = false) {
    ctx.save();
    ctx.translate(x, baseline);
    if (flip) ctx.scale(-1, 1);
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = "#24a89b";
    ctx.fillRect(0, -170 * scale, 360 * scale, 170 * scale);
    ctx.fillRect(85 * scale, -245 * scale, 190 * scale, 245 * scale);
    ctx.fillStyle = "#fff";
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        ctx.fillRect((22 + col * 64) * scale, (-145 + row * 46) * scale, 33 * scale, 24 * scale);
      }
    }
    ctx.fillRect(145 * scale, -74 * scale, 72 * scale, 74 * scale);
    ctx.restore();
  }

  function drawMedal(ctx, cx, cy, number, label) {
    ctx.save();
    ctx.fillStyle = "#173f5f";
    ctx.beginPath();
    ctx.moveTo(cx - 48, cy - 62);
    ctx.lineTo(cx - 15, cy - 8);
    ctx.lineTo(cx + 4, cy - 70);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + 48, cy - 62);
    ctx.lineTo(cx + 15, cy - 8);
    ctx.lineTo(cx - 4, cy - 70);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 76, 0, Math.PI * 2);
    ctx.fillStyle = "#ffcf49";
    ctx.fill();
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#f09a2b";
    ctx.stroke();
    drawStar(ctx, cx, cy - 8, 35, 16, "#fff7d2");
    ctx.fillStyle = "#173f5f";
    ctx.font = `900 28px ${FONT_FAMILY}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(number), cx, cy + 44);
    ctx.font = `800 26px ${FONT_FAMILY}`;
    ctx.fillText(label, cx, cy + 118);
    ctx.restore();
  }

  function renderCertificateCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.fillStyle = "#fffdf5";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gradient.addColorStop(0, "rgba(223,247,243,.9)");
    gradient.addColorStop(0.5, "rgba(255,253,245,.45)");
    gradient.addColorStop(1, "rgba(255,245,200,.82)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    roundedRect(ctx, 72, 72, CANVAS_WIDTH - 144, CANVAS_HEIGHT - 144, 48, null, "#173f5f", 28);
    roundedRect(ctx, 112, 112, CANVAS_WIDTH - 224, CANVAS_HEIGHT - 224, 36, null, "#24a89b", 16);
    roundedRect(ctx, 144, 144, CANVAS_WIDTH - 288, CANVAS_HEIGHT - 288, 28, null, "#f2b632", 7);

    drawSchool(ctx, 150, CANVAS_HEIGHT - 150, 1.05, false);
    drawSchool(ctx, CANVAS_WIDTH - 150, CANVAS_HEIGHT - 150, 1.05, true);
    drawShield(ctx, 390, 170, 190);
    drawShield(ctx, CANVAS_WIDTH - 390, 170, 190);
    drawStar(ctx, 690, 230, 46, 21, "#f2b632");
    drawStar(ctx, CANVAS_WIDTH - 690, 230, 46, 21, "#f2b632");

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#173f5f";
    ctx.font = `900 118px ${FONT_FAMILY}`;
    ctx.fillText("安全守護隊 通關獎狀", CANVAS_WIDTH / 2, 285);

    ctx.fillStyle = "#49666c";
    ctx.font = `700 48px ${FONT_FAMILY}`;
    ctx.fillText("茲證明", CANVAS_WIDTH / 2, 445);

    ctx.fillStyle = "#173f5f";
    ctx.font = `900 72px ${FONT_FAMILY}`;
    ctx.fillText("＿＿＿＿＿＿＿＿＿＿ 同學", CANVAS_WIDTH / 2, 555);

    ctx.fillStyle = "#344f55";
    ctx.font = `700 45px ${FONT_FAMILY}`;
    ctx.fillText("完成《安全守護隊》校園安全學習任務，學會：", CANVAS_WIDTH / 2, 675);

    const medalLabels = ["走廊", "排隊", "樓梯", "告知", "界線", "放學", "陌生人"];
    const medalStart = 520;
    const medalGap = (CANVAS_WIDTH - medalStart * 2) / 6;
    medalLabels.forEach((label, index) => drawMedal(ctx, medalStart + medalGap * index, 820, index + 1, label));

    roundedRect(ctx, 440, 1020, CANVAS_WIDTH - 880, 560, 42, "rgba(255,255,255,.78)", "#b7dcd8", 8);
    const skills = [
      "走廊安全", "排隊與運動會安全", "樓梯安全", "去哪裡先告知大人",
      "身體界線與求助", "放學安全", "陌生人安全"
    ];
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `800 43px ${FONT_FAMILY}`;
    skills.forEach((skill, index) => {
      const column = index < 4 ? 0 : 1;
      const row = column === 0 ? index : index - 4;
      const x = column === 0 ? 625 : 1900;
      const y = 1110 + row * 112;
      ctx.fillStyle = "#14917f";
      ctx.fillText("✓", x, y);
      ctx.fillStyle = "#173f5f";
      ctx.fillText(skill, x + 75, y);
    });

    ctx.textAlign = "center";
    ctx.fillStyle = "#344f55";
    ctx.font = `700 43px ${FONT_FAMILY}`;
    ctx.fillText("順利完成所有安全任務，特頒發", CANVAS_WIDTH / 2, 1680);
    drawShield(ctx, 940, 1750, 125);
    ctx.fillStyle = "#0d756b";
    ctx.font = `900 82px ${FONT_FAMILY}`;
    ctx.fillText("安全守護隊小高手", CANVAS_WIDTH / 2 + 95, 1815);
    ctx.fillStyle = "#49666c";
    ctx.font = `700 42px ${FONT_FAMILY}`;
    ctx.fillText("以資鼓勵", CANVAS_WIDTH / 2, 1940);

    ctx.textAlign = "left";
    ctx.fillStyle = "#173f5f";
    ctx.font = `700 43px ${FONT_FAMILY}`;
    ctx.fillText("完成日期：＿＿年＿＿月＿＿日", 620, 2150);
    ctx.fillText("教師：＿＿＿＿＿＿＿＿", 2180, 2150);
    ctx.font = `700 30px ${FONT_FAMILY}`;
    ctx.fillStyle = "#698086";
    ctx.textAlign = "center";
    ctx.fillText("校園安全學習任務", CANVAS_WIDTH / 2, 2290);
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
    const imageBytes = dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.96));
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
    for (let objectNumber = 1; objectNumber <= 5; objectNumber += 1) {
      pushText(`${String(offsets[objectNumber]).padStart(10, "0")} 00000 n \n`);
    }
    pushText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
    return new Blob([joinBytes(chunks, length)], { type: "application/pdf" });
  }

  function createPdfBlob() {
    return canvasToPdfBlob(renderCertificateCanvas());
  }

  function downloadPdf() {
    const blob = createPdfBlob();
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

  function printCertificate() {
    const imageUrl = renderCertificateCanvas().toDataURL("image/png");
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

  window.SAFETY_CERTIFICATE = Object.freeze({
    FILE_NAME,
    createPdfBlob,
    downloadPdf,
    printCertificate,
    renderCertificateCanvas
  });
})();
