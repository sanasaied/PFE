import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import createRequest from "../../helpers/axiosRequest";
import spinner from "../../assets/img/spinner.gif"
import { useSelector } from "react-redux";

const Product = ({ location, product }) => {

  // fetch product by id
  let { id } = useParams();
  const { pathname } = location;
  const [prod, setProd] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const allProducts = useSelector((state) => state.productData.products)


  useEffect(() => {
    const fetchProductById = async () => {
      setProductLoading(true);
      try {
        const request = createRequest();
        const response = await request.get(`/product/details/${id}`)
        setProd(response.data)
      } catch (error) {
        console.log(error)
      }
      finally {
        setProductLoading(false)
      }
    }
    fetchProductById()
  }, [id]);

  return (
    <Fragment>
      <MetaTags>
        <title>Test | Product Page</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {
          productLoading ? <div className="spinner"><img src={spinner} alt="loading" /></div> :
            prod ?
              <Fragment>
                <Breadcrumb />

                {/* product description with image */}
                <ProductImageDescription
                  spaceTopClass="pt-100"
                  spaceBottomClass="pb-100"
                  product={prod}
                />

                {/* product description tab */}
                <ProductDescriptionTab
                  spaceBottomClass="pb-90"
                  productFullDesc={prod.description}
                />

                {/* related product slider */}
                <RelatedProductSlider
                  spaceBottomClass="pb-95"
                  products={allProducts.filter(product => {
                    const categoriesIds = prod.subCategories.map((subCategory) => subCategory.category);
                    const subCategories = product.subCategories.find(cat => cat.category === categoriesIds[0])

                    return (
                      subCategories && product._id !== id
                    )
                  })}
                // products={allProducts.filter(product => {
                //   return (
                //     product.categories?.some(category =>
                //       prod.categories?.includes(category)
                //     )
                //   )
                // })}
                />
              </Fragment> : <p>Product not found !</p>
        }
      </LayoutOne>
    </Fragment>
  )
};

Product.propTypes = {
  location: PropTypes.object
};

// const mapStateToProps = (state, ownProps) => {
//   const productId = ownProps.match.params.id;
//   return {
//     product: state.productData.products.filter(
//       (single) => single._id === productId
//     )[0],
//     productId: productId,
//   };
// };

export default Product;
