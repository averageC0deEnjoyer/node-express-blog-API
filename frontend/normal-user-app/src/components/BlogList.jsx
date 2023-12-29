import Blog from './Blog';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
//this one is home page
const BlogList = ({ blogs }) => {
  return (
    <>
      <Container className="mt-3 mb-2 pb-2 pt-5 ps-5 pe-5">
        <Row>
          <Col md={7}>
            <Image
              src="http://localhost:3000/images/library.jpeg"
              fluid
              rounded
            />
          </Col>
          <Col md={5}>
            <h1 className="font-weight-light">Tagline</h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              nisi!
            </p>
          </Col>
        </Row>
        <Row>
          <Card className="text-center bg-secondary text-white my-5 py-3">
            <Card.Body>Here are your list of available book/blog</Card.Body>
          </Card>
        </Row>
        <Row>
          {blogs.map((blog) => (
            <Col
              key={blog._id}
              className="d-flex align-items-center justify-content-center "
            >
              <Blog key={blog._id} blog={blog} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default BlogList;
