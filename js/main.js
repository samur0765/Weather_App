import { getFlagUrl, getWeather } from "./api.js";
import cities from "./canstants.js";
import { displayWeather, elements, hideError, hideLoader, showError, showLoader, updateThemeIcon } from "./ui.js";

//  const data = await getWeather("Van");

// const url = getFlagUrl(data.sys.country.toLowerCase());

const body = document.body;
//Tema attribute
const savedTheme = localStorage.getItem("data-theme") || "light";

//Body'e tema attribute'ünü aktar
body.setAttribute("data-theme", savedTheme);

//Tema butonuna tıklanınca çalışacak fonksiyon
elements.themeBtn.addEventListener("click", () => {
    //Mevcut temaya eriş
    const currentTheme = body.getAttribute("data-theme");

    //Yeni temaya belirle
    const newTheme = currentTheme === "light" ? "dark" : "light";

    //Yeni temayı body'e attribute olarak aktar
    body.setAttribute("data-theme", newTheme);

    //Temayı local stroga'a kaydet
    localStorage.setItem("data-theme", newTheme);

    //Icon'u güncelle
    updateThemeIcon(newTheme);
});


//Sayfa yüklendiği anda
document.addEventListener("DOMContentLoaded", () => {
    //Option oluştur
    createOption(cities);


})

elements.form.addEventListener("submit", async (e) => {
    //Sayfa yenilenmesini engelle
    e.preventDefault();

    //Form içresindeki inputun değerine eriş
    const query = e.target[0].value.trim();

    //Eğer input boş ise fonksiyonu durdur
    if (!query) {
        alert("Şehir isminin girilmesi zorunludur.Lütfen şehir adı giriniz.");

        return;
    }
    //Loader'ı render et
    showLoader();

    try {
        //Api'dan hava durumu verilerini al
        const weatherData = await getWeather(query);

        //APi'dan bayrak verilerini al
        const flagUrl = getFlagUrl(weatherData.sys.country);

        //Hava durumu verilerini ve bayrağı render et
        displayWeather(weatherData, flagUrl);

        //Error'ı gizle
        hideError();
    } catch (error) {
        //Eğer hata varsa error fonksiyonunu çalıştır
        showError();
    } finally {

        //Loader'ı gizle
        hideLoader();
    }

});

//Data-list için option'lar oluşturan fonksiyon
const createOption = (cities) => {
    //Dışarıdan verilen şehir dizisini dön ve herbir dizi elemanı için bir option oluştur
    cities.forEach((city) => {
        //Her eleman için bir option oluştur
        const option = document.createElement("option");

        //Option'ların value'sunu şehir adı olarak ayarla
        option.value = city;

        //Oluşturulan  optionları html kısmındaki data-list elemanın içerisinde aktar
        elements.citiesDataList.appendChild(option);
    });
}

