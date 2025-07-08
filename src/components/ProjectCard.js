import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, videoUrl, link }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <div className="proj-imgbx">
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              width="100%"
              style={{ borderRadius: "8px" }}
            />
          ) : (
            <img src={imgUrl} alt={title} />
          )}
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </div>
      </a>
    </Col>
  );
};
