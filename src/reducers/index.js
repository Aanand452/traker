import CurrencyFormatter from 'currency-formatter';
import { DEFAULT_LIST } from '../config/config';
import update from 'immutability-helper';

const NUMBER_OF_DECIMALS = 2;

const formatPriceListTypes = priceListTypes => {
  if (priceListTypes) {
    const keys = Object.keys(priceListTypes);
    return keys.map(key => ({
      value: key,
      label: priceListTypes[key]
    }));
  } else {
    return INITIAL_STATE.priceListTypes;
  }
};

const INITIAL_STATE = {
  auth: null,
  user: null,
  products: [],
  revisionNumber: null,
  revisionDate: null,
  currencies: [],
  editions: [],
  priceListTypes: formatPriceListTypes({ [DEFAULT_LIST]: 'Price List' }),
  buttons: {},
  selectedProduct: null,
  openedParents: {},
  tempOpenedParents: {},
  checkedProducts: {},
  hiddenColumns: {},
  currentProductId: null,
  toggles: {
    settingsOpen: false,
    documentsOpened: false,
    currenciesOpen: false,
    productInfoModalOpen: false,
    allParentsOpened: false,
    annual: true
  },
  filters: {
    search: '',
    currency: null,
    edition: null,
    list: DEFAULT_LIST
  },
  productsLoaded: false,
  sort: {
    key: null,
    asc: null,
    grouped: true
  },
  upload: {
    fileToUpload: null,
    inProgress: false,
    result: {}
  },
  discountMatrix: {
    modalOpened: false,
    products: [],
    editions: [],
    matrix: [],
    edition: null,
    disclaimerAccepted: false,
    exportInProgress: false
  },
  exportInProgress: false
};

const openAllParents = productId => {
  const productIds = productId.split('.');
  let opened = {};
  for (let i = productIds.length; i > 0; i--) {
    productIds.splice(i);
    opened[productIds.join('.')] = true;
  }
  return opened;
};

const getAllParentsBool = (products, bool) => {
  let allProductsBool = {};
  if (products) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].relatedProducts && products[i].relatedProducts.length) {
        allProductsBool = {
          ...allProductsBool,
          [products[i].uniqueId]: bool,
          ...getAllParentsBool(products[i].relatedProducts, bool)
        };
      }
    }
  }
  return allProductsBool;
};

const getAllProductsCheckBool = (products, bool) => {
  let allProductsBool = {};
  if (products) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].editionPrices && products[i].editionPrices.length) {
        allProductsBool = {
          ...allProductsBool,
          [products[i].uniqueId]: bool
        };
      }
      if (products[i].relatedProducts && products[i].relatedProducts.length) {
        allProductsBool = {
          ...allProductsBool,
          ...getAllProductsCheckBool(products[i].relatedProducts, bool)
        };
      }
    }
  }
  return allProductsBool;
};

const formatProducts = (products, parentId) => {
  if (products) {
    for (let i = 0; i < products.length; i++) {
      products[i].uniqueId = parentId
        ? `${parentId}.${products[i].id}`
        : products[i].id.toString();
      if (products[i].relatedProducts) {
        products[i].relatedProducts = formatProducts(
          products[i].relatedProducts,
          products[i].uniqueId
        );
      }
    }
  }
  return products;
};

const getSearchedParents = (
  products,
  checkedProducts,
  searchWords,
  parentId
) => {
  let parents = {};

  if (searchWords.length) {
    for (let i = 0; i < products.length; i++) {
      let productId;
      if (!parentId) {
        productId = products[i].id.toString();
      } else {
        productId = `${parentId}.${products[i].id}`;
      }

      if (
        searchWords.every(searchWord =>
          [products[i].name].some(
            field => field.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
          )
        ) ||
        checkedProducts[productId]
      ) {
        if (parentId) {
          parents = {
            ...parents,
            ...openAllParents(parentId)
          };
        }
      }
      if (products[i].relatedProducts && products[i].relatedProducts.length) {
        parents = {
          ...parents,
          ...getSearchedParents(
            products[i].relatedProducts,
            checkedProducts,
            searchWords,
            productId
          )
        };
      }
    }
  }

  return parents;
};

const formatDecimals = (number, precision) => {
  return number ? parseFloat(parseFloat(number).toFixed(precision)) : number;
};

export default function app(state = INITIAL_STATE, action) {
  const tempOpenedParents = state.filters.search ? state.tempOpenedParents : {};
  if (action.type === 'SEARCH') {
    const searchWords = action.query ? action.query.split(' ') : [];
    return {
      ...state,
      filters: {
        ...state.filters,
        search: action.query
      },
      tempOpenedParents: {
        ...getSearchedParents(
          state.products,
          state.checkedProducts,
          searchWords
        ),
        ...tempOpenedParents
      }
    };
  } else if (action.type === 'SORT_COLUMN') {
    const key =
      action.sortKey &&
      action.sortKey === state.sort.key &&
      state.sort.asc === false
        ? null
        : action.sortKey;
    const asc = key
      ? state.sort.key !== action.sortKey
        ? true
        : state.sort.asc
          ? false
          : state.sort.asc === false
            ? null
            : true
      : null;
    return {
      ...state,
      sort: {
        ...state.sort,
        key: key,
        asc
      }
    };
  } else if (action.type === 'TOGGLE_PARENT') {
    const opened =
      action.opened !== undefined
        ? action.opened
        : !state.openedParents[action.parentId];
    if (state.filters.search) {
      return {
        ...state,
        tempOpenedParents: {
          ...state.tempOpenedParents,
          [action.parentId]: opened
        }
      };
    } else {
      return {
        ...state,
        openedParents: {
          ...state.openedParents,
          [action.parentId]: opened
        }
      };
    }
  } else if (action.type === 'TOGGLE_ALL_PARENTS') {
    const allParentsBool = getAllParentsBool(
      state.products,
      !state.toggles.allParentsOpened
    );
    return {
      ...state,
      openedParents: {
        ...state.openedParents,
        ...(state.filters.search ? {} : allParentsBool)
      },
      tempOpenedParents: {
        ...state.tempOpenedParents,
        ...(state.filters.search ? allParentsBool : {})
      },
      toggles: {
        ...state.toggles,
        allParentsOpened: !state.toggles.allParentsOpened
      }
    };
  } else if (action.type === 'TOGGLE_PRODUCT_INFO_UPLOAD') {
    return {
      ...state,
      toggles: {
        ...state.toggles,
        productInfoModalOpen: !state.toggles.productInfoModalOpen
      },
      selectedProduct: action.product
    };
  } else if (action.type === 'TOGGLE_PRICING_MODAL') {
    return {
      ...state,
      discountMatrix: {
        ...state.discountMatrix,
        modalOpened: !state.discountMatrix.modalOpened,
        products: action.products,
        editions: action.editions,
        edition: action.edition,
        disclaimerAccepted: false,
        matrix: []
      }
    };
  } else if (action.type === 'TOGGLE_ANNUAL') {
    return {
      ...state,
      toggles: {
        ...state.toggles,
        annual: !state.toggles.annual
      }
    };
  } else if (action.type === 'TOGGLE_SETTINGS_MENU') {
    const opened =
      action.opened === undefined ? !state.toggles.settingsOpen : action.opened;
    return {
      ...state,
      toggles: {
        ...state.toggles,
        settingsOpen: opened
      }
    };
  } else if (action.type === 'TOGGLE_DOCUMENTS_MENU') {
    const opened =
      action.opened === undefined
        ? !state.toggles.documentsOpened
        : action.opened;
    return {
      ...state,
      toggles: {
        ...state.toggles,
        documentsOpened: opened
      }
    };
  } else if (action.type === 'CLOSE_ALL_DROPDOWNS') {
    return {
      ...state,
      toggles: {
        ...state.toggles,
        documentsOpened: false,
        settingsOpen: false
      }
    };
  } else if (action.type === 'SELECT_CURRENCY') {
    return {
      ...state,
      filters: {
        ...state.filters,
        currency: action.currency
      }
    };
  } else if (action.type === 'SELECT_EDITION') {
    return {
      ...state,
      filters: {
        ...state.filters,
        edition: action.edition
      }
    };
  } else if (action.type === 'SELECT_LIST') {
    return {
      ...state,
      filters: {
        ...state.filters,
        list: action.list
      }
    };
  } else if (action.type === 'CHECK_PRODUCT') {
    const checkedProd = { [action.productId]: action.checked };
    return {
      ...state,
      checkedProducts: {
        ...state.checkedProducts,
        ...checkedProd
      },
      openedParents: {
        ...state.openedParents,
        ...openAllParents(action.productId)
      }
    };
  } else if (action.type === 'TOGGLE_COLUMN') {
    return {
      ...state,
      hiddenColumns: {
        ...state.hiddenColumns,
        [action.columnId]: !state.hiddenColumns[action.columnId]
      }
    };
  } else if (action.type === 'SHOW_COLUMN') {
    return {
      ...state,
      hiddenColumns: {
        ...state.hiddenColumns,
        [action.columnId]: true
      }
    };
  } else if (action.type === 'PRODUCTS_LOADED') {
    const products = formatProducts(action.data.relatedProducts);
    const parentsFalse = getAllParentsBool(products, false);
    return {
      ...state,
      products: products,
      revisionNumber: action.data.revisionNumber,
      revisionDate: action.data.revisionDate,
      priceListTypes: formatPriceListTypes(action.data.priceListTypes),
      buttons: {
        ...action.data.buttons
      },
      productsLoaded: true,
      filters: {
        ...state.filters,
        search: ''
      },
      toggles: {
        ...state.toggles,
        allParentsOpened: false
      },
      openedParents:
        products && products.length === 1
          ? { ...parentsFalse, [products[0].uniqueId]: true }
          : parentsFalse,
      tempOpenedParents: {},
      checkedProducts: getAllProductsCheckBool(products, false),
      hiddenColumns: {}
    };
  } else if (action.type === 'RESET_VIEW') {
    return {
      ...state,
      products: [],
      currencies: [],
      selectedEdition: null,
      selectedCurrency: null,
      productsLoaded: false
    };
  } else if (action.type === 'CURRENCIES_LOADED') {
    let currencies = action.currencies
      .map(currency => {
        let currencySymbol;
        try {
          currencySymbol = CurrencyFormatter.findCurrency(currency).symbol;
          return {
            value: currency,
            label:
              currency +
              ' (' +
              (currencySymbol ? currencySymbol : currency) +
              ')'
          };
        } catch (e) {
          currencySymbol = currency;
          return null;
        }
      })
      .filter(currency => currency !== null);
    return {
      ...state,
      currencies,
      filters: {
        ...state.filters,
        currency: currencies.length ? currencies[0].value : ''
      }
    };
  } else if (action.type === 'EDITIONS_LOADED') {
    let editions = action.editions.map(edition => ({
      value: edition.name,
      label: edition.name.replace('Edition', '').replace('edition', '')
    }));
    return {
      ...state,
      editions,
      filters: {
        ...state.filters,
        edition: editions.length ? editions[0].value : ''
      }
    };
  } else if (action.type === 'PRODUCT_VIEW') {
    return {
      ...state,
      currentProductId: action.id
    };
  } else if (action.type === 'SELECT_UPLOAD_FILE') {
    return {
      ...state,
      upload: {
        ...state.upload,
        fileToUpload: action.file
      }
    };
  } else if (action.type === 'SET_UPLOAD_RESULT') {
    return {
      ...state,
      upload: {
        ...state.upload,
        result: action.result
      }
    };
  } else if (action.type === 'SET_UPLOAD_IN_PROGRESS') {
    return {
      ...state,
      upload: {
        ...state.upload,
        inProgress: action.inProgress
      }
    };
  } else if (action.type === 'SET_EXPORT_IN_PROGRESS') {
    return {
      ...state,
      exportInProgress: action.inProgress
    };
  } else if (action.type === 'SET_EXPORT_SCRATCHPAD_IN_PROGRESS') {
    return {
      ...state,
      discountMatrix: {
        ...state.discountMatrix,
        exportInProgress: action.inProgress
      }
    };
  } else if (action.type === 'SET_USER') {
    return {
      ...state,
      user: action.user
    };
  } else if (action.type === 'SET_DISCOUNT_MATRIX') {
    return {
      ...state,
      discountMatrix: {
        ...state.discountMatrix,
        matrix: action.matrix
      }
    };
  } else if (action.type === 'SELECT_DISCOUNT_EDITION') {
    return {
      ...state,
      discountMatrix: {
        ...state.discountMatrix,
        edition: action.edition
      }
    };
  } else if (action.type === 'ACCEPT_DM_DISCLAIMER') {
    return {
      ...state,
      discountMatrix: {
        ...state.discountMatrix,
        disclaimerAccepted: true
      }
    };
  } else if (action.type === 'SET_DM_PRODUCT_QUANTITY') {
    if (action.quantity) {
      action.quantity = Math.floor(action.quantity);
      action.quantity = action.quantity < 0 ? 0 : action.quantity;
    }
    return update(state, {
      discountMatrix: {
        products: {
          [action.index]: {
            quantity: { $set: action.quantity }
          }
        }
      }
    });
  } else if (action.type === 'SET_DM_PRODUCT_DISCOUNT') {
    action.discount = action.discount > 100 ? 100 : action.discount;
    action.discount =
      action.discount < 0
        ? 0
        : formatDecimals(action.discount, NUMBER_OF_DECIMALS);
    return update(state, {
      discountMatrix: {
        products: {
          [action.index]: {
            discount: { $set: action.discount }
          }
        }
      }
    });
  } else if (action.type === 'TOGGLE_PRODUCT_MATRIX') {
    return update(state, {
      discountMatrix: {
        products: {
          [action.index]: {
            showMatrix: {
              $set: !state.discountMatrix.products[action.index].showMatrix
            }
          }
        }
      }
    });
  }

  return state;
}
