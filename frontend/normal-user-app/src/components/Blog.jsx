import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Blog = ({ blog }) => {
  const { title, _id: id, imageText } = blog;
  const navigate = useNavigate();
  return (
    <>
      <Card style={{ width: '20rem' }} className="m-3">
        <Card.Img variant="top" src={`http://localhost:3000/${imageText}`} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {' '}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            nesciunt!{' '}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              navigate(`/blog/${id}`);
            }}
            className="btn btn-primary"
          >
            Detail
          </Button>
        </Card.Body>
      </Card>

      {/* <div>{title}</div>
      <Image src= fluid />
      <button
        onClick={() => {
          navigate(`/blog/${id}`);
        }}
        className="btn btn-primary"
      >
        Detail
      </button> */}
    </>
  );
};

export default Blog;
