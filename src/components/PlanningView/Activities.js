import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";

export default function Activities(props) {
  const [activites, setActivities] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let allActivites = {};
    props.activities.forEach((activity) => {
      if (allActivites[activity.formatId.label] === undefined) {
        allActivites[activity.formatId.label] = [activity];
      } else {
        allActivites[activity.formatId.label].push(activity);
      }
    });

    setActivities(allActivites);
  }, []);
  return (
    <div>
      <ul className="list-activities">
        {Object.keys(activites)
          .splice(0, props.all ? Object.keys(activites).length : 4)
          .map((item, k) => (
            <Fragment>
              <div
                style={{
                  marginBottom: "5px",
                  marginTop: "10px",
                }}
              >
                {k + 1}.{" "}
                <span
                  onClick={() => {
                    setOpen(open !== k ? k : false);
                  }}
                  style={{
                    backgroundColor: "#fcba03",
                    cursor: "pointer",
                    color: "white",
                    fontSize: "small",
                    padding: "5px",
                    fontWeight: "bold",
                    width: "auto",
                    borderRadius: "5px",
                  }}
                >
                  {item} - {activites[item].length}
                </span>
              </div>

              {open === k &&
                activites[item].map((format) => (
                  <li
                    className="small"
                    style={{ marginTop: "10px", lineHeight: "1.6" }}
                  >
                    {format.title} - {moment(format.date).format("MM/DD/YYYY")}
                  </li>
                ))}
            </Fragment>
          ))}

        {!props.all && Object.keys(activites).length > 4 ? (
          <div
            onClick={() => {
              props.toggleModal();
            }}
            className="text-decoration-underline"
          >
            ...more
          </div>
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
