
export interface LINK {
  href: string;
  title?: string;
  label?: string;
  inactive?: boolean;
}

interface MegaMenuSection {
  title: string;
  links: LINK[];
}

interface Page {
  title: string;
  href?: string;
  iconClass?: string;
  links?: LINK[];
};


export const megaMenuData: MegaMenuSection[] = [
  {
    title: "Inventory List",
    links: [
      { href: "/inventory-list-01", label: "Inventory List v1" },
      { href: "/inventory-list-02", label: "Inventory List v2" },
      { href: "/inventory-map-cards", label: "Map - Cards" },
      { href: "/inventory-map-rows", label: "Map - Rows" },
      { href: "/inventory-sidebar-rows", label: "Sidebar - Rows" },
      { href: "/inventory-sidebar-cards", label: "Sidebar - Cards" },
    ],
  },
  {
    title: "Inventory Single",
    links: [
      { href: "/inventory-page-single-v1/1", label: "Inventory Single v1" },
      { href: "/inventory-page-single-v2", label: "Inventory Single v2" },
      { href: "/inventory-page-single-v3", label: "Inventory Single v3" },
      { href: "/inventory-page-single-v4", label: "Inventory Single v4" },
      { href: "/inventory-page-single-v5", label: "Inventory Single v5" },
    ],
  },
  {
    title: "Popular Makes",
    links: [
      { href: "/inventory-page-single-v1/1", label: "Audi", inactive: true },
      { href: "/inventory-page-single-v1/1", label: "BMW", inactive: true },
      { href: "/inventory-page-single-v1/1", label: "Ford", inactive: true },
      { href: "/inventory-page-single-v1/1", label: "Honda", inactive: true },
      {
        href: "/inventory-page-single-v1/1",
        label: "Land Rover",
        inactive: true,
      },
      {
        href: "/inventory-page-single-v1/1",
        label: "Mercedes-Benz",
        inactive: true,
      },
    ],
  },
  {
    title: "Type",
    links: [
      { href: "/inventory-page-single-v1/1", label: "Sedan", inactive: true },
      { href: "/inventory-page-single-v1/1", label: "SUVs", inactive: true },
      {
        href: "/inventory-page-single-v1/1",
        label: "Sport Coupe",
        inactive: true,
      },
      {
        href: "/inventory-page-single-v1/1",
        label: "Convertible",
        inactive: true,
      },
      { href: "/inventory-page-single-v1/1", label: "Wagon", inactive: true },
    ],
  },
];

export const pages: Page[] = [
  {
    title: "Dashboard",
    iconClass: "fa fa-angle-right",
    links: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "My Listings", href: "/my-listings" },
      { title: "Add Listings", href: "/add-listings" },
      { title: "Favorites", href: "/favorite" },
      { title: "Saved Search", href: "/saved" },
      { title: "Messages", href: "/messages" },
      { title: "Profile", href: "/profile" },
    ],
  },
  { title: "About", href: "/about" },
  { title: "Services", href: "/contact" },
  { title: "Login", href: "/login" },
  { title: "FAQs", href: "/faq" },
  { title: "Pricing", href: "/pricing" },
  { title: "Terms", href: "/terms" },
  { title: "Team List", href: "/team-list" },
  { title: "Team Single", href: "/team-single/1" },
  { title: "Dealer List", href: "/dealer" },
  { title: "Dealer Single", href: "/dealer-single/1" },
  { title: "Loan Calculator", href: "/loan-calculator" },
  { title: "Compare", href: "/compare" },
  { title: "404", href: "/404" },
  { title: "Invoice", href: "/invoice" },
  { title: "UI Elements", href: "/ui-elements" },
];