import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@salesforce/design-system-react";

import {
  Container,
  Banner,
  CardsContainer,
  Card,
  CardTitle,
  CardAction,
  CardImage,
} from "./styles";
import { getCookie } from "../../utils/cookie";

const PlannerPage = () => (
  <Container>
    {/* <Banner src="images/APAC_Activity_Tracker_Headline_5334x1250.png" /> */}

    <div style={{ marginTop: "150px" }}>
      <CardsContainer>
        <Card>
          <Link className="hover-none" to="/create-planner">
            <CardTitle>Create a New Program</CardTitle>
            <img
              style={{ backgroundColor: "#f5f2f2" }}
              src="/images/APAC_Activity_Tracker_Tile_Create_Activity_notext_640x360.png"
              alt="Create activity"
            />
          </Link>
        </Card>
        <Card>
          <Link className="hover-none" to="/planner-view">
            <CardTitle>View All Programs</CardTitle>
            <img
              style={{ backgroundColor: "#f5f2f2" }}
              src="/images/APAC_Activity_Tracker_Tile_Edit_Activities_notext_640x360.png"
              alt="Activities"
            />
          </Link>
        </Card>

        {getCookie("role").replaceAll('"', "") === "admin" && (
          <React.Fragment>
            <Card>
              <Link className="hover-none" to="/create-activity">
                <CardTitle>Activities Calendar View</CardTitle>
                <img
                  style={{ backgroundColor: "#f5f2f2" }}
                  src="/images/APAC_Activity_Tracker_Tile_Create_Program_notext_640x360.png"
                  alt="Create program"
                />
              </Link>
            </Card>
          </React.Fragment>
        )}
      </CardsContainer>
    </div>
  </Container>
);

export default PlannerPage;
