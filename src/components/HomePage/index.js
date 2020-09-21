import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@salesforce/design-system-react';

import {
  Container,
  Banner,
  CardsContainer,
  Card,
  CardTitle,
  CardBody,
  CardAction,
  CardImage
} from './styles';

const HomePage = () => (
  <Container>
    <Banner src="images/background.png" />
    <CardsContainer>
      <Card>
        <CardImage src="assets/images/placeholder-img-horizontal.jpg" alt="placeholder" />
        <CardTitle>Create Activity</CardTitle>
        <CardBody>
          a brief description
        </CardBody>
        <CardAction>
          <Link to="/create-activity">
            <Button variant="brand" label="Create new activity" />
          </Link>
        </CardAction>
      </Card>
      <Card>
        <CardImage src="assets/images/placeholder-img-horizontal.jpg" alt="placeholder" />
        <CardTitle>Edit Activities / My Activities</CardTitle>
        <CardBody>
          a brief description
        </CardBody>
        <CardAction>
          <Link to="/my-activities">
            <Button variant="brand" label="Go to My Activities" />
          </Link>
        </CardAction>
      </Card>
      <Card>
        <CardImage src="assets/images/placeholder-img-horizontal.jpg" alt="placeholder" />
        <CardTitle>Programs View</CardTitle>
        <CardBody>
          a brief description
        </CardBody>
        <CardAction>
          <Link to="/programs-view">
            <Button variant="brand" label="Go to Programs View" />
          </Link>
        </CardAction>
      </Card>
      <Card>
        <CardImage src="assets/images/placeholder-img-horizontal.jpg" alt="placeholder" />
        <CardTitle>Create Program</CardTitle>
        <CardBody>
          a brief description <br />
          (Only displayed for Admin and Superuser)
        </CardBody>
        <CardAction>
          <Link to="/create-program">
            <Button variant="brand" label="Create new program" />
          </Link>
        </CardAction>
      </Card>
    </CardsContainer>
  </Container>
);

export default HomePage;