import AppNavbar from "./AppNavbar";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReducerState } from "../../interfaces";
import { setMainState } from "../../store/actions";

const mapStateToProps = (state: ReducerState) => ({ ...state })
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMainState: (payload: any) => dispatch(setMainState(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar)