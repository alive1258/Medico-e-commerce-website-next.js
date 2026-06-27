import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/home/Dashboard";
import { Role } from "../redux/features/auth/role.enum";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "../pages/SignUp/SignUp";
import VerifyOtp from "../pages/Otp/VerifyOtp";
import AllCategories from "../pages/Category/AllCategories";
import AddCategory from "../pages/Category/AddCategory";
import EditCategory from "../pages/Category/EditCategory";
import AllPricingCategories from "../pages/PricingCategory/AllPricingCategories";
import AddPricingCategory from "../pages/PricingCategory/AddPricingCategory";
import EditPricingCategory from "../pages/PricingCategory/EditPricingCategory";
import AllPricingFeature from "../pages/PricingFeature/AllPricingFeature";
import AddPricingFeature from "../pages/PricingFeature/AddPricingFeature";
import EditPricingFeature from "../pages/PricingFeature/EditPricingFeature";
import AllServices from "../pages/Services/AllServices";
import AddService from "../pages/Services/AddService";
import EditService from "../pages/Services/EditService";
import AllBusinessWeCover from "../pages/BusinessWeCover/AllBusinessWeCover";
import AddBusinessWeCover from "../pages/BusinessWeCover/AddBusinessWeCover";
import EditBusinessWeCover from "../pages/BusinessWeCover/EditBusinessWeCover";
import AllWhyChooseUs from "../pages/WhyChooseUs/AllWhyChooseUs";
import AddWhyChooseUs from "../pages/WhyChooseUs/AddWhyChooseUs";
import EditWhyChooseUs from "../pages/WhyChooseUs/EditWhyChooseUs";
import AllPricings from "../pages/Pricings/AllPricings";
import AddPricing from "../pages/Pricings/AddPricing";
import EditPricing from "../pages/Pricings/EditPricing";
import AllAssigenPricingFeatures from "../pages/AssigenPricingFeatures/AllAssigenPricingFeatures";
import AddAssigenPricingFeatures from "../pages/AssigenPricingFeatures/AddAssigenPricingFeatures";
import EditAssigenPricingFeatures from "../pages/AssigenPricingFeatures/EditAssigenPricingFeatures";
import AllUsers from "../pages/Users/AllUsers";
import AllSubscriptions from "../pages/Subscriptions/AllSubscriptions";
import AllServiceVideos from "../pages/ServiceVideos/AllServiceVideos";
import AddServiceVideo from "../pages/ServiceVideos/AddServiceVideo";
import EditServiceVideo from "../pages/ServiceVideos/EditServiceVideo";
import AllWhoWeAre from "../pages/WhoWeAre/AllWhoWeAre";
import AddWhoWeAre from "../pages/WhoWeAre/AddWhoWeAre";
import EditWhoWeAre from "../pages/WhoWeAre/EditWhoWeAre";
import AllWhoWeAreFeatures from "../pages/WhoWeAreFeatures/AllWhoWeAreFeatures";
import AddWhoWeAreFeatures from "../pages/WhoWeAreFeatures/AddWhoWeAreFeatures";
import EditWhoWeAreFeatures from "../pages/WhoWeAreFeatures/EditWhoWeAreFeatures";
import AllHeroSection from "../pages/home/HeroSection/AllHeroSection";
import AddHeroSection from "../pages/home/HeroSection/AddHeroSection";
import EditHeroSection from "../pages/home/HeroSection/EditHeroSection";
import AllVideoReviews from "../pages/ClientReviews/VideoReviews/AllVideoReviews";
import AddVideoReviews from "../pages/ClientReviews/VideoReviews/AddVideoReviews";
import EditVideoReviews from "../pages/ClientReviews/VideoReviews/EditVideoReviews";
import AllTextReviews from "../pages/ClientReviews/TextReviews/AllTextReviews";
import AddTextReviews from "../pages/ClientReviews/TextReviews/AddTextReviews";
import EditTextReviews from "../pages/ClientReviews/TextReviews/EditTextReviews";
import AllTeams from "../pages/Teams/AllTeams";
import AddTeams from "../pages/Teams/AddTeams";
import EditTeams from "../pages/Teams/EditTeams";
import AllPortfolioCategory from "../pages/Portfolio/PortfolioCategory/AllPortfolioCategory";
import AddPortfolioCategory from "../pages/Portfolio/PortfolioCategory/AddPortfolioCategory";
import EditPortfolioCategory from "../pages/Portfolio/PortfolioCategory/EditPortfolioCategory";
import AllPortfolio from "../pages/Portfolio/Portfolio/AllPortfolio";
import AddPortfolio from "../pages/Portfolio/Portfolio/AddPortfolio";
import EditPortfolio from "../pages/Portfolio/Portfolio/EditPortfolio";
import AllPortfolioDetails from "../pages/Portfolio/PortfolioDetails/AllPortfolioDetails";
import AddPortfolioDetails from "../pages/Portfolio/PortfolioDetails/AddPortfolioDetails";
import EditPortfolioDetails from "../pages/Portfolio/PortfolioDetails/EditPortfolioDetails";
import AllBlogCategories from "../pages/Blogs/BlogCategories/AllBlogCategories";
import AddBlogCategories from "../pages/Blogs/BlogCategories/AddBlogCategories";
import EditBlogCategories from "../pages/Blogs/BlogCategories/EditBlogCategories";
import AllBlog from "../pages/Blogs/Blog/AllBlog";
import AddBlog from "../pages/Blogs/Blog/AddBlog";
import EditBlog from "../pages/Blogs/Blog/EditBlog";
import AllBlogDetails from "../pages/Blogs/BlogDetails/AllBlogDetails";
import AddBlogDetails from "../pages/Blogs/BlogDetails/AddBlogDetails";
import EditBlogDetails from "../pages/Blogs/BlogDetails/EditBlogDetails";
import AllVideoGalleryCategory from "../pages/videoGallery/VideoGalleryCategory/AllVideoGalleryCategory";
import AddVideoGalleryCategory from "../pages/videoGallery/VideoGalleryCategory/AddVideoGalleryCategory";
import EditVideoGalleryCategory from "../pages/videoGallery/VideoGalleryCategory/EditVideoGalleryCategory";
import AllVideoGallery from "../pages/videoGallery/VideoGallery/AllVideoGallery";
import AddVideoGallery from "../pages/videoGallery/VideoGallery/AddVideoGallery";
import EditVideoGallery from "../pages/videoGallery/VideoGallery/EditVideoGallery";
import AllPhotoGalleryCategories from "../pages/PhotoGallery/PhotoGalleryCategories/AllPhotoGalleryCategories";
import AddPhotoGalleryCategories from "../pages/PhotoGallery/PhotoGalleryCategories/AddPhotoGalleryCategories";
import EditPhotoGalleryCategories from "../pages/PhotoGallery/PhotoGalleryCategories/EditPhotoGalleryCategories";
import AllPhotoGallaries from "../pages/PhotoGallery/PhotoGallaries/AllPhotoGallaries";
import AddPhotoGallaries from "../pages/PhotoGallery/PhotoGallaries/AddPhotoGallaries";
import EditPhotoGallaries from "../pages/PhotoGallery/PhotoGallaries/EditPhotoGallaries";
import AllPhotoGalleryAlbum from "../pages/PhotoGallery/PhotoGalleryAlbum/AllPhotoGalleryAlbum";
import AddPhotoGalleryAlbum from "../pages/PhotoGallery/PhotoGalleryAlbum/AddPhotoGalleryAlbum";
import EditPhotoGalleryAlbum from "../pages/PhotoGallery/PhotoGalleryAlbum/EditPhotoGalleryAlbum";
import AllClientMessages from "../pages/ClientMessages/AllClientMessages";
import ReplyClientMessage from "../pages/ClientMessages/ReplyClientMessage";

// Roles allowed to access the app
const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN];
export const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "categories",
        element: <AllCategories />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "services",
        element: <AllServices />,
      },
      {
        path: "add-service",
        element: <AddService />,
      },
      {
        path: "edit-service/:id",
        element: <EditService />,
      },
      {
        path: "pricing-categories",
        element: <AllPricingCategories />,
      },
      {
        path: "add-pricing-category",
        element: <AddPricingCategory />,
      },
      {
        path: "edit-pricing-category/:id",
        element: <EditPricingCategory />,
      },
      {
        path: "pricing-feature",
        element: <AllPricingFeature />,
      },
      {
        path: "add-pricing-feature",
        element: <AddPricingFeature />,
      },
      {
        path: "edit-pricing-feature/:id",
        element: <EditPricingFeature />,
      },
      {
        path: "business-we-cover",
        element: <AllBusinessWeCover />,
      },
      {
        path: "add-business-we-cover",
        element: <AddBusinessWeCover />,
      },
      {
        path: "edit-business-we-cover/:id",
        element: <EditBusinessWeCover />,
      },
      {
        path: "why-choose-us",
        element: <AllWhyChooseUs />,
      },
      {
        path: "add-why-choose-us",
        element: <AddWhyChooseUs />,
      },
      {
        path: "edit-why-choose-us/:id",
        element: <EditWhyChooseUs />,
      },
      {
        path: "pricings",
        element: <AllPricings />,
      },
      {
        path: "add-pricing",
        element: <AddPricing />,
      },
      {
        path: "edit-pricing/:id",
        element: <EditPricing />,
      },
      {
        path: "assigen-pricing-features",
        element: <AllAssigenPricingFeatures />,
      },
      {
        path: "add-assigen-pricing-feature",
        element: <AddAssigenPricingFeatures />,
      },
      {
        path: "edit-assigen-pricing-feature/:id",
        element: <EditAssigenPricingFeatures />,
      },
      {
        path: "service-videos",
        element: <AllServiceVideos />,
      },
      {
        path: "add-service-video",
        element: <AddServiceVideo />,
      },
      {
        path: "edit-service-video/:id",
        element: <EditServiceVideo />,
      },
      {
        path: "home-hero",
        element: <AllHeroSection />,
      },
      {
        path: "add-home-hero",
        element: <AddHeroSection />,
      },
      {
        path: "edit-home-hero/:id",
        element: <EditHeroSection />,
      },

      {
        path: "who-we-are",
        element: <AllWhoWeAre />,
      },
      {
        path: "add-who-we-are",
        element: <AddWhoWeAre />,
      },
      {
        path: "edit-who-we-are/:id",
        element: <EditWhoWeAre />,
      },
      {
        path: "who-we-are-features",
        element: <AllWhoWeAreFeatures />,
      },
      {
        path: "add-who-we-are-features",
        element: <AddWhoWeAreFeatures />,
      },
      {
        path: "edit-who-we-are-features/:id",
        element: <EditWhoWeAreFeatures />,
      },
      {
        path: "video-reviews",
        element: <AllVideoReviews />,
      },
      {
        path: "add-video-reviews",
        element: <AddVideoReviews />,
      },
      {
        path: "edit-video-reviews/:id",
        element: <EditVideoReviews />,
      },
      {
        path: "edit-who-we-are-features/:id",
        element: <EditWhoWeAreFeatures />,
      },
      {
        path: "text-reviews",
        element: <AllTextReviews />,
      },
      {
        path: "add-text-reviews",
        element: <AddTextReviews />,
      },
      {
        path: "edit-text-reviews/:id",
        element: <EditTextReviews />,
      },
      {
        path: "teams",
        element: <AllTeams />,
      },
      {
        path: "add-teams",
        element: <AddTeams />,
      },
      {
        path: "edit-teams/:id",
        element: <EditTeams />,
      },
      {
        path: "portfolio-category",
        element: <AllPortfolioCategory />,
      },
      {
        path: "add-portfolio-category",
        element: <AddPortfolioCategory />,
      },
      {
        path: "edit-portfolio-category/:id",
        element: <EditPortfolioCategory />,
      },
      {
        path: "portfolio",
        element: <AllPortfolio />,
      },
      {
        path: "add-portfolio",
        element: <AddPortfolio />,
      },
      {
        path: "edit-portfolio/:id",
        element: <EditPortfolio />,
      },

      {
        path: "portfolio-details",
        element: <AllPortfolioDetails />,
      },
      {
        path: "add-portfolio-details",
        element: <AddPortfolioDetails />,
      },
      {
        path: "edit-portfolio-details/:id",
        element: <EditPortfolioDetails />,
      },
      {
        path: "add-blog-categories",
        element: <AddBlogCategories />,
      },
      {
        path: "edit-blog-categories/:id",
        element: <EditBlogCategories />,
      },
      {
        path: "blog-details",
        element: <AllBlogDetails />,
      },

      {
        path: "blogs",
        element: <AllBlog />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "edit-blog/:id",
        element: <EditBlog />,
      },
      {
        path: "blog-categories",
        element: <AllBlogCategories />,
      },

      {
        path: "add-blog-details",
        element: <AddBlogDetails />,
      },
      {
        path: "edit-blog-details/:id",
        element: <EditBlogDetails />,
      },
      {
        path: "video-gallery-category",
        element: <AllVideoGalleryCategory />,
      },
      {
        path: "add-video-gallery-category",
        element: <AddVideoGalleryCategory />,
      },
      {
        path: "edit-video-gallery-category/:slug",
        element: <EditVideoGalleryCategory />,
      },
      {
        path: "video-gallery",
        element: <AllVideoGallery />,
      },
      {
        path: "add-video-gallery",
        element: <AddVideoGallery />,
      },
      {
        path: "edit-video-gallery/:id",
        element: <EditVideoGallery />,
      },
      {
        path: "photo-gallery-category",
        element: <AllPhotoGalleryCategories />,
      },
      {
        path: "add-photo-gallery-category",
        element: <AddPhotoGalleryCategories />,
      },
      {
        path: "edit-photo-gallery-category/:id",
        element: <EditPhotoGalleryCategories />,
      },
        {
        path: "photo-gallery",
        element: <AllPhotoGallaries />,
      },
      {
        path: "add-photo-gallery",
        element: <AddPhotoGallaries />,
      },
      {
        path: "edit-photo-gallery/:id",
        element: <EditPhotoGallaries />,
      },
          {
        path: "photo-gallery-album",
        element: <AllPhotoGalleryAlbum />,
      },
      {
        path: "add-photo-gallery-album",
        element: <AddPhotoGalleryAlbum/>,
      },
      {
        path: "edit-photo-gallery-album/:id",
        element: <EditPhotoGalleryAlbum />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "subscriptions",
        element: <AllSubscriptions />,
      },
      {
        path: "send-message",
        element: <AllClientMessages />,
      },
      {
        path: "send-message/reply/:id",
        element: <ReplyClientMessage />,
      },
    ],
  },
  // Login route is public
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "verify-otp",
    element: <VerifyOtp credential={null} />,
  },
  // Catch-all: redirect to login
  {
    path: "*",
    element: <Login />,
  },
]);
