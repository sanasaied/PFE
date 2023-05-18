import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Paginator from 'react-hooks-paginator';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import { SET_SELECTED_CATEGORY } from "../../redux/actions/category";
import { fetchProducts } from "../../redux/actions/productActions";
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopProducts from '../../wrappers/product/ShopProducts';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';

const ShopGridStandard = ({ location }) => {
    const dispatch = useDispatch()
    const {
        addToast,
    } = useToasts();
    const products = useSelector((state) => state.productData.products)
    const selectedCategoryState = useSelector((state) => state.category.selectedCategory)

    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState(selectedCategoryState ? 'categories' : '');
    const [sortValue, setSortValue] = useState(selectedCategoryState ? { _id: selectedCategoryState } : '');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    let { category: selectedCategory, id: categoryId } = useParams();
    const history = useHistory()
    useEffect(() => {
        fetchProducts(dispatch, addToast)
    }, [categoryId, selectedCategory])

    const pageLimit = 15;
    const { pathname } = location;
    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    const getProductsByCategory = (products) => {
        return products.filter(product => {
            return !!product.subCategories.find(cat => cat.category === categoryId)
        })
    }
    useEffect(() => {
        let sortedProducts = selectedCategory ?
            getSortedProducts(getProductsByCategory(products), sortType, sortValue, history)
            : getSortedProducts(products, sortType, sortValue, history);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [categoryId, history, selectedCategory, offset, products, sortType, sortValue, filterSortType, filterSortValue, location.pathname]);
    useEffect(() => {
        if (categoryId) {
            dispatch({
                type: SET_SELECTED_CATEGORY,
                payload: categoryId
            });
            setSortValue({ _id: categoryId })
        } else {
            setSortValue(null)
        }
    }, [categoryId, location.pathname])

    return (
        <Fragment>
            <MetaTags>
                <title>Test | Shop Page</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                {/**      */}
                                <ShopSidebar products={products} getSortParams={getSortParams} selectedCategory={selectedCategory} sideSpaceClass="mr-30" />

                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                {/**    */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

ShopGridStandard.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = state => {
    return {
        products: state.productData.products
    }
}

export default connect(mapStateToProps)(ShopGridStandard);