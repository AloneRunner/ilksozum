// This file acts as a barrel, exporting all activity data from one place.

export * from './sensesData';
export * from './qualities';
export * from './quantities';
export * from './spatial';
export * from './temporalData';
// Reasoning datasets (split by type)
export * from './reasoning/whatDoesntBelongData.js';
// functionalMatchingData removed - now integrated into 5N1K "What?" category
export * from './reasoning/causeEffectData.js';
export * from './reasoning/fiveWOneHData';
export * from './reasoning/sequencingStoriesData';
export * from './reasoning/patternCompletionData';
export * from './reasoning/sudokuData';
export * from './reasoning/memoryCardsData';
export * from './reasoning/dragAndDropCountingData';
export * from './reasoning/dragAndDropPositioningData';
export * from './reasoning/ownershipData';
export * from './reasoning/colorRecognitionData';
export * from './reasoning/whatsMissingData';
