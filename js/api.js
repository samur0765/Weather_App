//BaseUrl
const baseUrl= "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "c1cda676e0c654fe93fab776562a39ff";




// *Kendisine dışarıdan vreilen ülke kodu ile ilgili ülkenin bayrağını return eden fonksiyon
const getFlagUrl = (countryCode)=>
    `https://flagcdn.com/w80/${countryCode.toLocaleLowerCase()}.png`;



// *Hava durumu verilerini alan fonksiyon

const getWeather =async (city) =>{
   try {
    //Api'a istek at 
    const response =await fetch(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}&lang=tr`);

    //Gelen veriyi js nesnesine çevir
  const weatherData =await response.json();
  
  //Eğer istek başarısız ise hata fırlat
  if(!response.ok){
    throw new Error("Aratılan şehir bulunamadı.");
  }

  //Elde edilen weatherDatayı return et
  return weatherData;
    
   } catch (error) {

    //Eğer olursa bir hata fırlat
        throw error;
   }
};

export {getWeather ,getFlagUrl};