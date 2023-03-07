import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Child,
  Container,
  Container2,
  ContainerMain,
  Input,
  Main,
} from "./style";

function Home() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [visi, setVisi] = useState(null);
  const [sun, setSun] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4b0305f8fc8f0b9f50ce09c4ed20a628`
      )
      .then((response) => {
        setData(response.data.main),
          setName(response.data.name),
          setSun(response.data.sys),
          setVisi(response.data.visibility);
      });
  }, [search]);

  function handleSearch(): any {
    setSearch(city);
  }

  return (
    <Main>
      <ContainerMain>
        <Container>
          <h1>Weather App</h1>
          <Input
            type="text"
            defaultValue="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button onClick={handleSearch}>Submit</Button>
        </Container>

        <Container2>
          <Child>
            <p>Name:{name}</p>
            <p>Pressure:{data.pressure}</p>
            <p>Tempreture:{data.temp}</p>
          </Child>
          <Child>
            <p>Sunrise:{sun.sunrise}</p>
            <p>Sunset:{sun.sunset}</p>
            <p>Visibility:{visi}</p>
          </Child>
        </Container2>
      </ContainerMain>
      <section className="vh-100" style={{ backgroundColor: "#f5f6f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "40px" }}
              >
                <div className="bg-image" style={{ borderRadius: "35px" }}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                    className="card-img"
                    alt="weather"
                  />
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(190, 216, 232, .5)" }}
                  ></div>
                </div>
                <div className="card-img-overlay text-dark p-5">
                  <h4 className="mb-0">Juneau, Alaska, US</h4>
                  <p className="display-2 my-3">1.28°C</p>
                  <p className="mb-2">
                    Feels Like: <strong>-1.08 °C</strong>
                  </p>
                  <h5>Snowy</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}

export default Home;
