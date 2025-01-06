import { relations } from "drizzle-orm"
import {
  boolean,
  decimal,
  index,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

// Enums
export const UserRole = {
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  USER: "USER",
} as const

export const BusinessType = {
  DEALER: "DEALER",
  PARTS_SUPPLIER: "PARTS_SUPPLIER",
  MECHANICAL_CENTER: "MECHANICAL_CENTER",
  INSURANCE_PROVIDER: "INSURANCE_PROVIDER",
  RENTAL_AGENCY: "RENTAL_AGENCY",
  OTHER: "OTHER",
} as const

// Users table
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(), // Appwrite user ID
    avatar: text("avatar_url"),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    phone: text("phone").unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    phoneVerified: boolean("phone_verified").default(false).notNull(),
    role: text("role").notNull().default("USER").$type<keyof typeof UserRole>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("users_email_idx").on(table.email),
    index("users_phone_idx").on(table.phone),
  ]
)

// Users relations
export const usersRelations = relations(users, ({ one, many }) => ({
  personal: one(personalProfiles, {
    fields: [users.id],
    references: [personalProfiles.userId],
  }),
  business: one(businessProfiles, {
    fields: [users.id],
    references: [businessProfiles.userId],
  }),
  listings: many(listings),
}))

// Personal Profiles table
export const personalProfiles = pgTable("personal_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  storeName: text("store_name").notNull(),
  associationName: text("association_name"),
  identificationToken: text("identification_token"),
  gender: text("gender"),
  tpin: text("tpin").notNull(),
  nrc: text("nrc").notNull(),
  bio: text("bio"),
  whatsappPhone: text("whatapp_phone"),
  preferences: json("preferences"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Personal Profiles relations
export const personalProfilesRelations = relations(
  personalProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [personalProfiles.userId],
      references: [users.id],
    }),
    address: one(addresses, {
      fields: [personalProfiles.userId],
      references: [addresses.personalId],
    }),
  })
)

// Business Profiles table
export const businessProfiles = pgTable(
  "business_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    businessName: text("business_name").notNull(),
    businessType: text("business_type")
      .notNull()
      .$type<keyof typeof BusinessType>(),
    registrationNumber: text("registration_number"),
    taxId: text("tax_id"),
    website: text("website"),
    logo: text("logo_url"),
    isVerified: boolean("is_verified").default(false).notNull(),
    verifiedAt: timestamp("verified_at"),
    verificationNote: text("verification_note"),
    operatingHours: json("operating_hours"),
    serviceAreas: json("service_areas"),
    serviceCategories: json("service_categories"),
    businessEmail: text("business_email"),
    businessPhone: text("business_phone"),
    supportEmail: text("support_email"),
    whatsappPhone: text("whatapp_phone"),
    socialLinks: json("social_links"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("business_profiles_name_idx").on(table.businessName),
    index("business_profiles_type_idx").on(table.businessType),
    index("business_profiles_verified_idx").on(table.isVerified),
  ]
)

// Business Profiles relations
export const businessProfilesRelations = relations(
  businessProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [businessProfiles.userId],
      references: [users.id],
    }),
    address: one(addresses, {
      fields: [businessProfiles.userId],
      references: [addresses.businessId],
    }),
  })
)

// Addresses table
export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    street: text("street").notNull(),
    city: text("city").notNull(),
    province: text("state").notNull(),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    latitude: decimal("latitude"),
    longitude: decimal("longitude"),
    isPrimary: boolean("is_primary").default(true).notNull(),
    personalId: text("personal_profile_id").unique(),
    businessId: text("business_profile_id").unique(),
  },
  (table) => [
    index("location_idx").on(table.city, table.province, table.country),
  ]
)

// Addresses relations
export const addressesRelations = relations(addresses, ({ one }) => ({
  personal: one(personalProfiles, {
    fields: [addresses.personalId],
    references: [personalProfiles.userId],
  }),
  business: one(businessProfiles, {
    fields: [addresses.businessId],
    references: [businessProfiles.userId],
  }),
}))

// Categories table
export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    type: text("type").notNull(),
    description: text("description"),
    level: integer("level").default(0).notNull(),
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    parentId: serial("parent_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("categories_type_idx").on(table.type),
    index("categories_slug_idx").on(table.slug),
    index("categories_parent_id_idx").on(table.parentId),
    index("categories_level_idx").on(table.level),
  ]
)

// Categories relations
export const categoriesRelations = relations(categories, ({ many, one }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  listings: many(listings, {
    relationName: "categories_listings_relation",
  }),
  variantOptions: many(variantOptions, {
    relationName: "categories_variant_options_relation",
  }),
}))

// Variant Options table
export const variantOptions = pgTable(
  "variant_options",
  {
    iid: uuid("id").primaryKey().defaultRandom(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: text("type").notNull(),
    required: boolean("required").default(false).notNull(),
    options: json("options").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("variant_options_category_name_unique_idx").on(
      table.categoryId,
      table.name
    ),
    index("variant_options_category_id_idx").on(table.categoryId),
  ]
)

// Variant Options relations
export const variantOptionsRelations = relations(variantOptions, ({ one }) => ({
  category: one(categories, {
    fields: [variantOptions.categoryId],
    references: [categories.id],
  }),
}))

// Listings table
export const listings = pgTable(
  "listings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: serial("category_id")
      .notNull()
      .references(() => categories.id),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    condition: text("condition").notNull(),
    status: text("status").default("draft").notNull(),
    location: text("location"),
    latitude: decimal("latitude", { precision: 10, scale: 8 }),
    longitude: decimal("longitude", { precision: 11, scale: 8 }),
    featuredImageId: text("featured_image_id"),
    views: integer("views").default(0).notNull(),
    favorites: integer("favorites").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("listings_user_id_idx").on(table.userId),
    index("listings_category_id_idx").on(table.categoryId),
    index("listings_status_idx").on(table.status),
    index("listings_location_idx").on(table.latitude, table.longitude),
    index("listings_slug_idx").on(table.slug),
  ]
)

// Listings relations
export const listingsRelations = relations(listings, ({ one, many }) => ({
  user: one(users, {
    fields: [listings.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [listings.categoryId],
    references: [categories.id],
    relationName: "listings_category_relation",
  }),
  images: many(listingImages),
  vehicleDetails: one(vehicleDetails, {
    fields: [listings.id],
    references: [vehicleDetails.listingId],
  }),
  partDetails: one(partDetails, {
    fields: [listings.id],
    references: [partDetails.listingId],
  }),
  variants: many(variants),
}))

// Variants table
export const variants = pgTable(
  "variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    sku: text("sku").notNull().unique(),
    basePrice: decimal("base_price", { precision: 12, scale: 2 }).notNull(),
    salePrice: decimal("sale_price", { precision: 12, scale: 2 }),
    msrp: decimal("msrp", { precision: 12, scale: 2 }),
    quantity: integer("quantity").default(0).notNull(),
    attributes: json("attributes").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("variants_sku_idx").on(table.sku),
    index("variants_listing_id_idx").on(table.listingId),
  ]
)

// Variants relations
export const variantsRelations = relations(variants, ({ one }) => ({
  listing: one(listings, {
    fields: [variants.listingId],
    references: [listings.id],
  }),
}))

// Listing Images table
export const listingImages = pgTable(
  "listing_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    imageId: text("image_id").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("listing_images_image_id_idx").on(table.imageId),
    index("listing_images_sort_order_idx").on(table.sortOrder),
    index("listing_images_listing_id_idx").on(table.listingId),
  ]
)

// Listing Images relations
export const listingImagesRelations = relations(listingImages, ({ one }) => ({
  listing: one(listings, {
    fields: [listingImages.listingId],
    references: [listings.id],
  }),
}))

// Vehicle Details table
export const vehicleDetails = pgTable(
  "vehicle_details",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .unique()
      .references(() => listings.id, { onDelete: "cascade" }),
    make: text("make").notNull(),
    model: text("model").notNull(),
    year: integer("year").notNull(),
    mileage: integer("mileage"),
    fuelType: text("fuel_type"),
    transmission: text("transmission"),
    bodyType: text("body_type"),
    color: text("color"),
    engineSize: text("engine_size"),
    vin: text("vin"),
    features: json("features"),
    specifications: json("specifications"),
    serviceHistory: json("service_history"),
  },
  (table) => [
    index("vehicle_details_make_model_idx").on(table.make, table.model),
    index("vehicle_details_year_idx").on(table.year),
    index("vehicle_details_body_type_idx").on(table.bodyType),
    index("vehicle_details_fuel_type_idx").on(table.fuelType),
  ]
)

// Vehicle Details relations
export const vehicleDetailsRelations = relations(vehicleDetails, ({ one }) => ({
  listing: one(listings, {
    fields: [vehicleDetails.listingId],
    references: [listings.id],
  }),
}))

// Part Details table
export const partDetails = pgTable(
  "part_details",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .unique()
      .references(() => listings.id, { onDelete: "cascade" }),
    partType: text("part_type").notNull(),
    brand: text("brand"),
    partNumber: text("part_number"),
    warranty: text("warranty"),
    specifications: json("specifications"),
    compatibility: json("compatibility"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("part_details_listing_id_idx").on(table.listingId),
    index("part_details_part_type_idx").on(table.partType),
    index("part_details_brand_idx").on(table.brand),
  ]
)

// Part Details relations
export const partDetailsRelations = relations(partDetails, ({ one }) => ({
  listing: one(listings, {
    fields: [partDetails.listingId],
    references: [listings.id],
  }),
}))
