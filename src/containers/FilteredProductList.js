import { connect } from 'react-redux';
import ProductList from '../components/ProductList';
import _orderBy from 'lodash/orderBy';
import _cloneDeep from 'lodash/cloneDeep';
import {
  sortColumn,
  toggleParent,
  toggleAllParents,
  checkProduct,
  toggleColumn,
  toggleSettingsMenu,
  toggleProductInfoModal,
  productsLoad,
  closeAllDropDowns
} from '../actions';

/**
 * FilteredProductList Container:
 * Handles ProductList Component
 */

/**
  * Prepares products sort for ProductList Component
  */
function orderProducts(products, key, order) {
  let prods = key ? _orderBy(products, key, order) : products;
  if (key) {
    prods = prods.map(product => {
      product.relatedProducts = product.relatedProducts
        ? orderProducts(product.relatedProducts, key, order)
        : null;
      return product;
    });
  }
  return prods;
}

/**
  * Checks if a product should be shown according to filters
  */

function includeProduct(
  product,
  searchWords,
  checkedProducts,
  parentId
) {
  if (product) {
    if (!parentId) {
      parentId = product.id.toString();
    } else {
      parentId += `.${product.id}`;
    }
    if (checkedProducts[parentId]) {
      return product;
    }

    let includePro = searchWords.every(searchWord =>
      [product.name].some(
        field => field.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      )
    );

    if (product.relatedProducts) {
      if (!includePro) {
        product.relatedProducts = product.relatedProducts.map(product =>
          includeProduct(
            product,
            searchWords,
            checkedProducts,
            parentId
          )
        );
      }
      product.relatedProducts = product.relatedProducts.filter(
        product => product !== null
      );

      if (product.relatedProducts.length) {
        includePro = true;
      }
    }

    if (includePro) {
      return product;
    } else {
      return null;
    }
  }
  return null;
}

/**
  * Preprares product list according to filters and sorting
  */

function filterProducts({ products, filters, sort, checkedProducts }) {
  const order = sort.asc ? 'asc' : 'desc';
  const prods = products
    ? orderProducts(_cloneDeep(products), sort.key, order)
    : [];
  const searchWords = filters.search ? filters.search.split(' ') : [];

  return prods
    .map(product =>
      includeProduct(product, searchWords, checkedProducts)
    )
    .filter(product => product !== null);
}

/**
  * Prepares openedParents object considering temporal opens
  * when a search is active
  */

function filterOpenedProducts({
  openedParents,
  tempOpenedParents,
  filters
}) {
  const searchWords = filters.search ? filters.search.split(' ') : [];
  if (searchWords.length) {
    return {
      ...openedParents,
      ...tempOpenedParents
    };
  }
  return openedParents;
}

const mapStateToProps = state => {
  return {
    products: filterProducts(state),
    productsLoaded: state.productsLoaded,
    editions: state.editions,
    openedParents: filterOpenedProducts(state),
    checkedProducts: state.checkedProducts,
    hiddenColumns: state.hiddenColumns,
    filters: state.filters,
    sort: state.sort,
    toggles: state.toggles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sortColumn(sortKey) {
      dispatch(sortColumn(sortKey));
    },
    toggleParent(product, opened) {
      if (product.relatedProducts && product.relatedProducts.length) {
        dispatch(toggleParent(product.uniqueId, !opened));
      }
    },
    toggleAllParents(e) {
      e.stopPropagation();
      dispatch(toggleAllParents());
    },
    checkProduct(e, productId) {
      e.stopPropagation();
      dispatch(checkProduct(productId, e.target.checked));
    },
    toggleColumn(columnId, e) {
      if (e) {
        e.stopPropagation();
      }
      dispatch(toggleColumn(columnId));
    },
    toggleSettingsMenu(e, open) {
      e.stopPropagation();
      dispatch(toggleSettingsMenu(open));
    },
    closeAllDropDowns(e) {
      e.stopPropagation();
      dispatch(closeAllDropDowns());
    },
    toggleProductInfoModal(product, e) {
      e.preventDefault();
      dispatch(toggleProductInfoModal(product));
    },
    productsLoad(type) {
      dispatch(productsLoad(type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
