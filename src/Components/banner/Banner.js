import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../assets/bannerImages/two.jpg'
import slide2 from '../assets/bannerImages/three.jpg'
import slide3 from '../assets/bannerImages/four.jpg'
import slide4 from '../assets/bannerImages/five.png'
import slide5 from '../assets/bannerImages/six.jpg'

const Banner = () => {
    return (
        <Carousel variant="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide1}
                    alt="First Slide"
                />
{/*                 <Carousel.Caption>
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second Slide"
                />
{/*                 <Carousel.Caption>
                    <h5>Second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide3}
                    alt="Slide Three"
                />
{/*                 <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide4}
                    alt="Slide Four"
                />
{/*                 <Carousel.Caption>
                    <h5>Four slide label</h5>
                    <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide5}
                    alt="Slide Five"
                />
{/*                 <Carousel.Caption>
                    <h5>Fifth slide label</h5>
                    <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    )
}

export default Banner