import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Child,
  Container,
  Container2,
  ContainerMain,
  GridContainer,
  GridItem,
  Input,
  Main,
} from "./style";

function Home(): JSX.Element {
  const [city, setCity] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any>({});
  const [name, setName] = useState<string | null>(null);
  const [visi, setVisi] = useState<number | null>(null);
  const [sun, setSun] = useState<any>({});
  const [isFetch, setisFetch] = useState<boolean>(false);
  const [desc, setDesc] = useState<string | undefined>();
  const [desc1, setDesc1] = useState<string | undefined>();
  useEffect(() => {
    axios
      .get<any>(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=4b0305f8fc8f0b9f50ce09c4ed20a628`
      )
      .then((response) => {
        setData(response.data.main),
          setName(response.data.name),
          setSun(response.data.sys),
          setVisi(response.data.visibility),
          setDesc(response.data.weather[0].description),
          setDesc1(response.data.weather[0].main);
      });
  }, [search]);
  useEffect(() => {
    if (desc1 == "Clear") {
      document.body.style.backgroundImage = "url('src/assets/clear.jpg')";
    } else if (desc1 == "Smoke") {
      document.body.style.backgroundImage = "url('src/assets/sunny.jpg')";
    } else if (desc1 == "Clouds") {
      document.body.style.backgroundImage = "url('src/assets/cloud.jpg')";
    } else if (desc1 == "Rain") {
      document.body.style.backgroundImage = "url('src/assets/rain.jpg')";
    } else if (desc1 == "Snow") {
      document.body.style.backgroundImage = "url('src/assets/snow.jpg')";
    } else if (desc1 == "Thunderstorm") {
      document.body.style.backgroundImage =
        "url('src/assets/thunderstorm.jpg')";
    }
  });
  function handleSearch(): any {
    setSearch(city);
    setisFetch(true);
  }
  return (
    <Main>
      <ContainerMain>
        <Container>
          <h1>Weather App</h1>
          <Input
            type="text"
            placeholder="Enter City Name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button onClick={handleSearch}>Submit</Button>
        </Container>
        {isFetch && (
          <Container2>
            <Container>
              <section style={{ backgroundColor: "#f5f6f7", width: "235px" }}>
                <div className="container py-5 ">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-10 col-lg-8 col-xl-6">
                      <div
                        className="card bg-dark text-white"
                        style={{ borderRadius: "40px" }}
                      >
                        <div
                          className="bg-image"
                          style={{ borderRadius: "35px" }}
                        >
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(190, 216, 232, .5)",
                            }}
                          ></div>
                        </div>
                        <div className="card-img-overlay text-dark p-5">
                          <h4 className="mb-0">
                            {name}, {sun.country}
                          </h4>
                          <p className="display-2 my-3">{data.temp}°C</p>
                          <p className="mb-2">
                            Feels Like: <strong>{data.feels_like} °C</strong>
                          </p>{" "}
                          <p className="mb-2">
                            Humidity: <strong>{data.humidity}</strong>
                          </p>
                          <h5>{desc}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Container>
            <GridContainer>
              <GridItem>
                <p>Name:{name}</p>
              </GridItem>
              <GridItem>
                <p>Pressure:{data.pressure}</p>
              </GridItem>
              <GridItem>
                <p>Tempreture:{data.temp}</p>
              </GridItem>
              <GridItem>
                <p>Sunrise:{sun.sunrise}</p>
              </GridItem>
              <GridItem>
                <p>Sunset:{sun.sunset}</p>
              </GridItem>
              <GridItem>
                <p>Visibility:{visi}</p>
              </GridItem>
            </GridContainer>
          </Container2>
        )}
      </ContainerMain>
    </Main>
  );
}

export default Home;
