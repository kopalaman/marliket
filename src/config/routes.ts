export const Routes = {
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
  },
  public: {
    home: "/",
    about: "/about",
    explore: "/explore",
    pricing: "/pricing",
    contact: "/contact",
    news: "/news",
    help: "/help",
    notFound: "/404",
    userID: (userID: string) => `/user/${userID}`,
    vehicleDetails: (slug: string) => `/vehicle/${slug}`,
    vehicles: "/vehicles",
    addListing: "/add-listing",
    dashboard: "/account",
    inbox: "/account/inbox",
    listings: "/account/listings",
    reservations: "/account/reservations",
    accountSettings: "/account/settings",
    trips: "/trips",
    wishlist: "/wishlist",
  },
  // private: {
  //   addListing: '/add-listing',
  //   dashboard: '/account',
  //   inbox: '/account/inbox',
  //   listings: '/account/listings',
  //   reservations: '/account/reservations',
  //   accountSettings: '/account/settings',
  //   trips: '/trips',
  //   wishlist: '/wishlist',
  // },
  home: "/",
  vendor: "/vendor",
  listItem: "/list",
  exploreVehicles: "/explore-vehicles",
  exploreParts: "/explore-parts",
  checkout: "/checkout",
  checkoutDigital: "/checkout/digital",
  checkoutGuest: "/checkout/guest",
  profile: "/profile",
  verifyEmail: "/verify-email",
  changePassword: "/change-password",
  orders: "/orders",
  order: (tracking_number: string) =>
    `/orders/${encodeURIComponent(tracking_number)}`,
  refunds: "/refunds",
  help: "/help",
  logout: "/logout",
  coupons: "/offers",
  orderReceived: "/order-received",
  products: "/products",
  product: (slug: string) => {
    // if (asPath) {
    //   return `/products/${encodeURIComponent(slug)}?type=${asPath}`;
    // }
    return `/products/${encodeURIComponent(slug)}`
  },
  privacy: "/privacy",
  terms: "/terms",
  refundPolicies: "/refund-policies",
  customerRefundPolicies: "/customer-refund-policies",
  vendorRefundPolicies: "/vendor-refund-policies",
  contactUs: "/contact",
  shops: "/shops",
  cards: "/cards",
  shop: (slug: string) => `/shops/${encodeURIComponent(slug)}`,
  downloads: "/downloads",
  authors: "/authors",
  author: (slug: string) => `/authors/${encodeURIComponent(slug)}`,
  manufacturers: "/manufacturers",
  manufacturer: (slug: string) => `/manufacturers/${encodeURIComponent(slug)}`,
  nearByShop: ({ lat, lng }: { lat: string; lng: string }) =>
    `/shops/search?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(
      lng
    )}`,
  search: "/search",
  wishlists: "/wishlists",
  questions: "/questions",
  reports: "/reports",
  flashSaleSingle: (slug: string) => `/flash-sales/${encodeURIComponent(slug)}`,
  flashSale: "/flash-sales",
  notifyLogs: "/notification",
  notifyLogsSingle: (id: string) => `/notification/${encodeURIComponent(id)}`,
  becomeSeller: "/seller-registration",
  sell: "/sell",
}