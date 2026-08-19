import { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class SlideShow extends Component {
  render() {
    return (
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <img src="https://www.topcv.vn/v4/image/mb-life/banner-v3.png" alt="slide1" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KmPp7teMwWtVvkHoCRPvuWPm5sTgHzNuHvm89LUmXkyszzPkECc0vj7v&s=10" alt="slide2" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/02/anh-phong-canh-66-1.jpg" alt="slide3" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    );
  }
}

export default SlideShow;