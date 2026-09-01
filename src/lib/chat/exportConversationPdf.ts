import { jsPDF, GState } from "jspdf";
import type { ChatEntry } from "@/components/organisms/ChatInterface";

/**
 * Client-only PDF export of a chat conversation — NOT a screenshot/print of the
 * page. Renders each question/answer as its own styled block (with word wrap,
 * pagination and a source citation line), plus a light Círculo Vivo watermark
 * on every page. Must run in the browser (uses Image/canvas to rasterize the
 * logo and triggers a file download).
 */

const BRAND_TEAL: [number, number, number] = [112, 139, 141]; // #708b8d
const TEXT_DARK: [number, number, number] = [26, 28, 28]; // #1a1c1c
const TEXT_GRAY: [number, number, number] = [107, 114, 128]; // #6b7280
const BORDER_GRAY: [number, number, number] = [215, 215, 215]; // #d7d7d7
const BUBBLE_TEAL: [number, number, number] = [204, 217, 218]; // light tint of brand teal

const PAGE_MARGIN = 18;
const CONTENT_WIDTH = 210 - PAGE_MARGIN * 2; // A4 width in mm minus margins

/** Strips inline markdown syntax the LLM may return, keeping plain readable text. */
function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, ""))
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .trim();
}

/** Rasterizes an SVG file into a PNG data URL so jsPDF can draw it as a watermark. */
async function loadWatermarkImage(
  svgUrl: string
): Promise<{ dataUrl: string; aspectRatio: number } | null> {
  try {
    const res = await fetch(svgUrl);
    if (!res.ok) return null;
    const svgText = await res.text();

    const img = new Image();
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgText)))}`;

    const loaded = await new Promise<HTMLImageElement | null>((resolve) => {
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = svgDataUrl;
    });
    if (!loaded || !loaded.width || !loaded.height) return null;

    const scale = 4; // render at higher resolution than final display size
    const canvas = document.createElement("canvas");
    canvas.width = loaded.width * scale;
    canvas.height = loaded.height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(loaded, 0, 0, canvas.width, canvas.height);

    return { dataUrl: canvas.toDataURL("image/png"), aspectRatio: loaded.width / loaded.height };
  } catch {
    return null;
  }
}

function drawWatermark(doc: jsPDF, watermark: { dataUrl: string; aspectRatio: number } | null) {
  if (!watermark) return;
  const width = 110;
  const height = width / watermark.aspectRatio;
  const x = (210 - width) / 2;
  const y = (297 - height) / 2;

  doc.saveGraphicsState();
  doc.setGState(new GState({ opacity: 0.06 }));
  doc.addImage(watermark.dataUrl, "PNG", x, y, width, height);
  doc.restoreGraphicsState();
}

function drawFooter(doc: jsPDF, pageNumber: number, pageCount: number) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_GRAY);
  doc.text("Círculo Vivo — Plataforma de Sistemas Alimentarios", PAGE_MARGIN, 297 - 10);
  doc.text(`Página ${pageNumber} de ${pageCount}`, 210 - PAGE_MARGIN, 297 - 10, { align: "right" });
}

function entryToPlainText(entry: Extract<ChatEntry, { role: "assistant" }>): string {
  if (entry.markdown) return stripMarkdown(entry.markdown);
  const parts: string[] = [];
  if (entry.intro) parts.push(entry.intro);
  if (entry.items?.length) {
    parts.push(
      entry.items.map((i) => `${i.number} ${i.title}${i.description ? `\n${i.description}` : ""}`).join("\n")
    );
  }
  return parts.join("\n\n");
}

export async function exportConversationToPdf(messages: ChatEntry[]): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const watermark = await loadWatermarkImage("/logo.svg");

  let y = PAGE_MARGIN;
  const bottomLimit = 297 - PAGE_MARGIN - 8;

  function newPage() {
    doc.addPage();
    drawWatermark(doc, watermark);
    y = PAGE_MARGIN;
  }

  function ensureSpace(neededHeight: number) {
    if (y + neededHeight > bottomLimit) newPage();
  }

  // First page: draw watermark now (subsequent pages get it when created)
  drawWatermark(doc, watermark);

  // ── Document header ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...BRAND_TEAL);
  doc.text("Conversación con el Asistente", PAGE_MARGIN, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_GRAY);
  doc.text("Círculo Vivo · Plataforma de Sistemas Alimentarios", PAGE_MARGIN, y);
  y += 5;

  const generatedAt = new Date().toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  });
  doc.text(`Generado el ${generatedAt}`, PAGE_MARGIN, y);
  y += 4;

  doc.setDrawColor(...BORDER_GRAY);
  doc.line(PAGE_MARGIN, y, 210 - PAGE_MARGIN, y);
  y += 8;

  const usableMessages = messages.filter((m) => !(m.role === "assistant" && m.isLoading));

  for (const entry of usableMessages) {
    if (entry.role === "user") {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(entry.message, CONTENT_WIDTH - 12);
      const blockHeight = lines.length * 5.2 + 10;

      ensureSpace(blockHeight);

      doc.setFillColor(...BUBBLE_TEAL);
      doc.roundedRect(PAGE_MARGIN, y, CONTENT_WIDTH, blockHeight - 4, 3, 3, "F");
      doc.setTextColor(...TEXT_DARK);
      doc.text(lines, PAGE_MARGIN + 6, y + 7);
      y += blockHeight + 4;
      continue;
    }

    // Assistant entry
    if (entry.error) {
      const noteLines = doc.splitTextToSize(
        "No se pudo obtener una respuesta para esta pregunta.",
        CONTENT_WIDTH - 12
      );
      const blockHeight = noteLines.length * 5.2 + 14;
      ensureSpace(blockHeight);

      doc.setDrawColor(...BORDER_GRAY);
      doc.roundedRect(PAGE_MARGIN, y, CONTENT_WIDTH, blockHeight - 4, 3, 3, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...BRAND_TEAL);
      doc.text("ASISTENTE CÍRCULO VIVO", PAGE_MARGIN + 6, y + 7);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(...TEXT_GRAY);
      doc.text(noteLines, PAGE_MARGIN + 6, y + 14);
      y += blockHeight + 4;
      continue;
    }

    const bodyText = entryToPlainText(entry);
    if (!bodyText) continue;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const bodyLines = doc.splitTextToSize(bodyText, CONTENT_WIDTH - 12);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    const citationLines = entry.citation ? doc.splitTextToSize(entry.citation, CONTENT_WIDTH - 12) : [];

    const headerHeight = 12;
    const bodyHeight = bodyLines.length * 5.2;
    const citationHeight = citationLines.length ? citationLines.length * 4 + 4 : 0;
    const blockHeight = headerHeight + bodyHeight + citationHeight + 8;

    ensureSpace(blockHeight);

    doc.setDrawColor(...BORDER_GRAY);
    doc.roundedRect(PAGE_MARGIN, y, CONTENT_WIDTH, blockHeight - 4, 3, 3, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...BRAND_TEAL);
    doc.text("ASISTENTE CÍRCULO VIVO", PAGE_MARGIN + 6, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...TEXT_DARK);
    doc.text(bodyLines, PAGE_MARGIN + 6, y + headerHeight + 2);

    if (citationLines.length) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(...TEXT_GRAY);
      doc.text(citationLines, PAGE_MARGIN + 6, y + headerHeight + bodyHeight + 6);
    }

    y += blockHeight + 4;
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, i, pageCount);
  }

  const timestamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  doc.save(`circulo-vivo-conversacion-${timestamp}.pdf`);
}
