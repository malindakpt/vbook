import { LoginUIMode } from "../enum/login.ui.mode";
import { PopupType } from "../enum/popup.type";
import { User } from "../types/User";

export interface InitialState {
  user: User | null;
  login: {
    mode: LoginUIMode;
    signUp: {
      loading: boolean;
    };
    signIn: {
      loading: boolean;
    };
    forgotPassword: {
      loading: boolean;
      codeSent: boolean;
    };
    changePassword: {
      loading: boolean;
      identifier: string;
    };
  };
  addVehicle: {
    loading: boolean;
  };
  popup: {
    message: string;
    isOpen: boolean;
    type: PopupType;
  };
}
export const initialState: InitialState = {
  user: null,
  login: {
    mode: LoginUIMode.SIGN_IN,
    signUp: {
      loading: false,
    },
    signIn: {
      loading: false,
    },
    forgotPassword: {
      loading: false,
      codeSent: false,
    },
    changePassword: {
      loading: false,
      identifier: "",
    },
  },
  addVehicle: {
    loading: false,
  },
  popup: {
    message: "",
    isOpen: false,
    type: PopupType.info,
  },
};
