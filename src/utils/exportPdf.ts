import { t, getCurrentLanguage } from '../i18n/index.ts';

export async function printNativeAsPdf(containerId: string = 'rapor-alani', jobName: string = 'Calisma_Kagidi') {
  let isNative = false;
  try {
    const { Capacitor } = await import('@capacitor/core');
    isNative = Capacitor.isNativePlatform();
  } catch {
    isNative = false;
  }

  if (isNative) {
    try {
      const pluginName = '@capacitor/print';
      const { Print } = await import(/* @vite-ignore */ pluginName);
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`${containerId} not found`);
      
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="${getCurrentLanguage()}">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${jobName}</title>
            <style>
              body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background-color: white !important; margin: 0; padding: 0; }
              @page { margin: 0; size: A4; }
            </style>
          </head>
          <body>${container.outerHTML}</body>
        </html>`;
      await Print.print({ html: fullHtml, jobName });
    } catch (e) {
      console.warn('Capacitor Print failed:', e);
      window.print();
    }
  } else {
    window.print();
  }
}

export async function exportPrintAreaToPdf() {
  let isNative = false;
  try {
    const { Capacitor } = await import('@capacitor/core');
    isNative = Capacitor.isNativePlatform();
  } catch {
    isNative = false;
  }

  if (isNative) {
    try {
      const printPlugin = '@capacitor/print';
      const { Print } = await import(/* @vite-ignore */ printPlugin);

      const printContent = document.getElementById('rapor-alani');
      if (!printContent) {
        console.error('#rapor-alani elementi bulunamadı.');
        return;
      }

      const fullHtml = `
        <!DOCTYPE html>
        <html lang="${getCurrentLanguage()}">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${t('app.printPreview')}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="./index.css">
            <style>
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background-color: white !important;
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
          </body>
        </html>`;

      await Print.print({ html: fullHtml, jobName: t('app.pdfJobName') });
    } catch (error) {
      console.error('Capacitor Print plugin failed to load. Falling back to web print.', error);
      window.print();
    }
  } else {
    window.print();
  }
}

export async function savePrintAreaAsPdf(fileBaseName: string = 'IlkSozum-Kartlar') {
  const container = document.getElementById('rapor-alani');
  if (!container) {
    console.error('#rapor-alani elementi bulunamadı.');
    throw new Error('Rapor alanı bulunamadı');
  }

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const canvas = await html2canvas(container as HTMLElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const pxPerMm = canvas.width / pageWidth;
  const imgWidthMm = pageWidth;
  const imgHeightMm = canvas.height / pxPerMm;

  if (imgHeightMm <= pageHeight) {
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidthMm, imgHeightMm, undefined, 'FAST');
  } else {
    const pageHeightPx = Math.floor(pageHeight * pxPerMm);
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = pageHeightPx;
    const sliceCtx = sliceCanvas.getContext('2d');
    if (!sliceCtx) {
      throw new Error('Canvas context alınamadı');
    }

    let rendered = 0;
    while (rendered < canvas.height) {
      if (rendered > 0) {
        pdf.addPage();
      }
      const sliceHeight = Math.min(pageHeightPx, canvas.height - rendered);
      sliceCanvas.height = sliceHeight;
      sliceCtx.clearRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      sliceCtx.drawImage(
        canvas,
        0,
        rendered,
        canvas.width,
        sliceHeight,
        0,
        0,
        sliceCanvas.width,
        sliceHeight,
      );
      const sliceImg = sliceCanvas.toDataURL('image/jpeg', 0.95);
      const sliceHeightMm = sliceHeight / pxPerMm;
      pdf.addImage(sliceImg, 'JPEG', 0, 0, pageWidth, sliceHeightMm, undefined, 'FAST');
      rendered += sliceHeight;
    }
  }

  const pdfBlob = pdf.output('blob');
  const fileName = `${fileBaseName}.pdf`;

  let isNative = false;
  try {
    const { Capacitor } = await import('@capacitor/core');
    isNative = Capacitor.isNativePlatform();
  } catch {
    isNative = false;
  }

  if (isNative) {
    const fsMod = '@capacitor/filesystem';
    const shareMod = '@capacitor/share';
    const [{ Filesystem, Directory, Encoding }, { Share }] = await Promise.all([
      import(/* @vite-ignore */ fsMod),
      import(/* @vite-ignore */ shareMod).catch(() => ({ Share: undefined as any })),
    ]);

    const { Capacitor } = await import('@capacitor/core');
    const platform = Capacitor.getPlatform();

    if (
      platform === 'android' &&
      Filesystem &&
      typeof Filesystem.requestPermissions === 'function'
    ) {
      const status = await Filesystem.checkPermissions();
      if (
        status.publicStorage === 'prompt' ||
        status.publicStorage === 'prompt-with-rationale' ||
        status.publicStorage === 'denied'
      ) {
        const granted = await Filesystem.requestPermissions();
        if (granted.publicStorage !== 'granted') {
          throw new Error('storage-permission-denied');
        }
      }
    }

    const base64Data = await blobToBase64(pdfBlob);
    const targetPath = `IlkSozum/${fileName}`;
    let uri: string | undefined;

    try {
      const result = await Filesystem.writeFile({
        path: targetPath,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true,
        encoding: Encoding.BASE64,
      });
      uri = result.uri;
    } catch (documentsError) {
      console.warn('Documents write failed, trying app data directory:', documentsError);
      const fallback = await Filesystem.writeFile({
        path: targetPath,
        data: base64Data,
        directory: Directory.Data,
        recursive: true,
        encoding: Encoding.BASE64,
      });
      uri = fallback.uri;
    }

    if (!uri) {
      throw new Error('file-write-failed');
    }

    try {
      if (Share && typeof Share.share === 'function') {
        await Share.share({
          title: t('app.shareTitle'),
          text: t('app.shareText'),
          url: uri,
          dialogTitle: t('app.shareDialogTitle'),
        });
      }
    } catch (shareError) {
      console.warn('Share başarısız veya iptal edildi:', shareError);
    }

    return uri;
  } else {
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return fileName;
  }
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
