import AppNavbar from "./AppNavbar";
import { connect } from "react-redux";
import { ReducerState } from "../../interfaces";

const mapStateToProps = (state: ReducerState) => ({ ...state })

export default connect(mapStateToProps)(AppNavbar)