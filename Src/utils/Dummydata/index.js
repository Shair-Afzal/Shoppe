import Icon from '../../assets/SVG/Icon.svg';
import { RF } from '../../Constant';

const categoriesData = [
  {
    id: '1',
    uri: 'https://picsum.photos/seed/clothing/150/150',
    name: 'Clothing',
    count: 109,
    items: [
      { id: '1-101', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth1.png') },
      { id: '1-102', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth2.png') },
      { id: '1-103', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth3.png') },
      { id: '1-104', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth4.png') },
    ],
  },
  {
    id: '2',
    uri: 'https://picsum.photos/seed/shoes/150/150',
    name: 'Shoes',
    count: 530,
    items: [
      { id: '2-101', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth1.png') },
      { id: '2-102', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth2.png') },
      { id: '2-103', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth3.png') },
      { id: '2-104', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth4.png') },
    ],
  },
  {
    id: '3',
    uri: 'https://picsum.photos/seed/bags/150/150',
    name: 'Bags',
    count: 87,
    items: [
      { id: '3-101', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth1.png') },
      { id: '3-102', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth2.png') },
      { id: '3-103', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth3.png') },
      { id: '3-104', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth4.png') },
    ],
  },
  {
    id: '4',
    uri: 'https://picsum.photos/seed/lingerie/150/150',
    name: 'Lingerie',
    count: 218,
    items: [
      { id: '4-101', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth1.png') },
      { id: '4-102', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth2.png') },
      { id: '4-103', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth3.png') },
      { id: '4-104', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth4.png') },
    ],
  },
  {
    id: '5',
    uri: 'https://picsum.photos/seed/watch/150/150',
    name: 'Watch',
    count: 218,
    items: [
      { id: '5-101', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth1.png') },
      { id: '5-102', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth2.png') },
      { id: '5-103', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth3.png') },
      { id: '5-104', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth4.png') },
    ],
  },
  {
    id: '6',
    uri: 'https://picsum.photos/seed/hoodies/150/150',
    name: 'Hoodies',
    count: 218,
    items: [
      { id: '6-101', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth1.png') },
      { id: '6-102', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth2.png') },
      { id: '6-103', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth3.png') },
      { id: '6-104', name: 'Nike Air Max', price: 120, image: require('../../assets/Images/cloth4.png') },
    ],
  },
];

const topProductsData = [
  { id: 'tp-1', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-2', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-3', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-4', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-5', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-6', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-7', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-8', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-9', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
  { id: 'tp-10', image: require('../../assets/Images/cloth4.png'), name: 'Hoodies' },
];

const newItemsData = [
  { id: 'n-1', uri: 'https://picsum.photos/seed/new1/120/120', desc: 'Lorem ipsum dolor sit amet consectetur.', price: '$17.00', img: require('../../assets/Images/shoe.png') },
  { id: 'n-2', uri: 'https://picsum.photos/seed/new2/120/120', desc: 'Lorem ipsum dolor sit amet consectetur.', price: '$32.00', img: require('../../assets/Images/shoe.png') },
  { id: 'n-3', uri: 'https://picsum.photos/seed/new3/120/120', desc: 'Lorem ipsum dolor sit amet consectetur.', price: '$21.00', img: require('../../assets/Images/shoe.png') },
  { id: 'n-4', uri: 'https://picsum.photos/seed/new4/120/120', desc: 'Lorem ipsum dolor sit amet consectetur.', price: '$17.00', img: require('../../assets/Images/shoe.png') },
  { id: 'n-5', uri: 'https://picsum.photos/seed/new5/120/120', desc: 'Lorem ipsum dolor sit amet consectetur.', price: '$32.00', img: require('../../assets/Images/shoe.png') },
  { id: 'n-6', uri: 'https://picsum.photos/seed/new6/120/120', desc: 'Lorem ipsum dolor sit amet consectetur.', price: '$21.00', img: require('../../assets/Images/shoe.png') },
];

const flashSaleData = [
  { id: 'f-1', uri: 'https://picsum.photos/seed/flash1/120/120', discount: '-20%', img: require('../../assets/Images/sale.png') },
  { id: 'f-2', uri: 'https://picsum.photos/seed/flash2/120/120', discount: '-20%', img: require('../../assets/Images/sale.png') },
  { id: 'f-3', uri: 'https://picsum.photos/seed/flash3/120/120', discount: '-20%', img: require('../../assets/Images/sale.png') },
  { id: 'f-4', uri: 'https://picsum.photos/seed/flash4/120/120', discount: '-20%', img: require('../../assets/Images/sale.png') },
  { id: 'f-5', uri: 'https://picsum.photos/seed/flash5/120/120', discount: '-20%', img: require('../../assets/Images/sale.png') },
  { id: 'f-6', uri: 'https://picsum.photos/seed/flash6/120/120', discount: '-20%', img: require('../../assets/Images/sale.png') },
];

const hotPopularData = [
  { id: 'hp-1', uri: 'https://picsum.photos/seed/hot1/120/120', likes: '1780', tag: 'New', heart: '♡', img: require('../../assets/Images/sale.png') },
  { id: 'hp-2', uri: 'https://picsum.photos/seed/hot2/120/120', likes: '1780', tag: 'Sale', heart: '♡', img: require('../../assets/Images/sale.png') },
  { id: 'hp-3', uri: 'https://picsum.photos/seed/hot3/120/120', likes: '1780', tag: 'Hot', heart: '♡', img: require('../../assets/Images/sale.png') },
  { id: 'hp-4', uri: 'https://picsum.photos/seed/hot4/120/120', likes: '178', tag: '', heart: '♡', img: require('../../assets/Images/sale.png') },
];

const salesdata = [
  { id: 's-1', image: require('../../assets/Images/imgbackground.png'), sales: 'Big Sale', upto: 'Up to 50%', img: require('../../assets/Images/sale.png') },
  { id: 's-2', image: require('../../assets/Images/imgbackground.png'), sales: 'Big Sale', upto: 'Up to 50%', img: require('../../assets/Images/sale.png') },
  { id: 's-3', image: require('../../assets/Images/imgbackground.png'), sales: 'Big Sale', upto: 'Up to 50%' },
  { id: 's-4', image: require('../../assets/Images/imgbackground.png'), sales: 'Big Sale', upto: 'Up to 50%' },
];

const justForYouData = [
  { id: 'j-1', uri: 'https://picsum.photos/seed/you1/180/180' },
  { id: 'j-2', uri: 'https://picsum.photos/seed/you2/180/180' },
];

const orderStatusData = [
  { id: 'os-1', title: 'To Pay', hasNotification: false },
  { id: 'os-2', title: 'To Recieve', hasNotification: true },
  { id: 'os-3', title: 'To Review', hasNotification: false },
];

const categories = [
  { id: 'c-1', name: 'Jackets' },
  { id: 'c-2', name: 'T-Shirts' },
  { id: 'c-3', name: 'Bags' },
  { id: 'c-4', name: 'Shoes' },
  { id: 'c-5', name: 'Jeans' },
  { id: 'c-6', name: 'Sweaters' },
  { id: 'c-7', name: 'Hoodies' },
  { id: 'c-8', name: 'Shorts' },
  { id: 'c-9', name: 'Caps' },
  { id: 'c-10', name: 'Accessories' },
];

const storydata = [
  { id: 'st-1', image: require('../../assets/Images/Storyimg.png') },
  { id: 'st-2', image: require('../../assets/Images/Storyimg.png'), txt: 'Lorem ipsum dolor sit amet,\n consectetur adipiscing elit.' },
  { id: 'st-3', image: require('../../assets/Images/Storyimg.png') },
  { id: 'st-4', image: require('../../assets/Images/Storyimg.png'), bigsale: require('../../assets/Images/bigsalecard.png'), txt: 'Lorem ipsum dolor sit amet,\n consectetur adipiscing elit.' },
  { id: 'st-5', image: require('../../assets/Images/Storyimg.png') },
];

export const sizesData = [
  { id: 'sz-1', label: 'XS', value: 'xs' },
  { id: 'sz-2', label: 'S', value: 's' },
  { id: 'sz-3', label: 'M', value: 'm' },
  { id: 'sz-4', label: 'L', value: 'l' },
  { id: 'sz-5', label: 'XL', value: 'xl' },
  { id: 'sz-6', label: 'XXL', value: 'xxl' },
];

export const colorsData = [
  { id: 'col-1', hex: '#EBEBEB', name: 'Light Gray' },
  { id: 'col-2', hex: '#2A2A2A', name: 'Dark Gray' },
  { id: 'col-3', hex: '#0C29B9', name: 'Blue' },
  { id: 'col-4', hex: '#FF3333', name: 'Red' },
  { id: 'col-5', hex: '#0CA8B9', name: 'Cyan' },
  { id: 'col-6', hex: '#E4A719', name: 'Gold' },
  { id: 'col-7', hex: '#9D3CB9', name: 'Purple' },
];

export const sortOptions = [
  { id: 'so-1', label: 'Popular', value: 'popular' },
  { id: 'so-2', label: 'Newest', value: 'price_high_low' },
  { id: 'so-3', label: 'Price: High to Low', value: 'newest' },
  { id: 'so-4', label: 'Price: Low to High', value: 'price_low_high' },
];

export const detailsdata = [
  { id: 'd-1', img: require('../../assets/Images/Detailsimg.png') },
  { id: 'd-2', img: require('../../assets/Images/Detailsimg.png') },
  { id: 'd-3', img: require('../../assets/Images/Detailsimg.png') },
  { id: 'd-4', img: require('../../assets/Images/Detailsimg.png') },
];

const ProductsData = [
  { id: 'p-1', image: require('../../assets/Images/bag.png'), name: 'Hoodies' },
  { id: 'p-2', image: require('../../assets/Images/watch.png'), name: 'Hoodies' },
  { id: 'p-3', image: require('../../assets/Images/bag.png'), name: 'Hoodies' },
  { id: 'p-4', image: require('../../assets/Images/watch.png'), name: 'Hoodies' },
  { id: 'p-5', image: require('../../assets/Images/bag.png'), name: 'Hoodies' },
  { id: 'p-6', image: require('../../assets/Images/watch.png'), name: 'Hoodies' },
  { id: 'p-7', image: require('../../assets/Images/bag.png'), name: 'Hoodies' },
  { id: 'p-8', image: require('../../assets/Images/watch.png'), name: 'Hoodies' },
  { id: 'p-9', image: require('../../assets/Images/bag.png'), name: 'Hoodies' },
  { id: 'p-10', image: require('../../assets/Images/watch.png'), name: 'Hoodies' },
];

export const sales = [
  { id: 'sal-1', category: 'Clothing', amount: 183.0, color: '#0C29B9' },
  { id: 'sal-2', category: 'Lingerie', amount: 92.0, color: '#FF3333' },
  { id: 'sal-3', category: 'Shoes', amount: 47.0, color: '#E4A719' },
  { id: 'sal-4', category: 'Bags', amount: 43.0, color: '#0CA8B9' },
];

export const orderHistoryData = [
  { id: 'oh-1', image: require('../../assets/Images/cartimg.png'), title: 'Lorem ipsum dolor sit amet consectetur.', orderNumber: '#92287157', date: 'April, 06' },
  { id: 'oh-2', image: require('../../assets/Images/cartimg.png'), title: 'Lorem ipsum dolor sit amet consectetur.', orderNumber: '#92287157', date: 'April, 06' },
  { id: 'oh-3', image: require('../../assets/Images/cartimg.png'), title: 'Lorem ipsum dolor sit amet consectetur.', orderNumber: '#92287157', date: 'April, 06' },
  { id: 'oh-4', image: require('../../assets/Images/cartimg.png'), title: 'Consectetur adipiscing elit sed do.', orderNumber: '#92287158', date: 'April, 12' },
  { id: 'oh-5', image: require('../../assets/Images/cartimg.png'), title: 'Sed ut perspiciatis unde omnis iste.', orderNumber: '#92287159', date: 'April, 15' },
  { id: 'oh-6', image: require('../../assets/Images/cartimg.png'), title: 'At vero eos et accusamus et iusto odio.', orderNumber: '#92287160', date: 'April, 20' },
];

// MenuData.js
export const menuData = [
  {
    id: 'm-1',
    title: 'Personal',
    screens: [
      { id: 'm-1-1', name: 'Profile', navigateTo: 'Settingprofile' },
      { id: 'm-1-2', name: 'Shipping Address', navigateTo: 'shipping' },
      { id: 'm-1-3', name: 'Payment methods', navigateTo: 'PaymentMethod' },
    ],
  },
  {
    id: 'm-2',
    title: 'Shop',
    screens: [
      { id: 'm-2-1', name: 'Country', navigateTo: 'Country', txt: 'Vietnam' },
      { id: 'm-2-2', name: 'Currency', navigateTo: 'Currency', txt: '$ USD' },
      { id: 'm-2-3', name: 'Sizes', navigateTo: 'Size', txt: 'UK' },
      { id: 'm-2-4', name: 'Terms and Conditions', navigateTo: 'Termcondition' },
    ],
  },
  {
    id: 'm-3',
    title: 'Account',
    screens: [
      { id: 'm-3-1', name: 'Language', navigateTo: 'Language', txt: 'English' },
      { id: 'm-3-2', name: 'About Slada', navigateTo: 'About' },
    ],
  },
];

export const sizes = [
  { id: 'size-1', title: 'US' },
  { id: 'size-2', title: 'EU' },
  { id: 'size-3', title: 'UK' },
];

export const languageData = [
  { id: 'lang-1', name: 'English', code: 'en' },
  { id: 'lang-2', name: 'Français', code: 'fr' },
  { id: 'lang-3', name: 'Русский', code: 'ru' },
  { id: 'lang-4', name: 'Tiếng Việt', code: 'vi' },
];

export const transactionData = [
  { id: 't-1', date: 'April 19, 2020 12:31', amount: '-$14.00', order: 'Order #92287157', icon: <Icon height={RF(20)} width={RF(20)} /> },
  { id: 't-2', date: 'May 02, 2020 09:20', amount: '-$29.00', order: 'Order #92287158', icon: <Icon height={RF(20)} width={RF(20)} /> },
  { id: 't-3', date: 'June 11, 2020 15:45', amount: '-$47.00', order: 'Order #92287159', icon: <Icon height={RF(20)} width={RF(20)} /> },
  { id: 't-4', date: 'July 23, 2020 18:05', amount: '-$92.00', order: 'Order #92287160', icon: <Icon height={RF(20)} width={RF(20)} /> },
  { id: 't-5', date: 'August 07, 2020 11:12', amount: '-$183.00', order: 'Order #92287161', icon: <Icon height={RF(20)} width={RF(20)} /> },
];

export const countryData = [
  {
    title: 'A',
    data: [
      { id: 'ct-1', name: 'Afghanistan' },
      { id: 'ct-2', name: 'Albania' },
      { id: 'ct-3', name: 'Algeria' },
      { id: 'ct-4', name: 'Argentina' },
      { id: 'ct-5', name: 'Australia' },
    ],
  },
  {
    title: 'B',
    data: [
      { id: 'ct-6', name: 'Bahamas' },
      { id: 'ct-7', name: 'Bahrain' },
      { id: 'ct-8', name: 'Bangladesh' },
      { id: 'ct-9', name: 'Belgium' },
      { id: 'ct-10', name: 'Brazil' },
    ],
  },
  {
    title: 'C',
    data: [
      { id: 'ct-11', name: 'Cambodia' },
      { id: 'ct-12', name: 'Cameroon' },
      { id: 'ct-13', name: 'Canada' },
      { id: 'ct-14', name: 'Chile' },
      { id: 'ct-15', name: 'China' },
    ],
  },
];

export const currencyData = [
  { id: 'cur-1', name: 'USD', symbol: '$', code: 'USD' },
  { id: 'cur-2', name: 'EURO', symbol: '€', code: 'EUR' },
  { id: 'cur-3', name: 'VND', symbol: '₫', code: 'VND' },
  { id: 'cur-4', name: 'RUB', symbol: '₽', code: 'RUB' },
];

export const porgressdata = [
  { id: 'pg-1', title: 'First Purchase', txt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' },
  { id: 'pg-2', title: 'First Purchase', txt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' },
  { id: 'pg-3', title: 'First Purchase', txt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' },
  { id: 'pg-4', title: 'First Purchase', txt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' },
];

export const TrackData = [
  { id: 'tr-1', titile: 'Packed', date: 'April,19 12:31', txt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.' },
  { id: 'tr-2', titile: 'On the Way to Logistic Facility', date: 'April,19 12:31', txt: 'Your parcel is packed and will be handed over to our delivery partner.' },
  { id: 'tr-3', titile: 'Arrived at Logistic Facility', date: 'April,19 12:31', txt: 'Your parcel is packed and will be handed over to our delivery partner.' },
  { id: 'tr-4', titile: 'Shipped', date: 'Expected on April,20', txt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.' },
];

export const orderIssuesData = [
  { id: 'oi-1', title: 'Order Issue' },
  { id: 'oi-2', title: 'Item Quality' },
  { id: 'oi-3', title: 'Payment Issues' },
  { id: 'oi-4', title: 'Technical Assistance' },
  { id: 'oi-5', title: 'Other' },
];

export {
  categoriesData,
  topProductsData,
  newItemsData,
  flashSaleData,
  hotPopularData,
  salesdata,
  justForYouData,
  orderStatusData,
  categories,
  storydata,
  ProductsData,
};
