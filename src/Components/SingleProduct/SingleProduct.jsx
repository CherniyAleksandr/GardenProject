import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../slices/apiSlice";
import { Button } from "../Button/Button";
import Counter from "./CounterForProduct";
import { SingleProductItem } from "./SingleProductItems";
import style from "./singleProduct.module.css";

export const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const [space, setSpace] = useState(false);

  const switcherText = (event) => {
    event.preventDefault();
    setSpace((prevSpace) => !prevSpace);
  };

  if (error) {
    return <p>Error featching date: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SingleProductItem />
      <section className={style.mainDivSingleProduct}>
        <section className={style.divSingleProduct}>
          {data.map((product) => (
            <div
              key={product.id}
              className={style.saleBlock}
              to={`/single-product/${product.id}`}
            >
              <div className={style.productItemImage}>
                <img
                  className={style.imgProduct}
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
              </div>

              <div className={style.divWithPriceCounterDescription}>
                <h2 className={style.h2TitleText}>{product.title}</h2>
                <div className={style.divPrices}>
                  <p className={style.discontPrice}>${product.price}</p>

                  {product.discont_price ? (
                    <p className={style.initialPrice}>
                      ${product.discont_price}
                    </p>
                  ) : null}

                  {product.price &&
                    product.discont_price &&
                    product.price !== product.discont_price && (
                      <div className={style.percentagePrice}>
                        {`-${Math.round(
                          ((product.price - product.discont_price) /
                            product.price) *
                            100
                        )}%`}
                      </div>
                    )}
                </div>

                <div className={style.counterUndButton}>
                  <div className={style.counter}>
                    <Counter />
                  </div>
                  <div className={style.divButton}>
                    <Link to="/cart">
                      <Button
                        className={style.addGreenButton}
                        buttonClass="addGreenButton"
                        text="Add to cart"
                      />
                    </Link>
                  </div>
                </div>

                <div className={style.productDescription}>
                  <h6 className={style.h6Description}>Description</h6>
                  <p
                    className={
                      style.productTextDescriptionMain +
                      (space ? "" : "" + style.clamp)
                    }
                  >
                    {product.description}
                  </p>

                  <button
                    onClick={switcherText}
                    className={style.productTextDescriptionReadMore}
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};
