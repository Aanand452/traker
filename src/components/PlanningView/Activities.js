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
        {console.log(Object.keys(activites).length)}
        {Object.keys(activites)
          .splice(0, props.all ? Object.keys(activites).length : 4)
          .map((item, k) => (
            <Fragment>
              <div
                style={{
                  marginBottom: "5px",
                  marginTop: "5px",
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
                  <li className="small">
                    {format.title} - {format.date}
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
