import { getCurrentLanguage } from '../i18n/index.ts';

const trPolicyTitle = "Gizlilik Politikası";
const enPolicyTitle = "Privacy Policy";

const trSections = [
    {
        title: "1. Giriş",
        content: `<strong>Uygulama Adı:</strong> İlk Sözüm: Otizm & Okul Öncesi<br>
                  <strong>Geliştirici:</strong> Ozarik<br>
                  <strong>Son Güncelleme:</strong> 27 Temmuz 2024<br><br>
                  "İlk Sözüm: Otizm & Okul Öncesi" ("Uygulama") olarak, kullanıcılarımızın ve özellikle çocuklarımızın gizliliğini korumaya büyük önem veriyoruz. Bu gizlilik politikası, uygulamamızın hangi verileri nasıl kullandığını şeffaf bir şekilde açıklamaktadır.`
    },
    {
        title: "2. Toplanan Veriler ve Cihaz Üzerinde Saklama",
        content: `Uygulamamız, kullanıcılarından kesinlikle hiçbir <strong>kişisel tanımlayıcı bilgi</strong> (isim, e-posta adresi, konum, fotoğraf vb.) toplamaz veya saklamaz. Oyun ilerlemeniz, ayarlarınız ve premium üyelik durumunuz gibi veriler, yalnızca sizin cihazınızda yerel olarak saklanır, sunucularımıza gönderilmez ve üçüncü taraflarla paylaşılmaz.`
    },
    {
        title: "3. Uygulama İçi Satın Alımlar",
        content: `Uygulama şu anda reklamsızdır ve tüm Premium özellikler tüm kullanıcıların erişimine açıktır. İsteğe bağlı destek amacıyla <strong>Google Play Store</strong> üzerinden uygulama içi satın alma seçenekleri sunulabilir.
        <ul>
            <li class="mt-2"><strong>Google Play Store:</strong> Satın alma işlemleri doğrudan ve güvenli bir şekilde Google tarafından yönetilir. Ödeme bilgileriniz bizimle paylaşılmaz.</li>
        </ul>`
    },
    {
        title: "4. Çocukların Gizliliği ve Aile Politikası",
        content: `Bu uygulama özellikle 13 yaş altı çocuklar için tasarlanmıştır ve Google Play Aile Politikası gereksinimlerine tam olarak uymaktadır. Çocuklardan bilerek hiçbir kişisel bilgi toplamıyoruz.`
    },
    {
        title: "5. İletişim",
        content: `Gizlilik politikamız veya ebeveyn haklarınızla ilgili herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:<br>
                  E-posta: <a href="mailto:kaanozarik@gmail.com" class="text-sky-600 hover:underline">kaanozarik@gmail.com</a>`
    }
];

const enSections = [
    {
        title: "1. Introduction",
        content: `<strong>App Name:</strong> My First Words: Learning Cards<br>
                  <strong>Developer:</strong> Ozarik<br>
                  <strong>Last Update:</strong> July 27, 2024<br><br>
                  We care deeply about the privacy of our users, especially children. This policy explains clearly which data the app uses and how.`
    },
    {
        title: "2. Data Collected and On-Device Storage",
        content: `Our app does not collect or store any <strong>personally identifiable information</strong> (such as name, email address, location, photos, etc.). Your game progress, settings, and premium status are stored <em>only on your device</em>, are not sent to our servers, and are not shared with third parties.`
    },
    {
        title: "3. In-App Purchases",
        content: `The app is currently ad-free, and all Premium features are available to every user. Optional in-app purchase options may be offered through the <strong>Google Play Store</strong> to support the app.
        <ul>
            <li class="mt-2"><strong>Google Play Store:</strong> Purchases are managed directly and securely by Google. Your payment information is not shared with us.</li>
        </ul>`
    },
    {
        title: "4. Children's Privacy and Families Policy",
        content: `This app is designed especially for children under the age of 13 and fully complies with Google Play Families Policy requirements. We do not knowingly collect any personal information from children.`
    },
    {
        title: "5. Contact",
        content: `If you have any questions about our privacy policy or your parental rights, please contact us:<br>
                  Email: <a href="mailto:kaanozarik@gmail.com" class="text-sky-600 hover:underline">kaanozarik@gmail.com</a>`
    }
];

export const policyTitle = getCurrentLanguage() === 'tr' ? trPolicyTitle : enPolicyTitle;
export const policySections = getCurrentLanguage() === 'tr' ? trSections : enSections;