import {
  Box,
  DoorOpen,
  SquaresExclude,
  Waypoints,
  Blend,
  LayoutDashboardIcon,
  WifiPen,
  CreditCardIcon,
  WaypointsIcon,
} from "lucide-react";

export const navigationItems = [
  { name: "Dashboard",  icon: LayoutDashboardIcon, href: "/" },
  {
    name: "Service",
    icon: Box,
    children: [
      { name: "All Categories", href: "/categories" },
      { name: "All Pricing Categories", href: "/pricing-categories" },
      { name: "All Pricing Feature", href: "/pricing-feature" },
      { name: "All Services", href: "/services" },
      { name: "Business We Cover", href: "/business-we-cover" },
      { name: "Why Choose Us", href: "/why-choose-us" },
      { name: "All Pricings", href: "/pricings" },
      { name: "All Service Videos", href: "/service-videos" },
      // { name: "Retail Sale", href: "/retail-sale" },
      { name: "Assigen Pricing Features", href: "/assigen-pricing-features" },
    ],
  },
  {
    name: "WhoWeAre",
    icon: Blend,
    children: [
      { name: "Who We Are", href: "/who-we-are" },
      { name: "Who We Are Feature", href: "/who-we-are-features" },
    
    ],
  },
  {
    name: "Users",
    icon: Box,
    children: [
      { name: "All users", href: "/users" },
      { name: "All Subscriptions", href: "/subscriptions" },
    
    ],
  },
  {
    name: "Client Reviews",
    icon: Waypoints,
    children: [
      { name: "Video Reviews", href: "/video-reviews" },
      { name: "Text Reviews", href: "/text-reviews" },
    
    ],
  },
  {
    name: "Portfolio",
    icon: Waypoints,
    children: [
      { name: "Portfolio Category", href: "/portfolio-category" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Portfolio Details", href: "/portfolio-details" },
    
    ],
  },
  {
    name: "Blogs",
    icon: WifiPen,
    children: [
      { name: "Blog Category", href: "/blog-categories" },
      { name: "Blogs", href: "/blogs" },
      { name: "Blog Details", href: "/blog-details" },
    
    ],
  },
  {
    name: "Video Gallery ",
    icon: CreditCardIcon,
    children: [
      { name: "Video Gallery Category", href: "/video-gallery-category" },
    { name: "Video Gallery", href: "/video-gallery" },
    
    ],
  },
  {
    name: "Photo Gallery",
    icon: WaypointsIcon,
    children: [
      { name: "Photo Gallery Category", href: "/photo-gallery-category" },
      { name: "Photo Gallery", href: "/photo-gallery" },
      { name: "Photo Gallery Album", href: "/photo-gallery-album" },
    ],
  },
  { name: "Home Hero", icon: DoorOpen, href: "/home-hero" },
  { name: "Teams", icon: SquaresExclude, href: "/teams" },
  { name: "Client Messages", icon: Waypoints, href: "/send-message" },
  // { name: "TikTok eAPIG", icon: Blend, href: "/tiktok" },
  // { name: "Snap CAPING", icon: WifiPen, href: "/snap" },
  // { name: "Billing", icon: CreditCardIcon, href: "/billing" },
];
