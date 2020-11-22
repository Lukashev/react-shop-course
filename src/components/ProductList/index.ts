import ProductList from "./ProductList";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { ReducerState } from "../../interfaces";
import * as mainActions from '../../store/actions' 

const mapStateToProps = (state: ReducerState): ReducerState => {
  return { ...state }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(mainActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList as any)