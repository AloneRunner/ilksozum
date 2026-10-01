import { ImageMetadata } from '../../types.ts';
import { imageData_001_100 } from './imageData-001-100.ts';
import { imageData_101_200 } from './imageData-101-200.ts';
import { imageData_201_300 } from './imageData-201-300.ts';
import { imageData_301_400 } from './imageData-301-400.ts';
import { imageData_401_500 } from './imageData-401-500.ts';
import { imageData_501_600 } from './imageData-501-600.ts';
import { imageData_601_700 } from './imageData-601-700.ts';
import { imageData_701_800 } from './imageData-701-800.ts';
import { imageData_801_900 } from './imageData-801-900.ts';
import { imageData_901_1000 } from './imageData-901-1000.ts';
import { imageDataYeni } from './imageData-yeni.ts';
import { YENI_SORULAR_AKTIF } from './activities/yeni/index.ts';


// This is the new single source of truth for all image metadata,
// combined from multiple chunked files for better maintainability.
export const imageData: ImageMetadata[] = [
    ...imageData_001_100,
    ...imageData_101_200,
    ...imageData_201_300,
    ...imageData_301_400,
    ...imageData_401_500,
    ...imageData_501_600,
    ...imageData_601_700,
    ...imageData_701_800,
    ...imageData_801_900,
    ...imageData_901_1000,
    // Yeni gerçekçi görseller: yalnızca YENI_SORULAR_AKTIF iken (şimdilik geliştirme sunucusu)
    ...(YENI_SORULAR_AKTIF ? imageDataYeni : []),
].sort((a, b) => a.id - b.id);
