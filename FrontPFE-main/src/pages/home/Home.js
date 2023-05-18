import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import ImageSlider from "../../wrappers/image-slider/ImageSlider";
import BrandLogoSlider from "../../wrappers/brand-logo/BrandLogoSlider";
import Banner from "../../wrappers/banner/Banner";
import createRequest from "../../helpers/axiosRequest";
import { useToasts } from "react-toast-notifications";
import spinner from "../../assets/img/spinner.gif"
import GoldenAdsList from "../../components/GoldAdsList"
const HomeFashion = () => {
  const request = createRequest()
  const { addToast } = useToasts();
  const [slides, setSlides] = useState([])
  const [slidesFetching, setSlidesFetching] = useState(false);
  const [featuredCategoriesFetching, setFeaturedCategoriesFetching] = useState(false)
  const [featuredCategories, setFeaturedCategories] = useState([])
  const [featuredProductsFetching, setFeaturedProductsFetching] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [silverAdsFetching, setSilverAdsFetching] = useState(false)
  const [silverAds, setSilverAds] = useState([])
  const [goldenAdsFetching, setGoldenAdsFetching] = useState(false)
  const [goldenAds, setGoldenAds] = useState([])
  const [featuredBusinessesFetching, setFeaturedBusinessesFetching] = useState(false)
  const [featuresBusinesses, setFeaturesBusinesses] = useState([])
  const [feedbacksFetching, setFeedbacksFetching] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  useEffect(() => {
    const fetchSlides = async () => {
      setSlidesFetching(true)
      try {
        const res = await request.get('/slider');
        setSlides(res.data)

      } catch (error) {
        addToast('error while loading slides', {
          appearance: "error", autoDismiss: true
        })
      }
      finally {
        setSlidesFetching(false)
      }
    }
    const fetchFeaturedCategories = async () => {
      setFeaturedCategoriesFetching(true)
      try {
        const res = await request.get('/category/featured');
        setFeaturedCategories(res.data)

      } catch (error) {
        addToast('error while loading slides', {
          appearance: "error", autoDismiss: true
        })
      }
      finally {
        setFeaturedCategoriesFetching(false)
      }
    }
    const fetchFeaturedProducts = async () => {
      setFeaturedProductsFetching(true)
      try {
        const res = await request.get('/product/featured');
        setFeaturedProducts(res.data)

      } catch (error) {
        addToast('error while loading products', {
          appearance: "error", autoDismiss: true
        })
      }
      finally {
        setFeaturedProductsFetching(false)
      }
    }
    const fetchSilverAds = async () => {
      setSilverAdsFetching(true)
      try {
        const res = await request.get('/promotions/featuredsilver');
        setSilverAds(res.data)

      } catch (error) {
        addToast('error while fetching silver ads', {
          appearance: "error", autoDismiss: true
        })
      }
      finally {
        setSilverAdsFetching(false)
      }
    }
    const fetchGoldenAds = async () => {
      setGoldenAdsFetching(true)
      try {
        const res = await request.get('/promotions/featuredgold');
        setGoldenAds(res.data)

      } catch (error) {
        addToast('error while fetching golden ads', {
          appearance: "error", autoDismiss: true
        })
      }
      finally {
        setGoldenAdsFetching(false)
      }
    }
    const fetchFeaturedBusinesses = async () => {
      setFeaturedBusinessesFetching(true)
      try {
        const res = await request.get('/business/featuredlogos');
        setFeaturesBusinesses(res.data)

      } catch (error) {
        addToast('error while fetching featured business', {
          appearance: "error", autoDismiss: true
        })
      }
      finally {
        setFeaturedBusinessesFetching(false)
      }
    }
    const fetchFeedbacks = async () => {
      setFeaturedBusinessesFetching(true)
      try {
        const res = await request.get('/feedbacks');
        setFeaturesBusinesses(res.data)

      } catch (error) {
        console.log(error)
      }
      finally {
        setFeaturedBusinessesFetching(false)
      }
    }
    fetchSlides()
    fetchFeaturedCategories()
    fetchFeaturedProducts()
    fetchSilverAds()
    fetchGoldenAds()
    fetchFeaturedBusinesses()
  }, [])

  return (
    <Fragment>
      <MetaTags>
        <title>Test | Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        {slidesFetching ? <div className="spinner">
          <img src={spinner} alt="loading" />
        </div> :
          <HeroSlider slides={slides} />
        }
        {/* banner */}
        {featuredCategoriesFetching ? <div className="spinner">
          <img src={spinner} alt="loading" />
        </div> :
          <Banner featuredCategories={featuredCategories} />
        }
        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* featred gold */}
        {goldenAdsFetching ? <div className="spinner">
          <img src={spinner} alt="loading" />
        </div> :
          <GoldenAdsList items={goldenAds}></GoldenAdsList>
        }
        <br />
        {featuredProductsFetching ? <div className="spinner">
          <img src={spinner} alt="loading" />
        </div> :
          <TabProduct spaceBottomClass="pb-60" products={featuredProducts} />
        }


        {/* testimonial */}
        <TestimonialOne
          // items={feedbacks}
          spaceTopClass="pt-95"
          spaceMTopClass="mt-70"
          spaceBottomClass="pb-95"
          spaceMBottomClass="mb-70"
          spaceLeftClass="ml-70"
          spaceRightClass="mr-70"
          bgColorClass="bg-gray-3"
        />
        {/* featured  silver */}
        {silverAdsFetching ? <div className="spinner">
          <img src={spinner} alt="loading" />
        </div> :
          <ImageSlider slides={silverAds} />
        }
        <br />
        <br />

        <div class="section-title text-center "><h2>Our Partners</h2>
        </div>
        {/* brand logo slider */}
        {featuredBusinessesFetching ? <div className="spinner">
          <img src={spinner} alt="loading" />
        </div> :
          <BrandLogoSlider
            slides={featuresBusinesses}
            spaceBottomClass="pb-100"
            spaceTopClass="pt-100"
            noBorder={true}
          />}

      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
