import "./Styles/Deslice.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../../Pages/ProductPage/Product";
import { productData, responsive } from "../../../Pages/Home/Data/Offers/data";

export default function Deslice() {
  const product = productData.map((item) => (
      <Product key={item}
      url={item.imageurl}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="Deslice">
      <Carousel showDots={true} responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}