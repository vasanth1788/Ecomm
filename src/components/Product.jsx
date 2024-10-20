import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Tile = ({ id, title, thumbnail }) => {
  return (
    <div className="product-card" key={id}>
      <div>
        <img src={thumbnail} alt={title} width="190px" height="200px"></img>
      </div>
      <h6>
        {title}-{id}
      </h6>
    </div>
  );
};

const Product = ({ data, infiniteScroll, total, isInfiniteScroll }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= total) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      infiniteScroll();
    }, 500);
  };

  useEffect(() => {
    setItems(data);
  }, [data]);

  const getProduct = () => (
    <div className="products">
      {items?.map((product) => (
        <Tile {...product} key={product.id} />
      ))}
    </div>
  );

  return (
    <div>
      {isInfiniteScroll ? (
        <InfiniteScroll
          scrollThreshold={0.6}
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {getProduct()}
        </InfiniteScroll>
      ) : (
        getProduct()
      )}
    </div>
  );
};

export default Product;
