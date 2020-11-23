import ProductList from "./ProductList";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { ReducerState } from "../../interfaces";
import * as mainActions from '../../store/actions'

const mapStateToProps = (state: ReducerState): ReducerState => {
  const { sortBy, products } = state
  return {
    ...state,
    products: products.sort((a, b) => sortBy === 'LOW' ? +a.price - +b.price : +b.price - +a.price)
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(mainActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList as any)