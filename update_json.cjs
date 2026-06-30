const fs = require('fs');
const path = require('path');
const dirs = ['tr', 'en', 'de', 'fr', 'nl', 'az'];

const updates = {
  tr: {
    desc: "Tüm eğitim içeriği ücretsizdir ve herkese açıktır. Premium; reklamları kaldırma, temalar, çalışma kağıtları (çıktı merkezi) ve hızlı geçiş gibi konfor özellikleri sunar. Yeni kullanıcılara 7 günlük deneme süresi tanımlanır. Destek olmak isterseniz Premium satın alabilirsiniz.",
    items: [
      "Çıktı Merkezi (Çalışma Kağıtları) eklendi: Çocuğunuz için masa başı eğitim materyalleri hazırlayabilirsiniz.",
      "Çalışma kağıtları bilgisayarda test edildi ve sorunsuz çalışıyor. Mobil cihaz performansı henüz test aşamasındadır."
    ]
  },
  en: {
    desc: "All educational content is free and open to everyone. Premium offers comfort features like ad removal, themes, printout worksheets, and fast transitions. New users get a 7-day trial. You can purchase Premium to support us.",
    items: [
      "Added Printout Center (Worksheets): Generate educational print materials for your child.",
      "Printouts are tested and working perfectly on computers. Mobile device performance is currently under testing."
    ]
  },
  de: {
    desc: "Alle Bildungsinhalte sind kostenlos und für alle zugänglich. Premium bietet Komfortfunktionen wie Werbefreiheit, Themes, Arbeitsblätter zum Ausdrucken und schnelle Übergänge. Neue Benutzer erhalten eine 7-tägige Testversion. Sie können Premium kaufen, um uns zu unterstützen.",
    items: [
      "Druckzentrum (Arbeitsblätter) hinzugefügt: Erstellen Sie pädagogische Druckmaterialien.",
      "Arbeitsblätter wurden erfolgreich auf Computern getestet. Die Leistung auf Mobilgeräten wird derzeit getestet."
    ]
  },
  fr: {
    desc: "Tout le contenu éducatif est gratuit et ouvert à tous. Premium offre des fonctions de confort comme la suppression des publicités, des thèmes, des fiches de travail et des transitions rapides. Les nouveaux utilisateurs bénéficient d'un essai de 7 jours. Vous pouvez acheter Premium pour nous soutenir.",
    items: [
      "Centre d'impression (Fiches de travail) ajouté : Générez des supports éducatifs imprimables.",
      "Les fiches fonctionnent parfaitement sur ordinateur. Les performances sur mobile sont actuellement en cours de test."
    ]
  },
  nl: {
    desc: "Alle educatieve inhoud is gratis en voor iedereen toegankelijk. Premium biedt extra functies zoals geen advertenties, thema's, afdrukbare werkbladen en snelle overgangen. Nieuwe gebruikers krijgen een proefperiode van 7 dagen. U kunt Premium kopen om ons te steunen.",
    items: [
      "Afdrukcentrum (Werkbladen) toegevoegd: Genereer educatief afdrukmateriaal voor uw kind.",
      "Afdrukken zijn met succes getest op computers. Prestaties op mobiele apparaten worden momenteel getest."
    ]
  },
  az: {
    desc: "Bütün təhsil məzmunu pulsuzdur və hər kəs üçün açıqdır. Premium, reklamsız, mövzular, çap mərkəzi və sürətli keçid kimi rahatlıq xüsusiyyətləri təklif edir. Yeni istifadəçilərə 7 günlük sınaq müddəti verilir. Bizi dəstəkləmək üçün Premium ala bilərsiniz.",
    items: [
      "Çap Mərkəzi (İş Vərəqləri) əlavə edildi: Uşağınız üçün masaüstü təhsil materialları hazırlaya bilərsiniz.",
      "Çap materialları kompüterdə yoxlanılıb və problemsiz işləyir. Mobil cihaz performansı hazırda sınaq mərhələsindədir."
    ]
  }
};

for (const lang of dirs) {
  const fp = path.join('src', 'i18n', lang, 'screens.json');
  if (fs.existsSync(fp)) {
    let raw = fs.readFileSync(fp, 'utf8');
    let data = JSON.parse(raw);
    
    // Update premium desc
    if (data.settingsEx && data.settingsEx.premium) {
      data.settingsEx.premium.desc = updates[lang].desc;
    }
    
    // Update update details
    if (data.developmentNotes && data.developmentNotes.thisUpdate) {
      data.developmentNotes.thisUpdate.items = updates[lang].items;
    }
    
    fs.writeFileSync(fp, JSON.stringify(data, null, 2));
    console.log('Updated ' + fp);
  }
}
