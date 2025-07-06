import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import headerImg from "../assets/img/header-img.svg"; ← removed
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';


export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(1);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = [ "Web Developer", "App developer", "AI/ML Integrator" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [delta, tick]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hello there , I'm Muhammad Umer Nasir,`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "App Development", "AI/ML Development" ]'><span className="wrap">{text}</span></span></h1>
                <p>
                  <span style={{ color: "white" }}>
                    Aspiring Full Stack Developer and Cloud Technician with a strong foundation in computer science and a passion for cloud computing. Currently a Final Year at FAST NUCES University, I am eager to leverage my academic background and practical experience to contribute to innovative cloud solutions.
                  </span>
                </p>
                <button onClick={() => console.log('connect')}>
                  Let’s Connect <ArrowRightCircle size={25} />
                </button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src="/header-img.svg" alt="Header" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
