import { ThunkDispatch } from "../store";

declare global {
  interface Window {
    _lastDispatchedAction: ThunkDispatch;
  }
}
