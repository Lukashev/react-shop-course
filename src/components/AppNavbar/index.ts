import AppNavbar from "./AppNavbar";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ReducerState, Action, CurrencyType } from "../../interfaces";
import { setMainState, makePayment } from "../../store/actions";

const mapStateToProps = (state: ReducerState) => ({ ...state })
const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<ReducerState, any, Action>) => ({
  setMainState: (payload: any) => dispatch(setMainState(payload)),
  makePayment: (payload: { amount: number, currency: CurrencyType }) => dispatch(makePayment(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar)