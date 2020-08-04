/*global ga */
import { post, get } from 'axios';
import slug from 'slug';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';
import {
  LOGIN_URL,
  PRODUCT_ALL_URL,
  UPLOAD_FILE_URL,
  EXPORT_EXCEL_URL,
  SCRATCHPAD_EXPORT_URL,
  SCRATCHPAD_QUERY_URL
} from '../config/config';

const NOT_APPLICABLE = 'n/a';

export const authenticate = () => dispatch => {
  window.location.replace(LOGIN_URL);
};

export const productsLoad = type => dispatch => {
  dispatch(resetView());
  if (type) {
    get(PRODUCT_ALL_URL + type, {})
      .then(response => {
        const data = response.data;
        dispatch(productsLoaded(data));
        dispatch(currenciesLoaded(data.currencies));
        dispatch(editionsLoaded(data.editions));
      })
      .catch(error => {
        dispatch(productsLoaded([]));
        dispatch(currenciesLoaded([]));
        dispatch(editionsLoaded([]));
      });
  }
};

export const uploadFile = file => dispatch => {
  dispatch(setUploadInProgress(true));
  dispatch(setUploadResult({}));
  const checkUploadProgress = id => {
    get(UPLOAD_FILE_URL + '/' + id, {})
      .then(response => {
        dispatch(setUploadResult(response.data));
        if (response.data && response.data.finished === false) {
          setTimeout(() => {
            checkUploadProgress(id);
          }, 1000);
        } else {
          dispatch(setUploadInProgress(false));
          if (response.data.log[response.data.log.length - 1].error === false) {
            dispatch(selectUploadFile(null));
            //Not pretty but: File input cannot be controlled, there is no React specific way to do that
            document.getElementById('uploadFile').value = '';
          }
        }
      })
      .catch(error => {
        let errorMessage = (error.response && error.response.data)
          ? error.response.data
          : { success: false, message: 'Connection lost' };
        dispatch(
          setUploadResult(errorMessage)
        );
        dispatch(setUploadInProgress(false));
      });
  };
  const formData = new FormData();
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  formData.append('file', file);
  post(UPLOAD_FILE_URL, formData, config)
    .then(response => {
      if (response.data) {
        if (response.data.success && response.data.message) {
          //Sets the pin for checking the progress
          checkUploadProgress(response.data.message);
        } else {
          dispatch(setUploadResult(response.data));
          dispatch(setUploadInProgress(false));
        }
      } else {
        dispatch(
          setUploadResult({ success: false, message: 'Unexpected error' })
        );
        dispatch(setUploadInProgress(false));
      }
    })
    .catch(error => {
      let errorMessage = (error.response && error.response.data)
        ? error.response.data
        : { success: false, message: 'Connection lost' };
      dispatch(setUploadResult(errorMessage));
      dispatch(setUploadInProgress(false));
    });
};

const includeProduct = (
  product,
  checkedProducts,
  currency,
  editions,
  annual,
  parentId,
  discountMatrix
) => {
  let prods = [];
  if (product) {
    if (!parentId) {
      parentId = product.id.toString();
    } else {
      parentId += `.${product.id}`;
    }
    if (checkedProducts[parentId]) {
      if (product.editionPrices) {
        product.editionPrices = product.editionPrices.filter(
          price =>
            includes(editions, price.edition.name) &&
            price.currencyCode === currency
        );
        if (annual === false) {
          product.editionPrices = product.editionPrices.map(ep => {
            if (!isNaN(ep.price)) {
              ep.price = ep.price / 12;
            }
            return ep;
          });
        }
      }
      if (discountMatrix) {
        product.quantity = '';
        product.discount = '';
        product.showMatrix = false;
      }
      prods.push(product);
    }

    if (product.relatedProducts) {
      for (let i = 0; i < product.relatedProducts.length; i++) {
        prods = prods.concat(
          includeProduct(
            product.relatedProducts[i],
            checkedProducts,
            currency,
            editions,
            annual,
            parentId,
            discountMatrix
          )
        );
      }
    }
  }
  prods = prods.map(prod => {
    prod.relatedProducts = null;
    return prod;
  });
  return prods;
};

const downloadBlobFile = (dispatch, url, data, fileName, callback) => {
  post(url, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob'
  })
    .then(response => {
      // This is not pretty but we need it to trigger a file download
      var blob = new Blob([response.data]);
      if (window.navigator.msSaveOrOpenBlob) {
        // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blob, {
          type: 'application/xlsx'
        });
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        window.URL.revokeObjectURL(url);
        a.remove();
      }
      dispatch(callback(false));
    })
    .catch(e => {
      dispatch(callback(false));
    });
};

export const exportFile = data => dispatch => {
  ga('send', 'event', {
    eventCategory: 'button',
    eventAction: 'click',
    eventLabel: 'export'
  });

  if (data.selectedEdition) {
    data.editions = [{ name: data.selectedEdition }];
  } else if (data.editions) {
    data.editions = data.editions
      .map(edition => ({ name: edition.value }))
      .filter(edition => !data.hiddenEditions[edition.name]);
  }

  if (data.editions && data.editions.length) {
    dispatch(setExportInProgress(true));
    const prods = cloneDeep(data.products);
    data.relatedProducts = [];
    for (let i = 0; i < prods.length; i++) {
      data.relatedProducts = data.relatedProducts.concat(
        includeProduct(
          prods[i],
          data.checkedProducts,
          data.currency,
          data.editions.map(edition => edition.name),
          data.annual
        )
      );
    }

    data.currencies = [data.currency];

    delete data.currency;
    delete data.products;
    delete data.checkedProducts;
    delete data.hiddenEditions;
    delete data.selectedEdition;

    downloadBlobFile(
      dispatch,
      EXPORT_EXCEL_URL,
      data,
      'Price List - ' + new Date().toDateString() + '.xlsx',
      setExportInProgress
    );
  } else {
    alert(
      'There are no editions visible to export. \nPlease select the editions you want to export.'
    );
  }
};

export const exportPricingScratchpadFile = data => dispatch => {
  ga('send', 'event', {
    eventCategory: 'button',
    eventAction: 'click',
    eventLabel: 'export-pricing-scratchpad'
  });

  dispatch(setExportScratchpadInProgress(true));
  const prods = cloneDeep(data.products);
  data.products = prods.map(prod => {
    let listPrice = prod.editionPrices.filter(
      eP => eP.edition.name === data.editionName
    )[0].price;
    listPrice = isNaN(listPrice) || data.annual ? listPrice : listPrice / 12;
    let discountedPrice = isNaN(listPrice)
      ? NOT_APPLICABLE
      : listPrice * prod.quantity * (1 - prod.discount / 100);
    return {
      name: prod.name,
      description: prod.description,
      quantity: prod.quantity,
      discount: prod.discount,
      listPrice,
      discountedPrice
    };
  });

  downloadBlobFile(
    dispatch,
    SCRATCHPAD_EXPORT_URL,
    data,
    'Pricing Scratchpad - ' + new Date().toDateString() + '.xlsx',
    setExportScratchpadInProgress
  );
};

const getDiscountMatrix = (products, dispatch) => {
  const editionPricesIds = [];
  const editionsMap = {};
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    for (let j = 0; j < product.editionPrices.length; j++) {
      editionPricesIds.push(product.editionPrices[j].id);
      editionsMap[product.editionPrices[j].id] = {
        edition: product.editionPrices[j].edition.name,
        product: product.name,
        productIndex: i,
        id: product.editionPrices[j].id
      };
    }
  }

  const concatLevels = (rangeLevels, allLevels) => {
    for (let i = 0; i < rangeLevels.length; i++) {
      if (allLevels.indexOf(rangeLevels[i].name) === -1) {
        allLevels.push(rangeLevels[i].name);
      }
    }
    return allLevels;
  };

  const getGroupedEditions = (matrix, matrixId) => {
    let groupedEditions = [];
    for (let i = 0; i < matrix.length; i++) {
      if (
        matrix[i].discountMatrix &&
        matrix[i].discountMatrix.id === matrixId
      ) {
        groupedEditions.push(editionsMap[matrix[i].editionPriceId]);
      }
    }
    return groupedEditions;
  };

  const orderApprovalLevels = approvalLevels => {
    let numericLevels = []; // [...] like 'Level 0', 'Level 1'...
    let otherLevels = []; // [...] like 'Deal Desk'...

    for (let i = 0; i < approvalLevels.length; i++) {
      let levelWords = approvalLevels[i].split(' ');
      // Checks if level name ends with a number
      if (!isNaN(levelWords[levelWords.length - 1])) {
        numericLevels.push(approvalLevels[i]);
      } else {
        otherLevels.push(approvalLevels[i]);
      }
    }
    return [...sortBy(numericLevels), ...sortBy(otherLevels)];
  };

  post(SCRATCHPAD_QUERY_URL, JSON.stringify(editionPricesIds), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(response => {
    if (response.data) {
      let data = response.data;
      for (let i = 0; i < data.length; i++) {
        let matrix = data[i].discountMatrix;
        if (matrix) {
          let approvalLevels = [];
          let ranges = matrix.productDiscountRanges;
          for (let j = 0; j < ranges.length; j++) {
            let levels = ranges[j].approvalLevelRanges;
            approvalLevels = concatLevels(levels, approvalLevels);
          }
          data[i].discountMatrix.approvalLevels = orderApprovalLevels(
            approvalLevels
          );
          data[i].discountMatrix.groupedEditions = getGroupedEditions(
            data,
            data[i].discountMatrix.id
          );
        }
      }
      dispatch(setDiscountMatrix(data));
    }
  });
};

export const getDiscountMatrixProducts = data => dispatch => {
  if (data.editions) {
    data.editions = data.editions.filter(
      edition => !data.hiddenEditions[edition.value]
    );
  }

  if (data.editions && data.editions.length) {
    const prods = cloneDeep(data.products);
    data.relatedProducts = [];
    for (let i = 0; i < prods.length; i++) {
      data.relatedProducts = data.relatedProducts.concat(
        includeProduct(
          prods[i],
          data.checkedProducts,
          data.currency,
          data.editions.map(edition => edition.value),
          null,
          null,
          true
        )
      );
    }
    getDiscountMatrix(data.relatedProducts, dispatch);

    delete data.products;
    delete data.checkedProducts;
    delete data.hiddenEditions;

    dispatch(togglePricingModal(data));
  } else {
    alert('There are no editions visible.');
  }
};

export const productsLoaded = data => {
  return {
    type: 'PRODUCTS_LOADED',
    data
  };
};

export const resetView = () => ({
  type: 'RESET_VIEW'
});

export const currenciesLoaded = currencies => ({
  type: 'CURRENCIES_LOADED',
  currencies
});

export const editionsLoaded = editions => ({
  type: 'EDITIONS_LOADED',
  editions
});

export const toggleParent = (parentId, opened) => ({
  type: 'TOGGLE_PARENT',
  parentId,
  opened
});

export const toggleAllParents = opened => ({
  type: 'TOGGLE_ALL_PARENTS',
  opened
});

export const toggleSettingsMenu = opened => ({
  type: 'TOGGLE_SETTINGS_MENU',
  opened
});

export const toggleDocumentsMenu = opened => ({
  type: 'TOGGLE_DOCUMENTS_MENU',
  opened
});

export const closeAllDropDowns = () => ({
  type: 'CLOSE_ALL_DROPDOWNS'
});

export const toggleProductInfoModal = product => ({
  type: 'TOGGLE_PRODUCT_INFO_UPLOAD',
  product
});

export const togglePricingModal = data => ({
  type: 'TOGGLE_PRICING_MODAL',
  products: data ? data.relatedProducts : [],
  editions: data ? data.editions : [],
  edition: data && data.editions ? data.editions[0].value : null
});

export const toggleAnnual = () => ({
  type: 'TOGGLE_ANNUAL'
});

export const selectCurrency = currency => {
  ga('send', 'event', {
    eventCategory: 'currency',
    eventAction: 'select',
    eventLabel: currency
  });

  return {
    type: 'SELECT_CURRENCY',
    currency
  };
};

export const selectEdition = edition => {
  ga('send', 'event', {
    eventCategory: 'edition',
    eventAction: 'select',
    eventLabel: edition
  });

  return {
    type: 'SELECT_EDITION',
    edition
  };
};

export const selectList = list => {
  ga('send', 'event', {
    eventCategory: 'pricelist',
    eventAction: 'select',
    eventLabel: list
  });

  return {
    type: 'SELECT_LIST',
    list
  };
};

export const checkProduct = (productId, checked) => ({
  type: 'CHECK_PRODUCT',
  productId,
  checked
});

export const toggleColumn = columnId => ({
  type: 'TOGGLE_COLUMN',
  columnId
});

export const search = query => {
  const GAQuery = slug(query.toLowerCase());
  GAQuery &&
    ga('send', {
      hitType: 'pageview',
      page: `/search/${GAQuery}/`,
      title: query
    });

  return {
    type: 'SEARCH',
    query
  };
};

export const sortColumn = sortKey => ({
  type: 'SORT_COLUMN',
  sortKey
});

export const productView = id => ({
  type: 'PRODUCT_VIEW',
  id
});

export const selectUploadFile = file => ({
  type: 'SELECT_UPLOAD_FILE',
  file
});

export const setUploadResult = result => ({
  type: 'SET_UPLOAD_RESULT',
  result
});

export const setUploadInProgress = inProgress => ({
  type: 'SET_UPLOAD_IN_PROGRESS',
  inProgress
});

export const setExportInProgress = inProgress => ({
  type: 'SET_EXPORT_IN_PROGRESS',
  inProgress
});

export const setExportScratchpadInProgress = inProgress => ({
  type: 'SET_EXPORT_SCRATCHPAD_IN_PROGRESS',
  inProgress
});

export const setUser = user => ({
  type: 'SET_USER',
  user
});

export const setDiscountMatrix = matrix => ({
  type: 'SET_DISCOUNT_MATRIX',
  matrix
});

export const selectDiscountEdition = edition => {
  return {
    type: 'SELECT_DISCOUNT_EDITION',
    edition
  };
};

export const acceptDMDisclaimer = () => {
  return {
    type: 'ACCEPT_DM_DISCLAIMER'
  };
};

export const setDMProductQuantity = (index, quantity) => {
  return {
    type: 'SET_DM_PRODUCT_QUANTITY',
    index,
    quantity
  };
};

export const setDMProductDiscount = (index, discount) => {
  return {
    type: 'SET_DM_PRODUCT_DISCOUNT',
    index,
    discount
  };
};

export const toggleProductMatrix = index => {
  return {
    type: 'TOGGLE_PRODUCT_MATRIX',
    index
  };
};
