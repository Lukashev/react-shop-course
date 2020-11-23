import { PaymentCard } from "./PaymentCard";
import { ReducerState } from "../../interfaces";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setMainState } from "../../store/actions";

const mapStateToProps = (state: ReducerState) => ({ paymentDetails: state.paymentDetails })
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMainState: (payload: any) => dispatch(setMainState(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard)