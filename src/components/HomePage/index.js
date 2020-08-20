import React from 'react';
import { Link } from 'react-router-dom';
import { BrandBand, Button } from '@salesforce/design-system-react';

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
    <Banner>
      <BrandBand image="default" theme="lightning-blue" />
    </Banner>
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
        <CardTitle>Create Program</CardTitle>
        <CardBody>
          a brief description <br />
          (Only displayed for Admin and Superuser)
        </CardBody>
        <CardAction>
          <Link>
            <Button variant="brand" label="Create new program" />
          </Link>
        </CardAction>
      </Card>
      <Card>
        <CardImage src="assets/images/placeholder-img-horizontal.jpg" alt="placeholder" />
        <CardTitle>Edit</CardTitle>
        <CardBody>
          a brief description
        </CardBody>
        <CardAction>
          <Link to="/edit-program">
            <Button variant="brand" label="Go to Edit" />
          </Link>
        </CardAction>
      </Card>
      <Card>
        <CardImage src="assets/images/placeholder-img-horizontal.jpg" alt="placeholder" />
        <CardTitle>My View</CardTitle>
        <CardBody>
          a brief description
        </CardBody>
        <CardAction>
          <Link to="/my-view">
            <Button variant="brand" label="Go to My View" />
          </Link>
        </CardAction>
      </Card>
    </CardsContainer>
  </Container>
);

export default HomePage;