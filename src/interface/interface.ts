export interface WoocomOrder {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: Billing;
  shipping: Shipping;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed?: null;
  date_paid?: string | null;
  cart_hash: string;
  number: string;
  meta_data?: (MetaDataEntity)[] | null;
  line_items: LineItemsEntity[];
  tax_lines?: (null)[] | null;
  shipping_lines?: (ShippingLinesEntity)[] | null;
  fee_lines?: (null)[] | null;
  coupon_lines?: (null)[] | null;
  refunds?: (null)[] | null;
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt?: null;
  date_paid_gmt?: string | null;
  currency_symbol: string;
  _links: Links;
}
export interface Billing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}
export interface Shipping {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}
export interface MetaDataEntity {
  id: number;
  key: string;
  value: string;
}
export interface LineItemsEntity {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes?: (null)[] | null;
  meta_data?: (null)[] | null;
  sku: string;
  price: number;
  image: Image;
  parent_name?: null;
}
export interface Image {
  id: string;
  src: string;
}
export interface ShippingLinesEntity {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes?: (null)[] | null;
  meta_data?: (MetaDataEntity1)[] | null;
}
export interface MetaDataEntity1 {
  id: number;
  key: string;
  value: string;
  display_key: string;
  display_value: string;
}
export interface Links {
  self?: (SelfEntityOrCollectionEntity)[] | null;
  collection?: (SelfEntityOrCollectionEntity)[] | null;
}
export interface SelfEntityOrCollectionEntity {
  href: string;
}
export interface SourceDatab {
  first_name: string;
  address_line1: string;
  address_line2: string;
  pincode: string;
  city: string;
  state: string;
  primary_contact_number: string;
  landmark: string;
  email_id: string;
}


export interface SourceData {
  first_name?: string;
  address_line1?: string;
  address_line2?: string;
  pincode?: string;
  city?: string;
  state?: string;
  primary_contact_number?: string;
  landmark?: string;
  email_id?: string;
  location_code?: string
}
export interface DestinationData {
  first_name: string;
  address_line1: string;
  address_line2: string;
  pincode: string;
  city: string;
  state: string;
  primary_contact_number: string;
  landmark: string;
  email_id: string;
  alternate_contact_number: string;
}


export interface GlobalData {
  g_tracking_id: string,
  amount_to_collect: string,
  shipment_value: string,
  hsn: string,
  ern: string,
  total_weight: string,
  total_tax_value: string,
  total_sale_value: string,
  cgst: string,
  sgst: string,
  igst: string,
  order_id: string,
  invoice_id: string,
  eway_bill_number: string,
  seller_reg_name: string,
  gstin_id: string,
}

export interface ProductData {
  [key: string]: string | boolean,
  tracking_id:string,
  product_id:string,
  product_title:string,
  category:string,
  length:string,
  height:string,
  weight:string,
  breadth:string,
  isDangerous:boolean,
  isFragile:boolean,
}

export interface ShipmentItemDetail {
  product_id: string;
  product_title: string;
  category: string;
  quantity: number;
  total_tax_value: number;
  total_sale_value: number;
  cgst: number;
  sgst: number;
  igst: number;
  discount: number;
  seller_reg_name: string;
  gstin_id: string;
  hsn: string;
  ern: string;
  order_id: string;
  invoice_id: string;
  item_dimensions: string;
  brand_name: string;
  eway_bill_number: string;
  tracking_id: string;
  value: number;
}
export interface ShipmentDimension {
  length: number;
  height: number;
  weight: number;
  breadth: number;
}


export interface ProductWoocom {
  id: number
  name: string
  slug: string
  permalink: string
  price: string
  regular_price: string
  sale_price: string
  total_sales: number
  virtual: boolean
  tax_status: string
  tax_class: string
  weight: string
  dimensions: Dimensions
  categories: Category[]
  attributes: any[]
  default_attributes: any[]
  etheme_brands: EthemeBrand[]
  _links: Links
}

export interface Dimensions {
  length: string
  width: string
  height: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface EthemeBrand {
  term_id: number
  name: string
  slug: string
  term_group: number
  term_taxonomy_id: number
  taxonomy: string
  description: string
  parent: number
  count: number
  filter: string
}

export interface EkartCreateResonse {
  tracking_id?: string;
  shipment_payment_link?: string;
  status?: string;
  status_code?: number;
  is_parked?: string;
  message?: any;
}

export interface EkartCreateShipRes {
  response: EkartCreateResonse[];
  request_id?: string;
}

export interface PerShipmentDetail {
  _id: string
  ekartarray: Ekartarray[]
  resultarray: Resultarray[]
  __v: number
}

export interface Ekartarray {
  client_name: string
  services: Service[]
}

export interface Service {
  service_code: string
  service_details: ServiceDetail[]
}

export interface ServiceDetail {
  service_leg: string
  service_data: ServiceData
  shipment: Shipment
}

export interface ServiceData {
  vendor_name: string
  amount_to_collect: number
  delivery_type: string
  source: Source
  destination: Destination
  return_location: ReturnLocation
}

export interface Source {
  address: Address
}

export interface Address {
  first_name: string
  address_line1: string
  address_line2: string
  pincode: string
  city: string
  state: string
  primary_contact_number: string
  landmark: string
  email_id: string
}

export interface Destination {
  address: Address2
}

export interface Address2 {
  first_name: string
  address_line1: string
  address_line2: string
  pincode: string
  city: string
  state: string
  primary_contact_number: string
  landmark: string
  email_id: string
  alternate_contact_number: string
}

export interface ReturnLocation {
  address: Address3
}

export interface Address3 {
  first_name: string
  address_line1: string
  address_line2: string
  pincode: string
  city: string
  state: string
  primary_contact_number: string
  landmark: string
  email_id: string
}

export interface Shipment {
  client_reference_id: string
  return_label_desc_1: string
  return_label_desc_2: string
  tracking_id: string
  shipment_value: number
  shipment_items: ShipmentItem[]
  shipment_dimensions: ShipmentDimensions
}

export interface ShipmentItem {
  product_id: string
  product_title: string
  category: string
  quantity: number
  cost: Cost
  hsn: string
  ern: string
  discount: number
  item_attributes: ItemAttribute[]
  handling_attributes: HandlingAttribute[]
  seller_details: SellerDetails
}

export interface Cost {
  total_tax_value: number
  total_sale_value: number
  tax_breakup: TaxBreakup
}

export interface TaxBreakup {
  cgst: number
  sgst: number
  igst: number
}

export interface ItemAttribute {
  name: string
  value: string
}

export interface HandlingAttribute {
  name: string
  value: boolean
}

export interface SellerDetails {
  seller_reg_name: string
  gstin_id: string
}

export interface ShipmentDimensions {
  length: Length
  height: Height
  weight: Weight
  breadth: Breadth
}

export interface Length {
  value: number
}

export interface Height {
  value: number
}

export interface Weight {
  value: number
}

export interface Breadth {
  value: number
}

export interface Resultarray {
  response: Response[]
  request_id: string
}

export interface Response {
  tracking_id: string
  status?: string
  message?: string[]
  is_parked?: string
}


export interface Tracking {
  shipment_type: string
  cod_amount: string
  shipment_id: string
  shipment_value: string
  order_id: string
  external_tracking_id: string
  delivery_type: string
  weight: string
  delivered: boolean
  merchant_name: string
  history?: History[]
  sender: Sender
  vendor: string
  mh_inscanned: boolean
  expected_delivery_date: string
  rto: boolean
}

export interface HistoryTrack {
  status: string
  event_date: string
  event_date_iso8601: string
  hub_name?: string
  city?: string
  description?: string
}
export interface Sender {
  city: string
  state: string
  pincode: string
  address1: string
  address2: string
}

export interface orderInptype {
  _id?: string
  email: string;
  name: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  pincode: number;
  companyname: string;
  totalbill: number;
  ship_add: boolean;
  ship_address: {
    email: string;
    name: string;
    phone: number;
    address: string;
    city: string;
    state: string;
    pincode: number;
    companyname: string;
  };
  orderprod: Array<{
    productname: string;
    productId: string;
    productslug: string;
    productmodel: string;
    productnormalprice: number;
    productsaleprice: number;
    quantity: number;
    coupon: string,
  }>;
  status: string;
  orderid: string;
  sppl_orderid: string;
  paymentid: string;
  paymentdate: string;
  coupon?: string,
  totalprodprice: number,
  discountammount?: number,
  ekartData: Array<{
    trackingID: string;
  }>;
  createdAt: string
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export enum AddMPSRoutes {
  SOURCE_INFO  = '/mps/step-one',
  DESTINATION_INFO = '/mps/step-two',
}

export interface SourceAddressDb {
  first_name: string;
  address_line1: string;
  address_line2: string;
  pincode: string;
  city: string;
  state: string;
  primary_contact_number: string;
  landmark: string;
  email_id: string;
  alternate_contact_number?: string;
}

export interface GlobalDataDB {
  g_tracking_id: string;
  amount_to_collect: string;
  shipment_value: string;
  hsn: string;
  ern: string;
  total_weight: string;
  total_tax_value: string;
  total_sale_value: string;
  cgst: string;
  sgst: string;
  igst: string;
  order_id: string;
  invoice_id: string;
  eway_bill_number: string;
  seller_reg_name: string;
  gstin_id: string;
}

export interface ShipmentData {
  tracking_id: string;
  product_id: string;
  product_title: string;
  category: string;
  length: string;
  height: string;
  weight: string;
  breadth: string;
  isDangerous: boolean;
  isFragile: boolean;
}

export interface ShipmentInfo {
  sourceData: Address;
  destiData: Address;
  globalData: GlobalData;
  shipmentData: ShipmentData[];
  amount:number
}
