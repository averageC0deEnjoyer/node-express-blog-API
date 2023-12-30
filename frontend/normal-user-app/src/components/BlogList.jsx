import Blog from './Blog';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
//this one is home page
const BlogList = ({ blogs }) => {
  return (
    <>
      <Row>
        <Col md={7}>
          <Image
            src="http://localhost:3000/images/library.jpeg"
            fluid
            rounded
          />
        </Col>
        <Col md={5}>
          <h1 className="font-weight-light text-center mt-3">
            Welcome To Collection of Blog
          </h1>
          <p className="mt-4 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            quaerat quae nostrum dolore quam odit veritatis qui deleniti id
            voluptatum aut nobis dolor, eius atque modi esse architecto? Vitae,
            doloremque.
          </p>
        </Col>
      </Row>
      <Row>
        <Card className="text-center bg-secondary text-white my-md-5 py-md-3">
          <Card.Body>Here are your list of available blog</Card.Body>
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
    </>
  );
};

export default BlogList;
