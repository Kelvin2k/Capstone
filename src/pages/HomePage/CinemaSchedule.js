import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import manageTheatreService from "../../services/manageTheatreService";

const CinemaSchedule = () => {
  const [listFilm, setListFilm] = useState([]);
  useEffect(() => {
    manageTheatreService
      .getAllTheater()
      .then((res) => {
        console.log("resTheater", res.data.results.slice(0, 5));
        const shortListFilm = res.data.results.slice(0, 5);
        setListFilm(shortListFilm);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-20">
      <div className="container">
        <Tabs
          defaultActiveKey="1"
          tabPosition={"left"}
          //   style={{ height: 220 }}
          items={listFilm.map((item, index) => {
            return {
              // The label property defines the text displayed on the tab button
              label: (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="w-40 h-20 object-cover"
                  alt=""
                />
              ),
              // The key property uniquely identifies each tab for React rendering
              key: item.id,
              // The disabled property prevents interaction with the tab when set to true
              // disabled: i === 28,
              // The children property contains the content to be displayed inside the tab
              children: `huhu`,
            };
          })}
        />
      </div>
    </div>
  );
};

export default CinemaSchedule;
