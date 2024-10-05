async function translateCityName(cityName = "") {
  //   const response = await fetch(
  //     `https://ftapi.pythonanywhere.com/translate?sl=ru&dl=en&text=литва`,
  //     { mode: "no-cors", headers: { Accept: "application/json" } },
  //   );

  //   if (response.ok) {
  //     const obj = await response.json();

  //     return obj;
  //   } else {
  //     return response.status;
  //   }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=3b2f72a07156e4f1ceac1d71e3e3619d`,
    { mode: "no-cors", headers: { Accept: "application/json" } },
  );

  if (response.ok) {
    const obj = await response.json();

    return obj;
  } else {
    return response.status;
  }
}

export { translateCityName };
