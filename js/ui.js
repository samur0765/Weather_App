//Html'den çekilecek elemanları bir arada tutan obje

const elements = {
    form: document.querySelector("form"),
    loader: document.querySelector("#loader"),
    errorMessage: document.querySelector("#error-message"),
    weatherContainer: document.querySelector("#weather-container"),
    location: document.querySelector("#location"),
    countryFlag: document.querySelector(".country-flag"),
    date: document.querySelector("#date"),
    temparature: document.querySelector("#temparature"),
    feelLike: document.querySelector("#feel-like"),
    weatherIcon: document.querySelector(".weather-icon"),
    weatherDescription: document.querySelector("#weather-description"),
    windSpeed: document.querySelector("#wind-speed"),
    humidity: document.querySelector("#humidity"),
    pressure: document.querySelector("#pressure"),
    citiesDataList:document.querySelector("#turkish-cities"),
    themeBtn:document.querySelector("#theme-toggle-btn")
};

//Loader'ı aktif eden fonksiyon
const showLoader = () => {
    elements.loader.style.display = "flex";
    elements.weatherContainer.classList.add("hidden");
};


//Loader'yok eden fonksiyon
const hideLoader = () =>{
    elements.loader.style.display = "none";
}

//Error'ı render eden fonksiyon
const showError = () =>{
    ///Error'ın gözükmesi için  show classını ekle
    elements.errorMessage.classList.add("show");
}

//Erorr'ı gizleyen fonksiyon
const hideError = () =>{
    elements.errorMessage.classList.remove("show");
}

//Api'dan gelen hava durumu verisi ve bayrak ile arayüzü renderlayan fonksiyon

const displayWeather = (data, flagUrl) => {
    //Güncel tarih verisini elde et
    const date = new Date().toLocaleDateString("tr", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
    });


    //Şehir adı ve ülke kodunu güncelle
    elements.location.textContent = `${data.name}, ${data.sys.country}`;

    //Bayrağı güncelle
    elements.countryFlag.innerHTML= ` <img src="${flagUrl}" alt="flag">`

    //Tarihi güncelle
    elements.date.textContent = date;

    //Sıcaklık ve Hissedilen Sıcaklığı güncelle
    elements.temparature.textContent = Math.round(data.main.temp) + "°C";
    elements.feelLike.textContent = `Hissedilen ${Math.round(data.main.feels_like) + "°C"}`;

    //Icon ve Descripton kısmını güncelle
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}2x.png`
    elements.weatherDescription.textContent = `${data.weather[0].description}`;


    //Wind && Humidity && Pressure kısımlarını güncelle
    elements.windSpeed.textContent= `${data.wind.speed}m/s`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.pressure.textContent = `${data.main.pressure}hPa`;


    
    //Weather Container'ı görünür kıl
    elements.weatherContainer.classList.remove("hidden");
}

//Tema ıconunu göncelleyen fonksiyon
const updateThemeIcon =(theme) => {
   const icon = elements.themeBtn.querySelector("i");

   //Icon'a eriş

   //Buton içeriği eğer tema koyu tema ise güneş değilse ay iconu olsun
   icon.className = theme === "light" ? "fa-solid fa-moon": "fa-solid fa-sun";
}




export { elements, displayWeather, showLoader, hideLoader, showError , hideError, updateThemeIcon};