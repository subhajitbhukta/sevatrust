// Convert each HTML slide to a single PDF page, then merge into one PDF.
// Uses Playwright to snapshot each slide at exactly 1280x720 and produce
// a single-page PDF per slide, then merges them via pdf-lib.

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { PDFDocument } = require('pdf-lib');

const SLIDES_DIR = '/home/z/my-project/download/slides';
const OUTPUT_PDF = '/home/z/my-project/download/Ananya-Seva-Trust-Platform-Briefing.pdf';

// Slide dimensions in CSS pixels
const W = 1280;
const H = 720;

async function renderSlideToPdf(browser, htmlPath) {
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2, // retina-quality
  });
  const page = await context.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  // Allow web fonts to load
  await page.waitForTimeout(800);
  // Make sure body has the slide dimensions exactly
  await page.addStyleTag({
    content: `
      html, body { margin: 0; padding: 0; width: ${W}px; height: ${H}px; overflow: hidden; }
      .slide { width: ${W}px !important; height: ${H}px !important; min-height: ${H}px !important; max-height: ${H}px !important; }
    `,
  });
  const pdfBytes = await page.pdf({
    width: W + 'px',
    height: H + 'px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    pageRanges: '1',
  });
  await context.close();
  return pdfBytes;
}

async function main() {
  const slideFiles = fs
    .readdirSync(SLIDES_DIR)
    .filter((f) => /^slide_\d+\.html$/.test(f))
    .sort();

  console.log('Found slides:', slideFiles);

  const browser = await chromium.launch({ headless: true });
  const mergedPdf = await PDFDocument.create();

  for (const f of slideFiles) {
    const htmlPath = path.join(SLIDES_DIR, f);
    console.log('Rendering', f, '...');
    const pdfBytes = await renderSlideToPdf(browser, htmlPath);
    const singlePdf = await PDFDocument.load(pdfBytes);
    const [page] = await mergedPdf.copyPages(singlePdf, [0]);
    mergedPdf.addPage(page);
  }

  await browser.close();

  const finalBytes = await mergedPdf.save();
  fs.writeFileSync(OUTPUT_PDF, finalBytes);
  console.log('Saved:', OUTPUT_PDF, '(' + (finalBytes.length / 1024).toFixed(1) + ' KB)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
