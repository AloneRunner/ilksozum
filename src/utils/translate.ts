// Uygulama yalnızca Türkçe (2026-10, kullanıcıların ~%97'si Türkiye).
// Bu fonksiyonlar eski çok dilli koddan kalan çağrılar bozulmasın diye korunuyor:
// metni olduğu gibi döndürürler, konuşma dili her zaman tr-TR'dir.

export function translateLabel(text: string, _lang?: string): string {
	return text;
}

export function getSpeechLocale(_lang?: string): string {
	return 'tr-TR';
}

export function withIndefiniteArticle(word: string, _lang?: string): string {
	return word;
}

export function translateQuestion(text: string, _lang?: string): string {
	return text ? text.trim() : text;
}
