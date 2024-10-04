"use client";

import { useRouter } from 'nextjs-toploader/app';
import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <>
      <Container fluid className="d-flex vh-100">
        <Row className="flex-grow-1 w-100">
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center users-column column-hover"
            onClick={() => handleNavigate('/users')}
          >
            <h1 className="text-center text-white">Users</h1>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center products-column column-hover"
            onClick={() => handleNavigate('/products')}
          >
            <h1 className="text-center text-white">Products</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}
