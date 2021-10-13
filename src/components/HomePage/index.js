import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@salesforce/design-system-react';

import {
  Container,
  Banner,
  CardsContainer,
  Card,
  CardTitle,
  CardAction,
  CardImage
} from './styles';
import { getCookie } from '../../utils/cookie';

const HomePage = () => (
  <Container>
    <Banner src="images/APAC_Activity_Tracker_Headline_5334x1250.png" />
    <CardsContainer>
      <Card>
        <CardImage src="/images/APAC_Activity_Tracker_Tile_Create_Activity_notext_640x360.png" alt="Create activity" />
        <CardTitle>Create Activity</CardTitle>
        <CardAction>
          <Link to="/create-activity">
            <Button variant="brand" label="Create new activity" />
          </Link>
        </CardAction>
      </Card>
      <Card>
        <CardImage src="/images/APAC_Activity_Tracker_Tile_Edit_Activities_notext_640x360.png" alt="Activities" />
        <CardTitle>View/Edit Activities</CardTitle>
        <CardAction>
          <Link to="/my-activities">
            <Button variant="brand" label="Activities" />
          </Link>
        </CardAction>
      </Card>
      {/* {
        getCookie('role').replaceAll('"','') === 'admin' && (
          <React.Fragment>
            <Card>
              <CardImage src="/images/APAC_Activity_Tracker_Tile_Create_Program_notext_640x360.png" alt="Create program" />
              <CardTitle>Create Program</CardTitle>
              <CardAction>
                <Link to="/create-program">
                  <Button variant="brand" label="Create new program" />
                </Link>
              </CardAction>
            </Card>
            <Card>
              <CardImage src="/images/APAC_Activity_Tracker_Tile_Program_View_notext_640x360.png" alt="Programs" />
              <CardTitle>View/Edit Programs</CardTitle>
              <CardAction>
                <Link to="/programs-view">
                  <Button variant="brand" label="Programs" />
                </Link>
              </CardAction>
            </Card>
            <Card>
              <CardImage src="/images/APAC_Activity_Tracker_Tile_Create_Program_notext_640x360.png" alt="Create program" />
              <CardTitle>Create Planner</CardTitle>
              <CardAction>
                <Link to="/create-planner">
                  <Button variant="brand" label="Create new planner" />
                </Link>
              </CardAction>
            </Card>
            <Card>
              <CardImage src="/images/APAC_Activity_Tracker_Tile_Program_View_notext_640x360.png" alt="Programs" />
              <CardTitle>View/Edit Planner</CardTitle>
              <CardAction>
                <Link to="/planner-view">
                  <Button variant="brand" label="Plans" />
                </Link>
              </CardAction>
            </Card>
          </React.Fragment>
        )
      } */}
      {
        getCookie('role').replaceAll('"','') === 'admin' && (
          <React.Fragment>
            <Card>
              <CardImage src="/images/APAC_Activity_Tracker_Tile_Create_Program_notext_640x360.png" alt="Create program" />
              <CardTitle>Planner</CardTitle>
              <CardAction>
                <Link to="/planner-view">
                  <Button variant="brand" label="View All" />
                </Link>
              </CardAction>
            </Card>
          </React.Fragment>
        )
      }
    </CardsContainer>
  </Container>
);

export default HomePage;
