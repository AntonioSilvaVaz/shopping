import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  value: {
    isAuth: boolean;
    email: string;
    name: string;
    user_id: string;
    profile_picture: string;
  };
};


const userState: UserState = {
  value: {
    isAuth: false,
    email: "",
    name: "",
    user_id: "",
    profile_picture: "",
  },
};

const user = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    logOut: () => {
      return userState;
    },
    login: (state, action: PayloadAction<{email: string, name: string, user_id: string, profile_picture: string}>) => {
      return {
        value: {
          isAuth: true,
          ...action.payload
        }
      }
    }
  },
});

export const {logOut, login} = user.actions;
export default user.reducer;